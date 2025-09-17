/**
 * brochure controller
 */

import { factories } from "@strapi/strapi";
import { getFullUrl } from "../../../utils/getFullUrl";

const { createCoreController } = factories;

export default createCoreController("api::brochure.brochure", ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.entityService.findMany(
      "api::brochure.brochure",
      {
        populate: {
          brochures: {
            populate: ["pdf", "thumbnail_image"],
          },
          pageBanner: { populate: ["bannerImg"] },
          seo_tags: {
            populate: ["meta_image", "og_image"],
          },
        },
      }
    );

    // Handle single type or collection
    const brochurePage = Array.isArray(entity) ? entity[0] : entity;

    if (!brochurePage) {
      ctx.notFound("Brochure page not found");
    }

    // --- Brochures ---
    const brochures = (brochurePage.brochures || []).map((b: any) => ({
      id: b.id,
      brochure_name: b.brochure_name,
      pdf: b.pdf
        ? {
            id: b.pdf.id,
            name: b.pdf.name,
            url: getFullUrl(b.pdf.url),
          }
        : null,
      thumbnail_image: b.thumbnail_image
        ? {
            id: b.thumbnail_image.id,
            url: getFullUrl(b.thumbnail_image.url),
          }
        : null,
    }));

    // --- Page Banner ---
    const pageBanner = {
      pageName: brochurePage.pageBanner?.pageName,
      alt_tag: brochurePage.pageBanner?.alt_tag,
      bannerImg: getFullUrl(brochurePage.pageBanner?.bannerImg?.url),
    };

    // --- SEO ---
    const seo = brochurePage.seo_tags || {};
    const cleanedSeo = {
      meta_title: seo.meta_title,
      meta_description: seo.meta_description,
      meta_keyword: seo.meta_keyword,
      meta_image: getFullUrl(seo.meta_image?.url),

      og_title: seo.og_title || seo.meta_title,
      og_description: seo.og_description || seo.meta_description,
      og_image:
        getFullUrl(seo.og_image?.url) || getFullUrl(seo.meta_image?.url),

      twitter_title: seo.twitter_title || seo.meta_title,
      twitter_description: seo.twitter_description || seo.meta_description,

      canonical: seo.canonical,
      robots: seo.robots,
    };

    return {
      pageBanner,
      brochures,
      seo: cleanedSeo,
    };
  },
}));
