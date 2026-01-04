import { createContext, useContext, ReactNode } from 'react'
import { Product } from '../../domain/Product'
import { useProductsCollectionQuery } from '../../hooks/useProductsCollectionQuery'

interface ProductContextType {
  productsCollection: Product[]
  loading: boolean
  error: any
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const { data: productsCollection = [], isLoading: loading, error } = useProductsCollectionQuery()

  return (
    <ProductContext.Provider value={{ productsCollection, loading, error }}>
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
