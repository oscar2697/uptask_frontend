import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <h1 className='font-black text-center text-2xl text-white'>The page you are looking for can't be found</h1>
            <img src='404.jpg' alt='404' className='mt-3 '/>

            <p className='mt-10 text-center text-white text-xl'>
                uh/oh! Nothig here... {''}
                <Link to='/' className='text-fuchsia-500 hover:text-fuchsia-800'>Go Back Home</Link>
            </p>
        </>
    )
}

export default NotFound
