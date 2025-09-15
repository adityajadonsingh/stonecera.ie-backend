import { factories } from '@strapi/strapi';
import { getFullUrl } from "../../../utils/getFullUrl";
export default factories.createCoreController('api::product.product', ({ strapi }) => ({

  // GET /api/products
  async find(ctx) {
    const { category } = ctx.query;

    const filters: any = {};
    if (category) {
      filters.category = { name: category };
    }

    const entities = await strapi.entityService.findMany('api::product.product', {
      filters,
      populate: {
        category: true,
        images: true,
      },
    });

    return entities.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      category: item.category
        ? {
          name: item.category.name,
          slug: item.category.slug,
        }
        : null,
      image: item.images?.length > 0 ? item.images[0].url : null,
    }));
  },

  // GET /api/product/:slug
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.db.query('api::product.product').findOne({
      where: { slug },
      populate: {
        category: true,
        images: true,
        seo: {
          populate: ['og_image', 'meta_image', 'twitter_image'],
        },
        attributes: true,
      },
    });

    if (!entity) {
      return ctx.notFound();
    }

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      slug: entity.slug,
      updatedAt: entity.updatedAt,
      category: entity.category
        ? {
          name: entity.category.name,
          slug: entity.category.slug,
        }
        : null,
      images: entity.images?.map((img: any) => ({
        url: getFullUrl(img.url),
        alt: img.alternativeText || null,
        width: img.width,
        height: img.height,
      })) || [],
      attributes: entity.attributes,
      seo: entity.seo
        ? {
          og_image: entity.seo?.og_image ? getFullUrl(entity.seo.og_image.url) : null,
          meta_image: entity.seo?.meta_image ? getFullUrl(entity.seo.meta_image.url) : null,
          twitter_image: entity.seo?.twitter_image ? getFullUrl(entity.seo.twitter_image.url) : null,
        }
        : null,
    };
  }


}));
