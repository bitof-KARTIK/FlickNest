import React from 'react';
import { Link } from 'react-router-dom';
import noimage from "/noimage.jpg";

const Cards = ({ data,title }) => {
    return (
        <div className='flex flex-wrap w-full h-full px-[3%] bg-[#1f1e24]'>
            {data.map((c, i) =>
                <Link to={`/${c.media_type || title}/details/${c.id}`} className=' relative w-[21vh] mr-[3%] mb-[3%]' key={i}>
                    <img className='h-[35vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
                        src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`:noimage}
                        alt="" />
                    <h1 className='text-xl text-zinc-200 mt-2 font-semibold'>
                        {c.name || c.title || c.original_name || c.original_title}
                    </h1>

                    {c.vote_average && <div className='text-white absolute right-[-10%] bottom-[30%] w-[5vh] text-lg font-semibold h-[5vh] flex justify-center items-center bg-yellow-600 rounded-full'>{(c.vote_average * 10).toFixed()} <sup>%</sup>

                    </div>}
                </Link>
            )}
        </div>
    );
};

export default Cards;
