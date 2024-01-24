import dynamic from 'next/dynamic'
import './globals.css';
import '@/Css/Slider.module.css';
import '@/Css/topAiring.module.css';
import "@/Css/anime.module.css";
import "@/Css/style.css";
import 'swiper/css/pagination';
export const metadata = {
  title: 'ANIMEX',
  keywords: [
    'One Piece',
    'Black Clover',
    'bleach',
  ],
  icons: '/icon.png',
}
const SideBar = dynamic(() => import('./NavBar/page'));

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body suppressHydrationWarning={true}>
        <SideBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
