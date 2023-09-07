export default function () {
  return (
    <footer className='py-6 border-solid border-t border-slate-100 print:hidden dark:text-white'>
      <div className='center-content'>
        &copy; {new Date().getFullYear()} by CozyZoey's blog. All rights
        reserved.
      </div>
    </footer>
  )
}
