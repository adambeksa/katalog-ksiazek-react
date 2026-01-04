import Breadcrumbs from "../../../../shared/ui/components/Breadcrumbs/Breadcrumbs";
import ProductFilters from "../../components/ProductFilters/ProductFilters";
import ProductBoxSkeleton from "../../components/ProductBox/ProductBoxSkeleton";
import "./ProductListingPage.scss";
import { IProductFilters } from "../../../domain/interfaces/IProductFilters.interface";
import { IFilterOptions } from "../../../domain/interfaces/IFilterOptions.interface";

interface ProductListingSkeletonProps {
  filters: IProductFilters;
  filterOptions: IFilterOptions;
  onFilterChange: (key: keyof IProductFilters, value: string) => void;
}

function ProductListingSkeleton({
  filters,
  filterOptions,
  onFilterChange,
}: ProductListingSkeletonProps) {
  return (
    <div className="product-listing">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Strona Główna", path: "/" },
            { label: "Katalog książek" },
          ]}
        />

        <ProductFilters
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
        />

        <div className="product-listing__grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductBoxSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListingSkeleton;
