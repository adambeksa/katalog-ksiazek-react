import { createContext, useContext, ReactNode } from 'react'
import { Product } from '../../domain/Product'
import { useProductsQuery } from '../hooks/useProductsQuery'

interface ProductContextType {
  products: Product[]
  loading: boolean
  error: any
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const { data: products = [], isLoading: loading, error } = useProductsQuery()

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}
