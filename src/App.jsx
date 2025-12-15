import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './presentation/components/Layout'
import Home from './presentation/pages/Home/Home'
import ProductListing from './presentation/pages/ProductListing/ProductListing'
import ProductCard from './presentation/pages/ProductCard/ProductCard'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produkty" element={<ProductListing />} />
          <Route path="/produkt/:id" element={<ProductCard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

