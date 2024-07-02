import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './partial/Loading';
import Topnav from './partial/Topnav';
import Dropdown from './partial/Dropdown';
import Cards from './partial/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setPerson] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "FlickNest | People";

    const getPerson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if (data.results.length > 0) {
                setPerson((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching person data:", error);
        }
    }

    const refreshHandler = () => {
        if (person.length === 0) {
            getPerson();
        } else {
            setPage(1);
            setPerson([]);
            getPerson();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return person.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='px-[3%] w-full flex items-center justify-between'>
                <h1 className='text-xl text-zinc-400 font-semibold'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></i>
                    People
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                </div>
            </div>
            <InfiniteScroll
                dataLength={person.length}
                next={getPerson()}
                hasMore={hasMore}
            >
                <Cards data={person} title='person' />
            </InfiniteScroll>
        </div>
    ) : <Loading />;
}

export default People