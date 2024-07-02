import React, { useEffect, useState } from 'react';
import SideNav from './partial/SideNav';
import Topnav from './partial/Topnav';
import axios from '../utils/axios';
import Header from './partial/Header';
import HorizontalCards from './partial/HorizontalCards';
import Dropdown from './partial/Dropdown';
import Loading from './partial/Loading';

const Home = () => {
  document.title = "FlickNest | HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  useEffect(() => {
    getTrending();
   !wallpaper && getHeaderWallpaper();
  }, [category]);


  return wallpaper && trending? (
    <>
      <SideNav />
      <div className="w-[100%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className='p-4 flex justify-between'>
          <h1 className='text-2xl font-semibold text-zinc-400 '>Trending</h1>
          {/* Corrected Dropdown usage with currentValue prop */}
          <Dropdown title="Filter" options={['tv', 'movie', 'all']} func={(e) => setcategory(e.target.value)} currentValue={category} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : <Loading/>
}

export default Home;
