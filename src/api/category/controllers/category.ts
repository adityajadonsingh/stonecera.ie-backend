import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({

  async find(ctx) {
    const entities = await strapi.entityService.findMany('api::category.category', {
      populate: ['image'],
    });

    return entities.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      image: item.image ? item.image.url : null,
    }));
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.db.query('api::category.category').findOne({
      where: { slug },
      populate: {
        image: true,
        seo: {
          populate: ['og_image', 'meta_image', 'twitter_image'], // deep populate media fields inside seo
        },
      },
    });

    if (!entity) {
      return ctx.notFound();
    }

    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      image: entity.image ? entity.image.url : null,
      footer_content: entity.footer_content,
      seo: {
        ...entity.seo,
        og_image: entity.seo?.og_image ? entity.seo.og_image.url : null,
        meta_image: entity.seo?.meta_image ? entity.seo.meta_image.url : null,
        twitter_image: entity.seo?.twitter_image ? entity.seo.twitter_image.url : null,
      },
      schema : entity.schema,
      updatedAt : entity.updatedAt,
      
    };
  },

}));
