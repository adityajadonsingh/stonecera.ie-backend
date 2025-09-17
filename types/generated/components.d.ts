import type { Schema, Struct } from '@strapi/strapi';

export interface BrochurePdf extends Struct.ComponentSchema {
  collectionName: 'components_brochure_pdfs';
  info: {
    displayName: 'pdf';
  };
  attributes: {
    brochure_name: Schema.Attribute.String;
    pdf: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    thumbnail_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

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

export interface ProductDetailsProductAttributes
  extends Struct.ComponentSchema {
  collectionName: 'components_product_details_product_attributes';
  info: {
    displayName: 'Product Attributes';
  };
  attributes: {
    attribute_name: Schema.Attribute.String;
    attribute_value: Schema.Attribute.Text;
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
      'brochure.pdf': BrochurePdf;
      'page-banner.page-banner': PageBannerPageBanner;
      'product-details.product-attributes': ProductDetailsProductAttributes;
      'seo.meta': SeoMeta;
    }
  }
}
