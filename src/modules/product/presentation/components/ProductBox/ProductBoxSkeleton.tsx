import Skeleton from '../../../../shared/ui/components/Skeleton/Skeleton'
import './ProductBoxSkeleton.css'

function ProductBoxSkeleton() {
  return (
    <div className="product-box-skeleton">
      <Skeleton height="200px" width="100%" />
      <div className="product-info-skeleton">
        <Skeleton height="24px" width="70%" className="mb-2" />
        <Skeleton height="16px" width="100%" className="mb-1" />
        <Skeleton height="16px" width="90%" className="mb-1" />
        <Skeleton height="16px" width="40%" className="mb-3" />
        <Skeleton height="36px" width="100%" borderRadius="5px" className="mt-auto" />
      </div>
    </div>
  )
}

export default ProductBoxSkeleton
