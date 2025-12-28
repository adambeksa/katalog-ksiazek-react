import { Link } from 'react-router-dom'
import './Breadcrumbs.css'

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ul className="breadcrumbs-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs-item">
            {item.path ? (
              <Link to={item.path} className="breadcrumbs-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumbs-current" aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="breadcrumbs-separator" aria-hidden="true">&rsaquo;</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
