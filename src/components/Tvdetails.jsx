import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadtv, removetv } from '../store/actions/tvActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './partial/Loading';
import HorizontalCards from './partial/HorizontalCards';

const Tvdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${`https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className='relative w-screen h-[200vh] px-[8%]'
    >
      {/* part 1 nav */}
      <nav className='h-[8vh] w-full text-zinc-100 flex items-center gap-9 text-xl'>
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></Link>
        <a href={info.detail.homepage} target="_blank" ><i className="ri-external-link-line"></i></a>
        <a href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} target="_blank"><i className="ri-earth-fill"></i></a>
        <a href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`} target='_blank'>imdb</a>
      </nav>

      {/* part 2 poster and details */}

      <div className='w-full flex '>
        <img className='h-[50vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt="" />
        <div className="content ml-[6%] text-white">
          <h1 className='text-5xl font-black '>{info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            <small className='text-lg font-bold text-zinc-300'>({info.detail.first_air_date.split("-")[0]})</small>
          </h1>
          <div className='flex items-center gap-x-4 mt-2 mb-3'>
            <span className='text-white w-[5vh] text-md font-semibold h-[5vh] flex justify-center items-center bg-yellow-600 rounded-full'>{(info.detail.vote_average * 10).toFixed()} <sup>%</sup>

            </span>
            <h1 className='font-semibold text-lg leading-6 w-[60px] '>User Score</h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className='text-lg font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>
          <h1 className='text-xl mt-4 mb-2'>
            Overview
          </h1>
          <p className='text-sm'>
            {info.detail.overview}
          </p>
          <h1 className='text-xl mt-4 mb-2'>
            Tv Translated
          </h1>
          <p className='text-sm mb-8'>
            {info.translations.join(", ")}
          </p>


          <Link className='p-3 bg-[#6556cd] rounded-lg' to={`${pathname}/trailer`}>
            <i className="ri-play-fill text-xl mr-2"></i>
            Play Trailer</Link>

        </div>

      </div>

      {/* part 3 platforms */}

      <div className='w-[80%] flex flex-col gap-y-4 mt-8 mb-5'>

        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-8 items-center text-white">
            <h1>Available on Platforms</h1>
            {info.watchproviders.flatrate.map((w, index) => (
              <img title={w.provider_name} key={index} className="w-[5vh] h-[5vh] object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-8 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, index) => (
              <img title={w.provider_name} key={index} className="w-[5vh] h-[5vh] object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-8 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, index) => (
              <img title={w.provider_name} key={index} className="w-[5vh] h-[5vh] object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}
      </div>

      {/* seasons */}
      <hr className='mb-2 border-none h-[2px] bg-zinc-500' />
      <h1 className='text-2xl font-bold text-white'>Seasons</h1>
      <div className='w-[100%] flex overflow-y-hidden mb-5 p-2'>
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => (
          <div key={i} className='mb-1 min-w-[200px]'> {/* Adjusted here */}
            <img className='h-[35vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              alt="" />
            <h1 className='text-xl text-zinc-200 mt-2 font-semibold'>
              {s.name}
            </h1>
          </div>
        )) : <h1 className='text-2xl text-white font-black text-center mt-4'>Nothing to show</h1>}
      </div>





      {/* part 5 recommendations */}
      <hr className='mb-2 border-none h-[2px] bg-zinc-500' />
      <h1 className='text-2xl font-bold text-white'>Recommendations & Similar Stuff</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />



      <Outlet />
    </div>
  ) : <Loading />;
}

export default Tvdetails