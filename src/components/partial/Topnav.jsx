import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results || []);
            console.log(data);
        } catch (error) {
            console.log("Error: " + error);
            setSearches([]);
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            getSearches();
        } else {
            setSearches([]);
        }
    }, [query]);

    return (
        <div className='w-[80%] h-[10vh] relative flex mx-auto items-center ml-[15%]'>
            <i className="text-zinc-400 text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-200"
                type="text"
                placeholder='search anything'
            />
            {query.length > 0 &&
                <i
                    onClick={() => setQuery("")}
                    className="text-zinc-400 text-3xl ri-close-line right-0"
                ></i>
            }
            <div className='w-[50%] max-h-[50vh] z-[100] bg-zinc-200 absolute top-[100%] left-[5%] overflow-auto rounded'>
                {searches.map((s, i) => (
                    <Link
                        to={`/${s.media_type}/details/${s.id}`} // Adjusted line to fix the URL
                        key={i}
                        className="p-10 w-full font-semibold hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600 flex justify-start items-center border-b-2 border-zinc-100"
                    >
                        <img
                            className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg'
                            src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage}
                            alt={s.name || s.title || s.original_name || s.original_title || "No image available"}
                        />
                        <span>{s.name || s.title || s.original_name || s.original_title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Topnav;
