import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRootContext } from '../../../contexts/RootProvider';
import MessageReceiver from './MessageReceiver';
import MessageSender from './MessageSender';

const Chathome = ({ chatboxRef, nsnlogo }) => {
    const { isFullTime } = useSelector(state => state.viewMode);
    const { chatLog } = useSelector(state => state.project);

    const { contentProducts, currentProject, selectedContentProducts, avatar, handleSelectContentProduct, isMobile, skills, handleSelectSkill } = useRootContext();
    const navigate = useNavigate();

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(skills.map(skill => [skill.name, skill.pk]));
    }, [skills])

    return (
        <div ref={chatboxRef} className='h-72 overflow-y-scroll overflow-x-hidden relative'>
            <div className='flex flex-col p-3'>
                <MessageReceiver
                    key={isFullTime ? "visible" : "hidden"}
                    image={nsnlogo}
                    name="Adbhut.io"
                    text={`Hello, I'm Adbhut. Lets ${isFullTime ? "Hire" : "Create"}!`}
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
                                text={chat.user}
                            />
                    ))
                }
            </div>

            {
                !isFullTime && contentProducts.length > 0 &&
                <div className='sticky bottom-0 bg-white p-3 pb-2 contentProducts text-center select-none mt-12'>
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={4}
                        modules={[Navigation]}
                        navigation
                        className='px-3'
                    >
                        <SwiperSlide>
                            <Link to="/projects/create-project">
                                <div className='group flex flex-col gap-2 items-center'>
                                    <div className='border rounded-md h-[76px] w-[76px] flex items-center justify-center'>
                                        <AiOutlinePlus className='group-hover:scale-110 duration-150 overflow-hidden text-gray-600' size={40} />
                                    </div>
                                    <p className='text-[0.6rem] leading-tight'>New Project</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                        {
                            contentProducts?.map(content => (
                                <SwiperSlide key={content.pk}>
                                    <div onClick={() => {
                                        handleSelectContentProduct(content)
                                        if (isMobile) {
                                            navigate("/projects/chat");
                                        } else {
                                            navigate("/artists");
                                        }
                                    }} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                        <div className={`${currentProject?.project_template === content.pk || selectedContentProducts === content.pk ? 'w-20 h-20' : 'w-[75px] h-[75px]'} p-1 border rounded-md`}>
                                            <img className='group-hover:scale-110 duration-150 overflow-hidden' src={content.weblink} />
                                        </div>
                                        <p className={`${currentProject?.project_template === content.pk || selectedContentProducts === content.pk && 'text-blue-600 font-medium'} text-[0.6rem] leading-tight`}>{content.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            }
            {
                isFullTime && suggestions.length > 0 &&
                <div className='sticky bottom-0 p-2 bg-white mt-28'>
                    <div className='pb-2 skillScroll overflow-x-scroll flex gap-2 text-sm font-medium select-none'>
                        {
                            suggestions &&
                            suggestions.map(skill => <div
                                onClick={() => {
                                    handleSelectSkill(skill)
                                    navigate("/artists")
                                }}
                                key={`suggestedSkill${skill[1]}`}
                                className='whitespace-nowrap py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                {skill[0]}
                            </div>)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Chathome;