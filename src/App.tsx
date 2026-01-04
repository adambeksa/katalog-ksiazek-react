import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './modules/shared/ui/layout/Layout'
import HomePage from './modules/product/presentation/pages/HomePage/HomePage'
import ProductListingPage from './modules/product/presentation/pages/ProductListingPage/ProductListingPage'
import ProductCardPage from './modules/product/presentation/pages/ProductCardPage/ProductCardPage'
import { ProductProvider } from './modules/product/presentation/context/ProductContext'

function App() {
  return (
    <ProductProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/produkt/:id" element={<ProductCardPage />} />
          </Routes>
        </Layout>
      </Router>
    </ProductProvider>
  )
}

export default App

