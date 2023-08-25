import React from 'react'
import Navbar from '../components/layout/navbar'
import Footer from '../components/layout/footer'
import ThemeProvider from '../components/ui/themeProvider'

const PrimaryLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider attribute="class">
      <main className="dark:bg-gray-900 w-full h-full">
        <section className="container flex flex-col min-h-screen">
          <Navbar/>
          {children}
          <Footer/>
        </section>
      </main>
    </ThemeProvider>
  )
}
export default PrimaryLayout