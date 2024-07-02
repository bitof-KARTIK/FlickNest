import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './partial/Loading';
import Topnav from './partial/Topnav';
import Dropdown from './partial/Dropdown';
import Cards from './partial/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title= "FlickNest | Popular";

    const getPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`);
            console.log(data);
            if (data.results.length > 0) {
                setPopular((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching popular data:", error);
        }
    }

    const refreshHandler = () => {
        if (popular.length === 0) {
            getPopular();
        } else {
            setPage(1);
            setPopular([]);
            getPopular();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category]); // Include duration in dependency array

    return popular.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='px-[3%] w-full flex items-center justify-between'>
                <h1 className='text-xl text-zinc-400 font-semibold'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></i>
                    Popular
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={['movie', 'tv']}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={popular.length}
                next={getPopular()}
                hasMore={hasMore}
            >
                <Cards data={popular} title={category} />
            </InfiniteScroll>
        </div>
    ) : <Loading />;
}

export default Popular;
