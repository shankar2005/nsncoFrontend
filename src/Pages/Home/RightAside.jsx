import React, { useContext, useEffect, useState } from 'react';
import avatar from '../../assets/placeholders/avatar.png';
import { MdCelebration } from 'react-icons/md';
import { BsHash } from 'react-icons/bs';
import AuthSection from '../Auth/AuthSection';
import { ImOffice } from 'react-icons/im';
import { TfiWorld } from 'react-icons/tfi';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { useRootContext } from '../../contexts/RootProvider';

const category = [
    {
        pk: 6,
        name: "Artwork",
        image: "https://img.icons8.com/external-ddara-flat-ddara/64/null/external-artwork-digital-marketing-ddara-flat-ddara.png"
    },
    {
        pk: 1,
        name: "Chat Show",
        image: "https://img.icons8.com/color/48/null/filled-chat.png"
    },
    {
        pk: 2,
        name: "Documentary",
        image: "https://img.icons8.com/color-glass/48/null/documentary.png"
    },
    {
        pk: 4,
        name: "Fiction & Reality",
        image: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-fiction-literature-flaticons-lineal-color-flat-icons.png"
    },
    {
        pk: 3,
        name: "Musical",
        image: "https://img.icons8.com/cute-clipart/64/null/musical.png"
    },
    {
        pk: 5,
        name: "Web 3.0 Solutions",
        image: "https://img.icons8.com/color/48/null/bitcoin--v1.png"
    },
]

const RightAside = () => {
    const { selectedContentProducts, setselectedContentProducts, setchatLog, authToken, handleShowProjectHistory } = useRootContext();

    const { isAuthenticated } = useContext(AuthContext);

    const handleSelectContentProducts = (product) => {
        const isExist = selectedContentProducts === product.pk;
        if (!isExist) {
            setselectedContentProducts(product.pk);
            // chatlog
            setchatLog(current => [...current, { msgID: current.length + 1, user: product.name }]);
        } else {
            toast('Already selected');
        }
    }


    // get current projects
    const [currentProjects, setCurrentProjects] = useState([]);
    useEffect(() => {
        fetch('https://dev.nsnco.in/api/v1/get_my_projects/', {
            headers: { Authorization: `token ${authToken}` },
        }).then(res => res.json())
            .then(data => {
                if (data.detail === 'Invalid token.') {
                    return;
                }
                setCurrentProjects(data);
            });
    }, [])

    return (
        <>
            <section className='mb-5 bg-white shadow-md rounded-lg p-3'>
                <h3 className='font-medium mb-3 text-gray-600'>Content Products</h3>
                <div className='grid grid-cols-3 gap-x-2 gap-y-4 text-center'>
                    {
                        category?.map((item, idx) => (
                            <div onClick={() => handleSelectContentProducts(item)} key={idx} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                <div className='w-12 h-12 p-2 border rounded-md '>
                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src={item.image} />
                                </div>
                                <p className='text-sm'>{item.name}</p>
                            </div>)
                        )
                    }
                </div>
            </section>
            <section className='bg-white rounded-lg p-4 shadow-md mb-5'>
                {
                    isAuthenticated
                        ? <>
                            <div className='relative'>
                                <img className='rounded-t-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ATiUg17HuXkHqkRB436JTxNVqh55NdWSZQ&usqp=CAU" alt="" />
                                <div className='w-20 rounded-full absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2 border-4 border-white'>
                                    <img className='w-full h-full' src={avatar} alt="" />
                                </div>
                            </div>
                            <div className='mt-12 pt-0 p-4 text-center'>
                                <h4 className='font-medium text-lg'>Md Maruf Hossain</h4>
                                <div className='text-sm text-gray-600'>
                                    @maruf <br />
                                    <p className='flex items-center justify-center gap-1 mt-1'><ImOffice /> NsN Co</p>
                                    <p className='flex items-center justify-center gap-1 mt-1'><TfiWorld /> https://nsnco.in/</p>
                                </div>
                            </div>
                        </>
                        : <AuthSection />
                }
            </section>

            <section className='bg-white text-gray-700 rounded-lg shadow-md text-sm'>
                {
                    currentProjects.length > 0 &&
                    <div className='border-b mb-3 pb-6 p-4'>
                        <p className='text-black mb-2 font-medium'>Current Projects</p>
                        {
                            currentProjects.map(project => project.stage === "Lead" && <p onClick={() => handleShowProjectHistory(project.pk)} key={`recent-project${project.pk}`} className='flex items-center gap-1 underline hover:text-blue-700 cursor-pointer'>
                                <MdCelebration className='w-5 h-5 text-yellow-400' />
                                {project.name}
                            </p>)
                        }
                    </div>
                }
                {
                    currentProjects.length > 0 &&
                    <div className='border-b mb-3 pb-6 p-4'>
                        <p className='text-black mb-2 font-medium'>Dream Projects</p>
                        {
                            currentProjects.map(project => project.stage === "DreamProject" && <p onClick={() => handleShowProjectHistory(project.pk)} key={`recent-project${project.pk}`} className='flex items-center gap-1 underline hover:text-blue-700 cursor-pointer'>
                                <MdCelebration className='w-5 h-5 text-yellow-400' />
                                {project.name}
                            </p>)
                        }
                    </div>
                }
                <div className='border-b mb-3 pb-6 p-4'>
                    <p className='text-black mb-2 font-medium'>Recent Artists</p>
                    <p className='flex gap-1 mb-1'><img className='w-5 h-5' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" /> JavaScript Developer</p>
                    <p className='flex gap-1 mb-1'><img className='w-5 h-5' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" /> International Jobs for Web Dev</p>
                    <p className='flex gap-1 mb-1'><img className='w-5 h-5' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" /> EventsSee all Events</p>
                </div>
                <div className='border-b mb-3 pb-6 p-4'>
                    <p className='text-black mb-2 font-medium'>Followed Hashtags</p>
                    <p className='flex items-center'><BsHash className='w-5 h-5 text-purple-700' />6monthsofcodechallenge</p>
                </div>
            </section>



            <footer className='text-xs text-gray-600'>
                <ul className='flex flex-wrap gap-3 justify-center mt-6'>
                    <li className='hover:underline'>About</li>
                    <li className='hover:underline'>Accessibility</li>
                    <li className='hover:underline'>Help Center</li>
                    <li className='hover:underline'>Privacy & Terms</li>
                    <li className='hover:underline'>Ad Choices</li>
                    <li className='hover:underline'>Advertising</li>
                    <li className='hover:underline'>Business Services</li>
                    <li className='hover:underline'>Get the NsN Co app</li>
                    <li className='hover:underline'>More</li>
                </ul>
                <p className='text-center mt-4'>NsN Co © 2023</p>
            </footer>
        </>
    );
};

export default RightAside;