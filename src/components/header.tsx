import { Link } from 'gatsby'

export default function () {
  return (
    <header className='pt-10 pb-4 border-solid border-b border-gray-300'>
      <Link to='/' className='text-3xl font-thin block mb-5'>
        cozyzoey's blog
      </Link>
      <nav className='text-xl'>
        <Link to='/blog' activeClassName='font-md'>
          Blog
        </Link>
      </nav>
    </header>
  )
}
