import { AudioFormat } from '../../domain/Product';
import { ApiMediaDto, ProductDto } from '../api/interfaces/ProductDto';

interface AudioData {
  features: string[];
  audioFormats: Record<string, AudioFormat[]>;
  audioDirector: string;
  audioArtist: string;
}

export const extractAudioData = (media: ApiMediaDto[]): AudioData => {
  const features: string[] = []
  const audioFormats: Record<string, AudioFormat[]> = {}
  let audioDirector = ''
  let audioArtist = ''

  if (media && media.length > 0) {
    media.forEach((m: ApiMediaDto) => {
      const type = m.type
      if (!audioFormats[type]) {
        audioFormats[type] = []
      }
      audioFormats[type].push({
        name: m.name || type || 'Audio',
        url: m.url
      })
    })
    
    if (Object.keys(audioFormats).length > 0) {
      features.push('audiobook')
    }
    
    const mediaWithMetadata = media.find(m => m.director || m.artist) || media[0]
    
    if (mediaWithMetadata) {
      audioDirector = mediaWithMetadata.director || ''
      audioArtist = mediaWithMetadata.artist || ''
    }
  }

  return {
    features,
    audioFormats,
    audioDirector,
    audioArtist
  }
}

export const extractFormats = (data: ProductDto): Record<string, string> => {
  const formats: Record<string, string> = {}

  if (data.pdf) formats['pdf'] = data.pdf
  if (data.epub) formats['epub'] = data.epub
  if (data.mobi) formats['mobi'] = data.mobi
  if (data.txt) formats['txt'] = data.txt
  if (data.fb2) formats['fb2'] = data.fb2
  if (data.xml) formats['xml'] = data.xml
  if (data.html) formats['html'] = data.html
  
  return formats
}
