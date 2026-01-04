import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './modules/shell/layout/Layout'
import HomePage from './modules/product/presentation/pages/HomePage/HomePage'
import ProductListingPage from './modules/product/presentation/pages/ProductListingPage/ProductListingPage'
import ProductCardPage from './modules/product/presentation/pages/ProductCardPage/ProductCardPage'
import { ProductProvider } from './modules/product/application/context/ProductContext'
import { ROUTES } from './routes'

function App() {
  return (
    <ProductProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PRODUCTS} element={<ProductListingPage />} />
            <Route path={ROUTES.PRODUCT_DETAILS(':id')} element={<ProductCardPage />} />
          </Routes>
        </Layout>
      </Router>
    </ProductProvider>
  )
}

export default App

