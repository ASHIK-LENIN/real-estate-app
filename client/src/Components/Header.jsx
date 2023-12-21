import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

    const  { currentUser } = useSelector((state) => state.user );
  

  return (
    <>
<header className='bg-slate-100 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
<Link  to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
       <span className='text-orange-600'>Settle</span>
       <span className='text-blue-700'>Down</span>
    </h1>
    </Link>
    <form className='bg-white p-3 rounded-lg flex items-center' >
        <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
<FaSearch /> 
    </form>
    <ul className='flex gap-4'>
        <Link to='/'>
        <li className='hidden sm:inline text-blue-700  font-semibold hover:text-orange-600'>Home</li>
        </Link>
        <Link to='/about'>

        <li className='hidden sm:inline text-blue-700  font-semibold hover:text-orange-600'>About</li>
        </Link>

       
        <Link to  ='/profile'>
            {
                currentUser ? (
                    <img className='rounded--full h-7 w-7 object-cover' src={ currentUser.avatar } alt="profile" />
                ): (
                    <li className='text-blue-700 font-semibold hover:text-orange-600 '>Login</li>
                )
            }


        </Link>
    </ul>
    </div>
    

</header>

    
    </>
  )
}

export default Header