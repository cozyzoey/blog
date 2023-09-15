import { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className='text-slate-950 dark:text-white dark:bg-slate-900 transition-all'>
      <Header />
      <main className='pt-14 pb-20'>{children}</main>
      <Footer />
    </div>
  )
}

export const Head = () => {
  return <title>CozyZoey's Blog</title>
}
