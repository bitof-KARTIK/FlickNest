import React from 'react';
import { Link } from 'react-router-dom';
import noimage from "/noimage.jpg";

const HorizontalCards = ({ data }) => {
    return (
        <div className='w-[100%] flex overflow-y-hidden mb-5 p-2'>
            {data.length > 0 ? data.map((d, i) =>
                <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[15%] min-h-[40vh] mr-4 bg-zinc-900 overflow-visible mb-5'>
                    <img className='w-full h-[45%] object-cover'
                        src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}` : noimage} alt="" />
                    <div className='text-white p-2 overflow-y-auto'>
                        <h1 className='text-base font-semibold mb-1'>
                            {d.name || d.title || d.original_name || d.original_title}
                        </h1>
                        <p className='text-sm'>
                            {d.overview.slice(0, 50)}...<span className='text-zinc-500'>more</span>
                        </p>
                    </div>
                </Link>
            ) : <h1 className='text-2xl text-white font-black text-center mt-4'>Nothing to show</h1>}
        </div>
    );
};

export default HorizontalCards;
