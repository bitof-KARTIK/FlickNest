import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './partial/Loading';
import Topnav from './partial/Topnav';
import Dropdown from './partial/Dropdown';
import Cards from './partial/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Tvshows = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tv, setTv] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "FlickNest | Tv Shows";

    const getTv = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length > 0) {
                setTv((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching tv data:", error);
        }
    }

    const refreshHandler = () => {
        if (tv.length === 0) {
            getTv();
        } else {
            setPage(1);
            setTv([]);
            getTv();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return tv.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='px-[3%] w-full flex items-center justify-between'>
                <h1 className='text-xl text-zinc-400 font-semibold'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></i>
                    Tv shows<small className=' ml-1 text-sm text-zinc-600'>({category})</small>
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={['on_the_air', 'popular', 'top_rated', 'airing_today']}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={tv.length}
                next={getTv()}
                hasMore={hasMore}
            >
                <Cards data={tv} title='tv' />
            </InfiniteScroll>
        </div>
    ) : <Loading />;
}

export default Tvshows