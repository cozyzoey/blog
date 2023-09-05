import { Link } from 'gatsby'

export default function () {
  return (
    <header className='pt-8 pb-4 border-solid border-b border-slate-100'>
      <div className='center-content flex items-center justify-between'>
        <Link to='/' className='text-xl font-medium'>
          CozyZoey
        </Link>
        <nav className='text-lg font-medium flex gap-5'>
          <Link to='/blog' activeClassName='font-md'>
            Blog
          </Link>
          <Link to='/about' activeClassName='font-md'>
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
