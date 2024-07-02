import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  document.title = "FlickNest | About";

  return (
    <div className='w-screen h-screen p-6'>
      <div className='w-full flex items-center justify-between mb-6'>
        <h1 className='text-xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"></i>
          About
        </h1>
      </div>
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-zinc-200'>Welcome to FlickNest!</h2>
        <p className='mt-4 text-zinc-300'>
          FlickNest is your one-stop destination for all things movies and TV shows. My platform provides the latest information on trending movies, top-rated films, upcoming releases, and currently playing shows.
        </p>
        <p className='mt-4 text-zinc-300'>
          I am passionate about bringing you the best viewing experience. Whether you're looking for recommendations, detailed information, or just exploring new content, FlickNest has got you covered.
        </p>
        <p className='mt-4 text-zinc-300'>
          At FlickNest, I believe that movies and TV shows are more than just entertainment; they are a window into different worlds, cultures, and perspectives. My mission is to make it easy for you to discover new favorites and revisit old classics.
        </p>
        <p className='mt-4 text-zinc-300'>
          My Features:
        </p>
        <ul className='list-disc list-inside mt-2 text-zinc-300'>
          <li><strong>Trending Movies:</strong> Stay updated with the latest trending movies. My curated list ensures you never miss out on what's popular.</li>
          <li><strong>Top-Rated Films:</strong> Discover critically acclaimed movies that have garnered praise from audiences and critics alike.</li>
          <li><strong>Upcoming Releases:</strong> Get a sneak peek at upcoming movies and TV shows. Be the first to know what's coming to the big screen and streaming platforms.</li>
          <li><strong>Now Playing:</strong> Find out what's currently showing in theaters. Plan your movie nights with ease.</li>
          <li><strong>Personalized Recommendations:</strong> Based on your viewing history and preferences, I recommend movies and TV shows that you'll love.</li>
        </ul>
        
        <p className=' text-zinc-300 font-bold mt-10'>
          Thank you for choosing FlickNest. I hope you enjoy your time here and find everything you're looking for. Happy viewing!
        </p>
      </div>
    </div>
  );
}

export default About;
