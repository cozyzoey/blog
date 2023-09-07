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
          <nav className='text-lg font-medium flex gap-5'>
            <Link to='/blog' activeClassName='font-md'>
              Blog
            </Link>
            <Link to='/about' activeClassName='font-md'>
              About
            </Link>
          </nav>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <label className='cursor-pointer text-slate-400 dark:text-slate-300'>
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
