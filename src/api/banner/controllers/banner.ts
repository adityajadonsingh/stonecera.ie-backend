const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::banner.banner', ({ strapi }) => ({
  async find(ctx) {
    const banners = await strapi.entityService.findMany('api::banner.banner', {
      populate: ['image'], // include only image
    });

    return banners.map(banner => ({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image?.url || null,
    }));
  },
}));
