import './Skeleton.scss'

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  borderRadius?: string | number;
}

function Skeleton({ width, height, className = '', borderRadius }: SkeletonProps) {
  const style = {
    width,
    height,
    borderRadius
  }

  return (
    <div className={`skeleton ${className}`} style={style} />
  )
}

export default Skeleton
