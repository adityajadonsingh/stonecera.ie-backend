/**
 * product-category controller
 */

import { factories } from "@strapi/strapi";
import { getFullUrl } from "../../../utils/getFullUrl";

const { createCoreController } = factories;

export default createCoreController("api::product-category.product-category", ({ strapi }) => ({
  async find(ctx) {
    // Get product category page data
    const entity = await strapi.entityService.findMany("api::product-category.product-category", {
      populate: {
        pageBanner: { populate: ["bannerImg"] },
        footerImg: true,
        seo: {
          populate: ["meta_image", "og_image"],
        },
      },
    });

    const categoryPage = Array.isArray(entity) ? entity[0] : entity;

    // SEO
    const seo = categoryPage.seo || {};
    const cleanedSeo = {
      meta_title: seo.meta_title,
      meta_description: seo.meta_description,
      meta_keyword: seo.meta_keyword,
      meta_image: getFullUrl(seo.meta_image?.url),

      og_title: seo.og_title || seo.meta_title,
      og_description: seo.og_description || seo.meta_description,
      og_image: getFullUrl(seo.og_image?.url) || getFullUrl(seo.meta_image?.url),

      twitter_title: seo.twitter_title || seo.meta_title,
      twitter_description: seo.twitter_description || seo.meta_description,

      canonical: seo.canonical,
      robots: seo.robots,
    };

    // Page Banner
    const pageBanner = {
      pageName: categoryPage.pageBanner?.pageName,
      alt_tag: categoryPage.pageBanner?.alt_tag,
      bannerImg: getFullUrl(categoryPage.pageBanner?.bannerImg?.url),
    };

    // Footer
    const footer = {
      footerHeading: categoryPage.footerHeading,
      footerContent: categoryPage.footerContent,
      footerImg: getFullUrl(categoryPage.footerImg?.url),
      footerImgAlt: categoryPage.footerImgAlt,
    };

    // Final response
    return {
      pageBanner,
      footer,
      seo: cleanedSeo,
    };
  },
}));
