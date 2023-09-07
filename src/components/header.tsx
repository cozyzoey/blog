import { Link } from 'gatsby'
import { BiSolidMoon } from 'react-icons/bi'
import { BsSunFill } from 'react-icons/bs'
import ThemeToggler from 'utils/ThemeToggler'

export default function () {
  return (
    <header className='pt-6 pb-4 border-solid border-b border-slate-100 print:hidden dark:text-white'>
      <div className='center-content flex items-center justify-between'>
        <Link to='/' className='text-xl font-medium'>
          CozyZoey
        </Link>
        <div className='w-max flex gap-5'>
          <nav className='text-lg flex gap-5 text-slate-500 dark:text-slate-300'>
            <Link
              to='/blog'
              className='xl:hover:underline'
              activeClassName='text-slate-700 dark:text-white font-medium'
            >
              Blog
            </Link>
            <Link
              to='/about'
              className='xl:hover:underline'
              activeClassName='text-slate-700 dark:text-white font-medium'
            >
              About
            </Link>
          </nav>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <label className='cursor-pointer text-slate-400 dark:text-slate-300 xl:hover:text-slate-500'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    toggleTheme(e.target.checked ? 'dark' : 'light')
                  }
                  checked={theme === 'dark'}
                  className='hidden'
                />
                {theme === 'dark' ? (
                  <BsSunFill size={24} />
                ) : (
                  <BiSolidMoon size={24} />
                )}
              </label>
            )}
          </ThemeToggler>
        </div>
      </div>
    </header>
  )
}
