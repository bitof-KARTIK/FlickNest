import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './partial/Loading';
import HorizontalCards from './partial/HorizontalCards';
import Dropdown from "./partial/Dropdown";

const Persondetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value.toLowerCase());
  };

  return info ? (
    <div className='px-[8%] w-screen min-h-[220vh] bg-[#1f1e24]'>
      {/* part 1 nav */}
      <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-9 text-xl'>
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></Link>
      </nav>

      <div className='w-full flex'>
        {/* left poster and details */}
        <div className='w-[20%] '>
          <img className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt="" />
          <hr className='mb-2 mt-8 border-none h-[2px] bg-zinc-500' />

          {/* socialmedia */}
          <div className='text-xl flex gap-x-4 text-white'>
            <a href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} target="_blank"><i className="ri-earth-fill"></i></a>
            <a href={`https://www.facebook.com/${info.externalid.facebook_id}`} target="_blank"><i className="ri-facebook-circle-fill"></i></a>
            <a href={`https://www.instagram.com/${info.externalid.instagram_id}`} target="_blank"><i className="ri-instagram-fill"></i></a>
            <a href={`https://x.com/${info.externalid.twitter_id}?lang=en/`} target="_blank"><i className="ri-twitter-x-fill"></i></a>
          </div>

          {/* personal information */}
          <h1 className='text-xl text-zinc-400 font-semibold my-3'>Personal Info</h1>
          <h1 className='text-md text-zinc-400 font-semibold '>Known For</h1>
          <h1 className='text-zinc-400'>{info.detail.known_for_department}</h1>
          <h1 className='text-md text-zinc-400 font-semibold mt-3 '>Gender</h1>
          <h1 className='text-zinc-400'>{info.detail.gender === 2 ? "Male" : "Female"}</h1>
          <h1 className='text-md text-zinc-400 font-semibold mt-3'>BirthDay</h1>
          <h1 className='text-zinc-400'>{info.detail.birthday}</h1>
          <h1 className='text-md text-zinc-400 font-semibold mt-3'>DeathDay</h1>
          <h1 className='text-zinc-400'>{info.detail.deathday ? info.detail.deathday : "Fucking Alive"}</h1>
          <h1 className='text-md text-zinc-400 font-semibold mt-3'>Place of Birth</h1>
          <h1 className='text-zinc-400'>{info.detail.place_of_birth}</h1>
          <h1 className='text-md text-zinc-400 font-semibold mt-3'>Also known ss</h1>
          <h1 className='text-zinc-400'>{info.detail.also_known_as.join(", ")}</h1>
        </div>

        {/*part 3 right details and information  */}
        <div className='w-[80%] ml-[3%]'>
          <h1 className='text-6xl text-zinc-400 font-black my-3'>{info.detail.name}</h1>
          <h1 className='text-lg text-zinc-400 font-semibold '>Biography</h1>
          <p className='text-zinc-400 mt-2'>{info.detail.biography}</p>
          <h1 className='text-md text-zinc-400 font-semibold mt-2'>Work Summary</h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className='w-full flex justify-between'>
            <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Acting</h1>
            <Dropdown title="Category" options={["Tv", "movie"]} func={handleCategoryChange} />
          </div>
          <div className='list-disc text-zinc-400 w-full h-[50vh] shadow-[rgba(241,241,240,0.3)] shadow-xl mt-3 overflow-x-hidden overflow-y-auto border-2 border-zinc-700 px-10 py-5'>
            {info[`${category}Credits`]?.cast?.map((c, i) => (
              <li key={i} className='hover:text-white hover:bg-[#18171c] duration-300 cursor-pointer'>
                <Link className='text-sm' to={`/${category}/details/${c.id}`}>
                  <span>{c.name || c.title || c.original_name || c.original_title}</span>
                  <span className='block mb-3'> {c.character && `Character name- ${c.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />;
};

export default Persondetails;
