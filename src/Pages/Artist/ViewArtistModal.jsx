import React from 'react';
import { AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai';
import { FiArrowLeft } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';

const ViewArtistModal = ({ modal, setModal }) => {
    return (
        <div className={`${modal ? 'fixed' : 'hidden'} z-50 top-0 left-0 bg-black bg-opacity-70 w-full h-screen flex items-center justify-center`}>
            <div className='bg-white max-w-screen-sm mx-5 rounded-lg text-black p-10 relative'>
                {/* <p onClick={() => { setModal(false) }} className='absolute top-0 right-0 m-3 mr-4 cursor-pointer font-bold'><RxCross1 className='w-6 h-6 text-blue-500' /></p> */}
                <div className='flex items-center gap-5 mb-7'>
                    <FiArrowLeft onClick={() => setModal(false)} className='w-6 h-6 text-blue-500 cursor-pointer' />
                    <div className='text-gray-700'>
                        <h1 className='text-2xl font-medium'>Profile for Rafael Kunde</h1>
                        <p>This is a profile page. Easy to shortlist</p>
                    </div>
                    <button className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-3 px-4 rounded-lg font-medium'>Shortlist</button>
                </div>
                <div className='relative'>
                    <img className='w-full h-[200px] rounded-lg' src="https://deepcreekcenter.com/wp-content/uploads/2017/08/btx-placeholder-04-6.jpg" alt="" />
                    <img className='w-36 h-36 object-cover absolute top-1/2 left-5 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopuHQRxABuBbEX_KBYl9W05K1S7KlYQ4OnU2SI-LYfMCYmL2ytnZ1qXfq03lcWmtbpig&usqp=CAU" alt="" />
                    <div className='flex gap-1 text-gray-500 absolute -bottom-10 right-0'>
                        <AiOutlineInstagram className='w-8 h-8' />
                        <AiFillLinkedin className='w-8 h-8' />
                    </div>
                </div>
                <div className='mt-16'>
                    <div className='flex gap-1 items-center'>
                        <h4 className='text-lg font-medium'>Rafael Kunde</h4>
                        <img className='w-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" alt="" />
                    </div>
                    <p className='text-gray-500 text-sm'>
                        Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.
                        Product Infrastructure
                    </p>
                    <div className='flex flex-wrap gap-2 text-sm font-medium mt-3'>
                        <div className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full'>Vocalist</div>
                        <div className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full'>Singing</div>
                        <div className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full'>Guiter</div>
                        <div className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full'>Influencer</div>
                    </div>
                    <div className='flex gap-2 text-sm font-medium mt-8'>
                        <div className='py-1 px-3 border bg-blue-500 text-white rounded-lg'>Follow</div>
                        <div className='py-1 px-3 border text-blue-600 border-blue-500 rounded-lg'>View Profile</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewArtistModal;