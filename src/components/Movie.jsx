import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './partial/Loading';
import Topnav from './partial/Topnav';
import Dropdown from './partial/Dropdown';
import Cards from './partial/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "FlickNest | Movies";

    const getMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results.length > 0) {
                setMovie((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    }

    const refreshHandler = () => {
        if (movie.length === 0) {
            getMovie();
        } else {
            setPage(1);
            setMovie([]);
            getMovie();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category]);


    return movie.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='px-[3%] w-full flex items-center justify-between'>
                <h1 className='text-xl text-zinc-400 font-semibold'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></i>
                    Movie<small className=' ml-1 text-sm text-zinc-600'>({category})</small>
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={['popular', 'top_rated','upcoming','now_playing']}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={movie.length}
                next={getMovie()}
                hasMore={hasMore}
            >
                <Cards data={movie} title='movie' />
            </InfiniteScroll>
        </div>
    ) : <Loading />;
}

export default Movie