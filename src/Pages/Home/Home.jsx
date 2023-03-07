import { useRootContext } from '../../contexts/RootProvider';
import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import ChatboxHome from './ChatboxHome';
import { Link } from 'react-router-dom';

const Home = () => {
    const { setIsFullTime, isFullTime } = useRootContext();

    return (
        <header>
            <nav className='sticky top-0 left-5 md:left-16 flex items-center justify-between p-3 shadow z-50 bg-white'>
                <img src={adbhutGIF} className='w-28 md:w-32' />

                <div className='flex items-center gap-4'>
                    <p className='font-medium uppercase space-x-2 text-xs md:text-base'>
                        <Link className=''>Artist</Link>
                        <a target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show' className=''>Hiring</a>
                    </p>
                    <label for="userState" className="inline-flex items-center p-1 cursor-pointer bg-gray-300 text-black text-xs md:text-sm font-medium uppercase select-none">
                        <input onChange={() => setIsFullTime(prev => !prev)} id="userState" type="checkbox" className="hidden peer" />
                        <span className={`px-4 py-2 ${isFullTime ? "bg-black text-white" : "bg-gray-300"} duration-300`}>Full Time</span>
                        <span className={`px-4 py-2 ${isFullTime ? "bg-gray-300" : "bg-black text-white"} duration-300`}>For Project</span>
                    </label>
                </div>
            </nav>


            <section className='h-screen lg:flex items-center justify-center'>

                <div className='w-11/12 max-w-screen-xl mx-auto pt-24 pb-10 lg:pt-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-20'>
                    <div className='order-last w-full lg:w-5/6 mx-auto'>
                        <div className='border rounded-lg shadow-lg'>
                            <ChatboxHome />
                        </div>
                        <div className='mt-5 text-gray-500 text-sm'>
                            <a target="_blank" href="https://nsnco.in/" className='text-blue-600'>Learn more</a> about NsNco
                        </div>
                    </div>

                    <div className='order-first'>
                        <h1 className='text-2xl sm:text-3xl font-bold mb-4'>
                            Creating the most amazing creative content.<br />
                            Now available at convenience of a conversation.
                        </h1>
                        <p>
                            The Most Efficient Content Production Platform of Artists. <br />
                            Accessible to everyone via this chat. Adbhut.io, try it.
                        </p>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Home;