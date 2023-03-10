import { useRootContext } from '../../../../contexts/RootProvider';
import useYoutubeEmbaded from '../../../../hooks/useYoutubeEmbaded';
import { GiCheckMark } from "react-icons/gi";

const ArtistWorkView = ({ artist = {} }) => {
    const { shortlistedArtist, handleShortlist, avatar, setArtistProfile } = useRootContext();

    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center gap-2 mb-3'>
                <button onClick={() => setArtistProfile(artist.owner_id)}>
                    <img className='w-12 h-12' src={artist.profile_pic || avatar} alt="" />
                </button>
                <div className='text-sm'>
                    <button onClick={() => setArtistProfile(artist.owner_id)}><span className='font-medium'>{artist.owner_name}</span></button>
                    <p>
                        {
                            artist.skills.join(", ").length >= 40
                                ? artist.skills.join(", ").slice(0, 41) + '...'
                                : artist.skills.join(", ")
                        }
                    </p>
                </div>
                {
                    shortlistedArtist?.includes(artist.owner_id)
                        ? <button className='ml-auto text-green-600 border-2 bg-sky-100 border-sky-100 py-2.5 px-4 rounded-lg font-medium'><GiCheckMark /></button>
                        : <button onClick={() => handleShortlist(artist.owner_id, artist.owner_name, artist.profile_pic)} className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>Shortlist</button>
                }
            </div>
            <div>
                {
                    artist.demo_type === "Youtube Link"
                    && <div className='h-[270px] 2xl:h-[350px]'>
                        {useYoutubeEmbaded(artist.weblink, 'rounded-lg')}
                    </div>
                }
                {
                    artist.demo_type === "Instagram Link"
                    && <div className='border rounded-lg bg-gray-200 overflow-hidden'>
                        <iframe src={artist.weblink} className="mx-auto border-l border-r -mt-14" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                    </div>
                }
                {
                    artist.demo_type === "Soundcloud Link"
                    && <div className='border rounded-lg'>
                        <iframe width="100%" height="166" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=${artist.weblink};auto_play=false&amp;show_artwork=true`}></iframe>
                    </div>
                }
                {
                    artist.demo_type === "Image"
                    && <div className='bg-black'>
                        <img className='w-1/2 mx-auto bg-white' src={artist.file} alt="" />
                    </div>
                }
                {
                    artist.demo_type === "Video"
                    && <div className='border rounded-lg'>
                        <video controls autoPlay width="300" className='mx-auto'>
                            <source src={artist.file} type="video/mp4" />
                        </video>
                    </div>
                }
                {
                    artist.demo_type === "Other Document"
                    && <embed src={artist.file} className="w-full" height="500" />
                }
            </div>
        </div>
    );
};

export default ArtistWorkView;