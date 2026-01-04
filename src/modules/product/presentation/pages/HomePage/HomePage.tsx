import "./HomePage.scss";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import MainBanner from "../../../../banner/presentation/components/MainBanner/MainBanner";

function HomePage() {
  return (
    <div className="home">
      <div className="container">
        <MainBanner />
        <PopularProducts />
      </div>
    </div>
  );
}

export default HomePage;
