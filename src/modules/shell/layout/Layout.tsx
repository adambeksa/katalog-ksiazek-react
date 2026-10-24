import { Link, NavLink } from "react-router-dom";
import "./Layout.scss";
import { ROUTES } from "../../../routes";

import { ReactNode } from "react";
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="header__container">
          <Link to={ROUTES.HOME} className="header__logo">
            <h1 className="header__title">Biblioteka ABE</h1>
          </Link>
          <nav className="navigation">
            <NavLink to={ROUTES.HOME} end className="navigation__link">
              Strona Główna
            </NavLink>
            <NavLink to={ROUTES.PRODUCTS} className="navigation__link">
              Katalog książek
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="layout__main">{children}</main>
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">&copy; PetProject Biblioteka ABE 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
