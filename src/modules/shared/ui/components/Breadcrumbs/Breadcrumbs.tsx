import { Link } from 'react-router-dom'
import './Breadcrumbs.scss'

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
      <ul className="breadcrumbs__list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs__item">
            {item.path ? (
              <Link to={item.path} className="breadcrumbs__link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="breadcrumbs__separator" aria-hidden="true">&rsaquo;</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
