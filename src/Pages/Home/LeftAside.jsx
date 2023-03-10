import { useEffect, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { BsFillMicFill, BsImageFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRootContext } from '../../contexts/RootProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiDelete } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import nsnlogo from '../../assets/logo.jpeg';
import ChatHeading from './Chat/ChatHeading';
import TypingIndicator from '../../Components/TypingIndicator';
import MessageReceiver from './Chat/MessageReceiver';
import MessageSender from './Chat/MessageSender';
import avatar from "../../assets/placeholders/avatar.png";
import Chathome from './Chat/Chathome';
import Cta from './Components/Cta';
import { useDispatch, useSelector } from 'react-redux';
import { useSendMessageMutation, useSendMessageToGPTMutation } from '../../features/chat/chatApi';
import ActionCta from './Components/ActionCta';
import { useCreateProjectMutation, useUpdateProjectMutation } from '../../features/project/projectApi';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import { addChatLog, popChatLog, setChatLog } from '../../features/project/projectSlice';

const LeftAside = () => {
    const { shortlistedArtist = [], selectedContentProducts, setshortlistedArtist, currentProject, handleShowProjectHistory, handleSelectContentProduct, contentProducts, isMobile, suggestions, removedSkills } = useRootContext();

    const dispatch = useDispatch();
    const [createProject] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const { user } = useSelector(state => state.auth);
    const { chatLog } = useSelector(state => state.project);

    const [sendMessageToGPT] = useSendMessageToGPTMutation();
    const [sendMessage] = useSendMessageMutation();

    const chatboxRef = useRef();
    useEffect(() => {
        const chatboxElement = chatboxRef.current;
        chatboxElement.scrollTo(0, chatboxElement.scrollHeight);
    }, [])

    useEffect(() => {
        if (chatboxRef) {
            chatboxRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    const sender = (user.role === "Client" || !user.email) ? "user" : "bot";

    // handle remove shortlisted artist
    const handleRemoveShortlistedArtist = (msgID, artistID) => {
        // remove chatlog
        dispatch(popChatLog(msgID));
        // remove selected artist
        setshortlistedArtist(current => [...current.filter(id => id !== artistID)]);
    }

    const navigate = useNavigate();
    // send brief
    const handleSendBrief = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        createProject({
            "stage": "Lead",
            "brief": JSON.stringify(chatLog),
            "project_template": selectedContentProducts,
            "shortlisted_artists": shortlistedArtist
        }).then(response => {
            const data = response.data;
            toast.success("Project created successfully!");
            navigate(`/projects/${data.pk}/Lead/`);
        })
    }

    // handle change stage
    const handleChangeStage = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        updateProject({
            id: currentProject.pk,
            data: { stage: "Lead" }
        }).then(response => {
            const data = response.data;
            handleShowProjectHistory(data?.pk, data?.stage);
            navigate(`/projects/${data?.pk}/${data?.stage}/`);
        })
    }

    const [isTyping, setIsTyping] = useState(false);

    // handle Chat Input
    const userInputRef = useRef();
    const [userInputText, setuserInputText] = useState("");
    const handleChatInput = (e) => {
        setuserInputText(e.target.value);
        // on key enter submit input
        if (e.key === "Enter") {
            handleSendUserInput();
        }
    }
    const handleSendUserInput = () => {
        if (!userInputRef.current.value) {
            userInputRef.current.focus();
            return;
        };
        setIsTyping(true);

        // chatlog
        const message = { msgID: chatLog.length + 1, [sender]: userInputText };
        dispatch(addChatLog(message));
        setuserInputText("");
        userInputRef.current.value = "";

        if (user.email && currentProject?.pk) {
            sendMessage({
                project_id: currentProject.pk,
                message: message
            }).then(response => {
                const data = response.data;
                if (data?.project?.pk) {
                    dispatch(setChatLog(JSON.parse(data?.project?.brief)));
                    setIsTyping(false);
                }
            }).catch((err) => {
                setIsTyping(false);
            })
        } else {
            sendMessageToGPT({
                message: userInputText
            }).then(response => {
                const data = response.data;
                if (data?.response) {
                    dispatch(addChatLog({ msgID: chatLog.length + 1, bot: data?.response }));
                    setIsTyping(false);
                }
            }).catch((err) => {
                setIsTyping(false);
            })
        }

        if (pathname === "/") {
            if (isMobile) {
                navigate("/projects/chat");
            } else {
                navigate("/artists");
            }
        }
    }

    let name;
    if (user.name?.length <= 1) {
        name = user.username;
    } else {
        name = user.name;
    }

    const TypingElement = isTyping &&
        <div className='text-sm flex mb-5'>
            <img className='w-10 h-10' src={nsnlogo} alt="" />
            <div>
                <TypingIndicator />
            </div>
        </div>

    const pathname = useLocation().pathname;

    const currentProjectDashboardUrl = `/projects/${currentProject?.pk}/${currentProject?.stage}/`;
    const ctaStages = {
        lead: [["Project Dashboard", currentProjectDashboardUrl], ["Add More Artist", "/artists"], ["View Demos"], ["Support"]],
        inProgress: [["Project Dashboard", currentProjectDashboardUrl], ["Approve"], ["Decline"], ["Put On Hold"]],
        approved: [["Project Dashboard", currentProjectDashboardUrl], ["Proceed to DocuSign"], ["Need help"], ["Change Dicission"]],
        payment: [["Make Payment"]],
    }

    let suggestionElement;
    if (currentProject?.stage === "Lead") {
        suggestionElement = <ActionCta suggestions={ctaStages.lead} className='sticky bottom-0' />
    }
    else if (currentProject?.stage === "In Progress") {
        suggestionElement = <ActionCta suggestions={ctaStages.inProgress} className='sticky bottom-0' />
    }
    else {
        suggestionElement = (suggestions?.length > 0 || removedSkills?.length > 0) &&
            <Cta suggestions={suggestions} removedSkills={removedSkills} className='sticky bottom-0' />
    }

    return (
        <section className='bg-white shadow-md rounded-lg'>
            <ChatHeading
                projectTitle={currentProject?.name}
                handleShowProjectHistory={handleShowProjectHistory}
                currentProject={currentProject}
            />

            {/*  */}
            {/*  */}
            {/*  */}

            {
                pathname === "/" ?
                    <Chathome
                        chatboxRef={chatboxRef}
                        nsnlogo={nsnlogo}
                    />
                    :
                    <div ref={chatboxRef} className='h-72 overflow-y-scroll overflow-x-hidden relative'>
                        {
                            user.role === "Client" || !user.email
                                ? <div className='flex flex-col p-3'>
                                    {/* Default message is shown */}
                                    <MessageReceiver
                                        image={nsnlogo}
                                        name="Adbhut.io"
                                        text="Please select any of the content product or send your inputs here to continue"
                                    />

                                    {
                                        chatLog.length > 0 &&
                                        chatLog.map((chat, idx) => (
                                            chat.bot
                                                ? <MessageReceiver
                                                    key={idx}
                                                    image={nsnlogo}
                                                    name="Adbhut.io"
                                                    text={chat.bot}
                                                />
                                                : <MessageSender
                                                    key={idx}
                                                    image={avatar}
                                                    name={name || "Guest Account"}
                                                    text={
                                                        chat.user ||
                                                        chat.type === 'shortlistedArtist' &&
                                                        <>Shortlisted <Link to={`/artists/${chat.artist.artistID}/`}><img className='w-8 h-8 inline bg-white object-cover' src={chat.artist.profile_pic} alt="" /> <span className='hover:underline'>{chat.artist.name.split(" ")[0]}</span></Link> <FiDelete onClick={() => handleRemoveShortlistedArtist(chat.msgID, chat.artist.artistID)} className='inline w-5 h-5 cursor-pointer' /></>
                                                    }
                                                />
                                        ))
                                    }

                                    {/*  */}
                                    {
                                        TypingElement
                                    }
                                    {/*  */}

                                </div>
                                :
                                <div className='flex flex-col p-3'>
                                    <div className='text-sm flex gap-2 mb-5 ml-auto'>
                                        <MessageSender
                                            image={nsnlogo}
                                            name="Adbhut.io"
                                            text="Please select any of the content product or send your inputs here to continue"
                                        />
                                    </div>
                                    {
                                        chatLog.length > 0 &&
                                        chatLog.map((chat, idx) => (
                                            chat.user
                                                ? <MessageReceiver
                                                    key={idx}
                                                    image={avatar}
                                                    name={currentProject?.client_details?.name}
                                                    text={chat.user}
                                                />
                                                : <MessageSender
                                                    key={idx}
                                                    image={nsnlogo}
                                                    name="Adbhut.io"
                                                    text={
                                                        chat.bot ||
                                                        chat.type === 'shortlistedArtist' &&
                                                        <>Shortlisted <Link to={`/artists/${chat.artist.artistID}`}><img className='w-8 h-8 inline bg-white object-cover' src={chat.artist.profile_pic} alt="" /> <span className='hover:underline'>{chat.artist.name.split(" ")[0]}</span></Link> <FiDelete onClick={() => handleRemoveShortlistedArtist(chat.msgID, chat.artist.artistID)} className='inline w-5 h-5 cursor-pointer' /></>
                                                    }
                                                />
                                        ))
                                    }

                                    {/*  */}
                                    {
                                        TypingElement
                                    }
                                    {/*  */}

                                </div>
                        }

                        {
                            suggestionElement
                        }

                        {
                            suggestions?.length === 0 && contentProducts?.length > 0 && !selectedContentProducts && shortlistedArtist.length === 0 && chatLog.length === 0 &&
                            <div className='sticky bottom-0 p-2 pb-0 bg-white mt-12'>
                                <div className='pb-2 flex flex-wrap gap-2 text-sm font-medium select-none'>
                                    {
                                        contentProducts.map(contentProduct => <div
                                            onClick={() => handleSelectContentProduct(contentProduct)}
                                            key={contentProduct.pk}
                                            className='whitespace-nowrap py-1 px-3 border text-gray-500 border-gray-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                            {contentProduct.name}
                                        </div>)
                                    }
                                </div>
                            </div>
                        }
                    </div>
            }

            <div className='p-3 border-t-[3px] border-gray-300'>
                <textarea ref={userInputRef} onKeyUp={handleChatInput} className="p-2 rounded-lg bg-gray-100 w-full focus:outline-none text-sm" rows="4" placeholder='Start a briefing...'></textarea>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <BsEmojiSmile />
                        <ImAttachment />
                        <BsImageFill />
                        <AiOutlineGif />
                    </div>
                    <div className='flex items-center space-x-1'>
                        <BsFillMicFill />
                        {
                            userInputText
                                ? <button onClick={handleSendUserInput} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                                : selectedContentProducts || currentProject?.pk
                                    ? <button onClick={currentProject?.stage === "DreamProject" ? handleChangeStage : handleSendBrief} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Save</button>
                                    : <button className='bg-gray-300 text-gray-400 py-[3px] px-3 rounded-full text-sm'>Save</button>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeftAside;