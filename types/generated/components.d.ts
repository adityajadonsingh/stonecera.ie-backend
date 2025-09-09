import type { Schema, Struct } from '@strapi/strapi';

export interface PageBannerPageBanner extends Struct.ComponentSchema {
  collectionName: 'components_page_banner_page_banners';
  info: {
    displayName: 'Page Banner';
  };
  attributes: {
    alt_tag: Schema.Attribute.String;
    bannerImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    pageName: Schema.Attribute.String;
  };
}

export interface SeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_metas';
  info: {
    displayName: 'meta';
  };
  attributes: {
    canonical: Schema.Attribute.String;
    meta_description: Schema.Attribute.Text;
    meta_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    meta_keyword: Schema.Attribute.Text;
    meta_title: Schema.Attribute.String;
    og_description: Schema.Attribute.Text;
    og_image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    og_title: Schema.Attribute.String;
    robots: Schema.Attribute.String;
    twitter_description: Schema.Attribute.Text;
    twitter_title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page-banner.page-banner': PageBannerPageBanner;
      'seo.meta': SeoMeta;
    }
  }
}
