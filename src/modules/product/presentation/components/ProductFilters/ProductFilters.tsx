import FilterSelect from './FilterSelect'
import './ProductFilters.css'

import { ProductFilters as IProductFilters, FilterOptions } from '../../../application/ProductFilterFacade'

interface ProductFiltersProps {
  filters: IProductFilters;
  filterOptions: FilterOptions;
  onFilterChange: (key: keyof IProductFilters, value: string) => void;
}

function ProductFilters({ filters, filterOptions, onFilterChange }: ProductFiltersProps) {
  return (
    <div className="filters">
      <FilterSelect
        label="Autor:"
        value={filters.author || ''}
        options={filterOptions.authors}
        onChange={(val) => onFilterChange('author', val)}
      />

      <FilterSelect
        label="Epoka:"
        value={filters.epoch || ''}
        options={filterOptions.epochs}
        onChange={(val) => onFilterChange('epoch', val)}
      />

      <FilterSelect
        label="Gatunek:"
        value={filters.genre || ''}
        options={filterOptions.genres}
        onChange={(val) => onFilterChange('genre', val)}
      />

      <FilterSelect
        label="Rodzaj:"
        value={filters.kind || ''}
        options={filterOptions.kinds}
        onChange={(val) => onFilterChange('kind', val)}
      />
    </div>
  )
}

export default ProductFilters
