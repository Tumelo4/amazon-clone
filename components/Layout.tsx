import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'


type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
          <Head>
          </Head>
          <header>
            <NavBar />
          </header>
          <main className=' max-w-full mx-auto'>
              {children}
          </main>
          <footer>
              <Footer />
          </footer>
    </div>
  )
}

export default Layout