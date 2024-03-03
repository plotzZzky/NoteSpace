import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@comps/navbar'
import Footer from '@comps/footer'
import { AuthProvider } from './components/authContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Início - NoteSpace ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <header>
              <NavBar></NavBar>
            </header>

            <main>
              {children}
            </main>

            <Footer></Footer>
          </AuthProvider>
        </body>
    </html>
  )
}
