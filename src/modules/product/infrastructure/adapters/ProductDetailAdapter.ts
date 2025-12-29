import { Product } from '../../domain/Product';
import { ProductDto } from '../api/interfaces/ProductDto';
import { extractAudioData, extractFormats } from '../utils/productAdapterUtils';

export const mapDetailToProduct = (data: ProductDto): Product => {
  const { features, audioFormats, audioDirector, audioArtist } = extractAudioData(data.media || [])
  const formats = extractFormats(data)

  const product = new Product({
    id: data.slug,
    name: data.title,
    image: data.cover || data.simple_thumb || '',
    description: data.fragment_data?.html || `${data.kinds?.[0]?.name}, ${data.epochs?.[0]?.name}, ${data.genres?.[0]?.name}`,
    author: data.authors?.[0]?.name || 'Nieznany autor',
    epoch: data.epochs?.[0]?.name || '',
    genre: data.genres?.[0]?.name || '',
    kind: data.kinds?.[0]?.name || '',
    url: data.url,
    features,
    license: 'Domena publiczna', //TODO: change to real license
    audioDirector,
    audioArtist,
    formats,
    audioFormats
  })

  return product
}
