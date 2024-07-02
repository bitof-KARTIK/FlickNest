import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partial/Topnav';
import Dropdown from './partial/Dropdown'; // Ensure this component is correctly handling changes
import axios from '../utils/axios';
import Cards from './partial/Cards';
import Loading from './partial/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Navigate back one step in the history
  };

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title= "FlickNest | Trending";
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      // settrending(data.results);
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      }else{
        sethasMore(false);
      }

    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  }


  const refereshhandler = () => {
    if (trending.length == 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
    }
  }
  useEffect(() => {
    refereshhandler();
  }, [category, duration]);



  return trending.length>0 ? (
    <div className='w-screen h-screen'>
      <div className=' px-[3%] w-full flex items-center justify-between'>
        <h1 className='text-xl text-zinc-400 font-semibold'>
          <i onClick={handleClick} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></i>
          Trending
        </h1>
        <div className='flex items-center w-[80%]'>
          <Topnav />
          <Dropdown
            title="Category"
            options={['movie', 'tv', 'all']}
            func={(e) => setcategory(e.target.value)}
          />
          {/* Adjusted spacing */}
          <div className='w-[1.3%]'></div>
          <Dropdown
            title="Duration"
            options={['week', 'day']}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending()}
        hasMore={hasMore}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>

    </div>
  ) : <Loading />;
};

export default Trending;
