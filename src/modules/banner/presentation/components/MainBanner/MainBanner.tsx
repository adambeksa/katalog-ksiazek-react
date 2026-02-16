import { Link } from "react-router-dom";
import { ROUTES } from "../../../../../routes";
import "./MainBanner.scss";

function MainBanner() {
  return (
    <section className="banner">
      <h1 className="banner__title">Witam w bibliotece!</h1>
      <p className="banner__text">
        Wszystkie dane o książkach pochodzą z serwisu{" "}
        <a href="https://wolnelektury.pl/" className="banner__link">
          WolneLektury.pl
        </a>
        . Dzięki uprzejmości twórców API, mogę stworzyć swój katalog książek w
        celach szkoleniowych. Aplikacja, którą właśnie wyświetlasz jest moim
        pierwszym projektem w React.
      </p>
      <Link to={ROUTES.PRODUCTS} className="banner__cta">
        Przeglądaj książki
      </Link>
    </section>
  );
}

export default MainBanner;
