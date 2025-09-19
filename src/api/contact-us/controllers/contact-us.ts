/**
 * about-us controller
 */

import { factories } from "@strapi/strapi";
import { getFullUrl } from "../../../utils/getFullUrl";

export default factories.createCoreController("api::contact-us.contact-us", ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.entityService.findMany("api::contact-us.contact-us", {
      populate: {
        seo: {
          populate: {
            meta_image: true,
            og_image: true,
          },
        },
      },
    });

    if (!entity) {
      return ctx.notFound();
    }

    const aboutUs = Array.isArray(entity) ? entity[0] : entity;


    // Build cleaned SEO object
    const seo = aboutUs.seo || {};
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

    return {
      seo: cleanedSeo,
    };
  },
}));
