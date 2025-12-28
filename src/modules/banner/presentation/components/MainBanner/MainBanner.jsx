import { Link } from 'react-router-dom'

function MainBanner() {
  return (
    <section className="banner">
      <h1>Witam w mojej bibliotece!</h1>
      <p>
        Wszystkie dane o książkach pochodzą z serwisu <a href="https://wolnelektury.pl/">WolneLektury.pl</a>. Dzięki uprzejmości twórców API, mogę stworzyć swój katalog książek w celach szkoleniowych.
        Aplikacja, którą właśnie wyświetlasz jest moim pierwszym projektem w React. 
      </p>
      <Link to="/products" className="cta-button">
        Przeglądaj książki
      </Link>
    </section>
  )
}

export default MainBanner