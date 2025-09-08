/**
 * homepage controller
 */

import { factories } from '@strapi/strapi'

const { createCoreController } = factories;

module.exports = createCoreController('api::homepage.homepage', ({ strapi }) => ({
  async find(ctx) {
    // Fetch homepage with banners + seo
    const entity = await strapi.entityService.findMany('api::homepage.homepage', {
      populate: {
        banners: {
          populate: ['image'],
        },
        seo_tags: {
          populate: ['meta_image', 'og_image'],
        },
        testimonials: true,
      },
    });

    // Extract homepage (usually single type, so entity[0])
    const homepage = Array.isArray(entity) ? entity[0] : entity;

    // --- Auto-fill OG fields ---
    const seo = homepage.seo_tags || {};
    const cleanedSeo = {
      meta_title: seo.meta_title,
      meta_description: seo.meta_description,
      meta_keyword: seo.meta_keyword,
      meta_image: seo.meta_image?.url || null,

      og_title: seo.og_title || seo.meta_title,
      og_description: seo.og_description || seo.meta_description,
      og_image: seo.og_image?.url || seo.meta_image?.url || null,

      twitter_title: seo.twitter_title || seo.meta_title,
      twitter_description: seo.twitter_description || seo.meta_description,

      canonical: seo.canonical,
      robots: seo.robots,
    };

    const banners = (homepage.banners || []).map(banner => ({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image?.url || null,
    }));

    const testimonials = (homepage.testimonials || []).map(testimonial => ({
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
