import { Product } from '../../domain/Product';
import { ProductListDto } from '../api/interfaces/ProductListDto';

export const mapListToProduct = (data: ProductListDto): Product => {
  const product = new Product({
    id: data.slug,
    name: data.title,
    image: data.simple_thumb || data.cover_thumb || '',
    description: `${data.author}, ${data.kind}`,
    author: data.author,
    epoch: data.epoch,
    genre: data.genre,
    kind: data.kind,
    url: data.url,
    features: data.has_audio ? ['audiobook'] : [],
  })
  
  return product;
}
