/**
 * Nagłówek kolumn indeksu książek (ukryty na telefonie)
 */
function ProductListingHead() {
  return (
    <div className="product-listing__head" aria-hidden="true">
      <span>Nr</span>
      <span />
      <span>Tytuł</span>
      <span>Autor</span>
      <span>Epoka</span>
      <span>Rodzaj</span>
      <span>Audio</span>
    </div>
  );
}

export default ProductListingHead;
