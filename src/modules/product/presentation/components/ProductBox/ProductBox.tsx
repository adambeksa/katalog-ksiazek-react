import { Link } from "react-router-dom";
import "./ProductBox.scss";
import { Product } from "../../../domain/Product";
import { ROUTES } from "../../../../../routes";
import { memo } from "react";

interface ProductBoxProps {
  product: Product;
}

/**
 * Komponent prezentacyjny boxu produktu w liście
 * Używany w liście produktów
 */
function ProductBox({ product }: ProductBoxProps) {
  if (!product) {
    return null;
  }

  return (
    <div className="product-box">
      <img
        className="product-box__image"
        src={product.image}
        alt={product.name}
      />
      <div className="product-box__info">
        <h3 className="product-box__title">{product.name}</h3>
        <div className="product-box__meta">
          <span className="product-box__author">{product.author}</span>
          <span className="product-box__epoch">{product.epoch}</span>
          <span className="product-box__kind">{product.kind}</span>
          {product.features.includes("audiobook") && (
            <span className="product-box__audio" title="Audiobook">
              Audiobook
            </span>
          )}
        </div>
        <Link
          to={ROUTES.PRODUCT_DETAILS(product.id)}
          className="product-box__link"
        >
          Zobacz szczegóły
        </Link>
      </div>
    </div>
  );
}

export default memo(ProductBox);
