import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Notfound from './Notfound';

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie")? 'movie' : 'tv';
    const ytvideo = useSelector((state) => state[category].info.videos);

    return (
        <div className='absolute top-0 left-0 z-[200] bg-[rgba(0,0,0,.9)] w-screen h-screen flex items-center justify-center'>
            <Link onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-close-fill cursor-pointer text-2xl text-white absolute top-5 right-10 m-5" />
            {ytvideo && <ReactPlayer controls height={600} width={1200} url={`https://www.youtube.com/watch?v=${ytvideo.key}`} />}
            {!ytvideo && <Notfound />}
        </div>
    );
};

export default Trailer;
