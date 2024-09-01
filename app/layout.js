import { Inter } from "next/font/google";
import SwitchClient from './components/SwitchClient'
import ThemeProviderClient from './provider/ThemeProviderClient'
import CustomNavLink from "./components/CustomNavLink";
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FutSupp",
  description: "La web para seguir tus equipos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className='main-style'>
        <ThemeProviderClient>
        {/* BARRA DE NAVEGACION */}
        <nav className="bg-main" data-bs-theme="">
          <header className="d-flex flex-wrap justify-content-center py-3 mx-5">
            <Link
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
              <img src="/img/liga_logo.png" alt="Logo Liga" style={{width: '60px', height: '60px'}}></img>
              <span className="titulo1 fw-bold ms-2">FUT.SUPP</span>
            </Link>
              <ul className="nav nav-pills align-items-center">
              <li className="nav-item">
                <CustomNavLink href="/">HOME</CustomNavLink>
              </li>
              <li className="nav-item">
                <CustomNavLink href="/grada">GRADA</CustomNavLink>
              </li>
              <li className="nav-item">
                <CustomNavLink href="/noticias">NOTICIAS</CustomNavLink>
              </li>
              <li>
                <SwitchClient/>
              </li>
            </ul>
          </header>
        </nav>
        {/* EMPIEZA EL CUERPO */}
        {children}
        {/* FOOTER */}
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 bg-main px-5 mt-auto">
          <p className="col-md-4 mb-0 footer-style">© 2024 Company, Inc</p>
          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <p className="titulo fw-bold align-items-center mb-0 footer-style">Fut.Supp</p>
          </a>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="#" className="px-2 footer-style nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="px-2 footer-style nav-link">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="px-2 footer-style nav-link">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="px-2 footer-style nav-link">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="px-2 footer-style nav-link">
                About
              </a>
            </li>
          </ul>
        </footer>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
