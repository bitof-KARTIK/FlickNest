import loading from '/loading.gif';

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-black'>
        <img className='h-[50%] object-contain' src={loading} alt="" />
    </div>
  )
}

export default Loading;