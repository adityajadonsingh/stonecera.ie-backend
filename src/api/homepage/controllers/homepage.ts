/**
 * homepage controller
 */

import { factories } from "@strapi/strapi";
import { getFullUrl } from "../../../utils/getFullUrl";

const { createCoreController } = factories;

export default createCoreController("api::homepage.homepage", ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.entityService.findMany("api::homepage.homepage", {
      populate: {
        banners: {
          populate: ["image"],
        },
        seo_tags: {
          populate: ["meta_image", "og_image"],
        },
        testimonials: true,
      },
    });

    const homepage = Array.isArray(entity) ? entity[0] : entity;

    const seo = homepage.seo_tags || {};
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

    const banners = (homepage.banners || []).map((banner: any) => ({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      image: getFullUrl(banner.image?.url),
    }));

    const testimonials = (homepage.testimonials || []).map((testimonial: any) => ({
      id: testimonial.id,
      name: testimonial.name,
      testimonial: testimonial.testimonial,
    }));

    return {
      banners,
      testimonials,
      seo: cleanedSeo,
    };
  },
}));
