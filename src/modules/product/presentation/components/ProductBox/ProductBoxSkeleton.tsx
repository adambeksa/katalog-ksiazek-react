import Skeleton from '../../../../shared/ui/components/Skeleton/Skeleton'
import './ProductBoxSkeleton.scss'

function ProductBoxSkeleton() {
  return (
    <div className="product-box-skeleton">
      <Skeleton height="200px" width="100%" />
      <div className="product-box-skeleton__info">
        <Skeleton height="24px" width="70%" className="product-box-skeleton__mb-2" />
        <Skeleton height="16px" width="100%" className="product-box-skeleton__mb-1" />
        <Skeleton height="16px" width="90%" className="product-box-skeleton__mb-1" />
        <Skeleton height="16px" width="40%" className="product-box-skeleton__mb-3" />
        <Skeleton height="36px" width="100%" borderRadius="5px" className="product-box-skeleton__mt-auto" />
      </div>
    </div>
  )
}

export default ProductBoxSkeleton
