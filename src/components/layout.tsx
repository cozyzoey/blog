import { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className='max-w-screen-lg px-4 mx-auto flex flex-col gap-y-20'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export const Head = () => {
  return <title>CozyZoey's Blog</title>
}
