import { Inter } from 'next/font/google'
import '../globals.css'
import './page.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Entrar - NoteSpace',
}

export default function RootLayout({ children }) {
  return (
    <section>
      {children}
    </section>
  )
}
