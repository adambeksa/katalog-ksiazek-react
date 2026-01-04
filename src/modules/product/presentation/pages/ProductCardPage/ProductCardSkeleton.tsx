import { ROUTES } from '../../../../../routes'
import Breadcrumbs from '../../../../shared/ui/components/Breadcrumbs/Breadcrumbs'
import Skeleton from '../../../../shared/ui/components/Skeleton/Skeleton'
import './ProductCardPage.css'

function ProductCardSkeleton() {
  return (
    <div className="product-card-page">
      <div className="container">
        <Breadcrumbs items={[
          { label: 'Strona Główna', path: ROUTES.HOME },
          { label: 'Katalog książek', path: ROUTES.PRODUCTS },
          { label: 'Ładowanie...' }
        ]} />
        
        <div className="product-details">
          <div className="product-image-section">
            <Skeleton height="400px" width="100%" borderRadius="8px" />
          </div>

          <div className="product-info-section">
            <Skeleton height="24px" width="150px" className="mb-2" />
            <Skeleton height="48px" width="300px" className="mb-4" />

            <div className="product-description-section">
              <Skeleton height="28px" width="120px" className="mb-2" />
              <Skeleton height="16px" width="100%" className="mb-1" />
              <Skeleton height="16px" width="100%" className="mb-1" />
              <Skeleton height="16px" width="90%" className="mb-1" />
              <Skeleton height="16px" width="95%" className="mb-1" />
              <Skeleton height="16px" width="60%" className="mb-1" />
            </div>

            <div className="mt-4">
              <Skeleton height="100px" width="100%" borderRadius="8px" />
            </div>

            <div className="product-actions mt-4">
              <Skeleton height="48px" width="180px" borderRadius="24px" className="mr-2" />
              <Skeleton height="48px" width="200px" borderRadius="24px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
