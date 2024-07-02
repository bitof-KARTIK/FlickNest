import React from 'react';

import { Link } from 'react-router-dom';

export const SideNav = () => {
    
    return (
        <div className='w-[20%] h-screen border-r-2 border-zinc-400 p-3 md:p-4 lg:p-5'>
            <h1 className='text-lg text-white font-bold flex items-center mb-4'>
                <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
                <span className='text-lg '>FlickNest</span>
            </h1>
            <nav className='flex flex-col text-zinc-400 text-sm lg:text-base gap-2'>
                <h1 className="text-white font-semibold text-sm lg:text-base mb-4 mt-3 lg:mb-5">
                    New Feeds
                </h1>
                <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2 lg:p-3 flex items-center'>
                    <i className="mr-2 ri-fire-fill"></i> Trending
                </Link>
                <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2 lg:p-3 flex items-center'>
                    <i className="mr-2 ri-bar-chart-fill"></i> Popular
                </Link>
                <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2 lg:p-3 flex items-center'>
                    <i className="mr-2 ri-movie-2-fill"></i> Movies
                </Link>
                <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2 lg:p-3 flex items-center'>
                    <i className="mr-2 ri-tv-2-fill"></i> TV Shows
                </Link>
                <Link to="/person" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2 lg:p-3 flex items-center'>
                    <i className="mr-2 ri-team-fill"></i> People
                </Link>
            </nav>
            <hr className='border-none h-[1px] bg-zinc-400 mb-7 mt-3'/>
            <nav className='flex flex-col text-zinc-400 text-sm lg:text-base gap-2'>
                <h1 className="text-white font-semibold text-sm lg:text-base mb-4 lg:mb-5">
                    Website Information
                </h1>
                <Link to="/about" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2 lg:p-3 flex items-center'>
                    <i className="mr-2 ri-information-fill"></i> About 
                </Link>
                <Link to="/contact" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2 lg:p-3 flex items-center'>
                    <i className="mr-2 ri-phone-fill"></i> Contact
                </Link>
            </nav>
        </div>
    );
};

export default SideNav;
