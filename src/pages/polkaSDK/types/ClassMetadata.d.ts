import { StringMap } from 'i18next';

export interface ClassMetadata {
  logoUrl: string;
  banner: string;
  featuredUrl: string;
  name: string;
  stub?: string;
  description?: string;
  links:{
    website?: string,
    discord?: string,
    twitter?: StringMap,
    ins?: string,
    medium?: string,
    telegram?: string,
},
}
