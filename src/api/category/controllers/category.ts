import { factories } from '@strapi/strapi';
import { getFullUrl } from "../../../utils/getFullUrl";

export default factories.createCoreController('api::category.category', ({ strapi }) => ({

  async find(ctx) {
    const entities = await strapi.entityService.findMany('api::category.category', {
      populate: ['image'],

    });

    return entities.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      image: item.image ? `${process.env.MEDIA_URL!}${item.image.url}` : null,
      image_alt_tag: item.image_alt_tag,
    }));
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.db.query('api::category.category').findOne({
      where: { slug },
      populate: {
        image: true,
        seo: {
          populate: ['og_image', 'meta_image', 'twitter_image'],
        },
        pageBanner: { populate: ["bannerImg"] },
        products: {
          populate: ["images"], // 👈 populate images for products
        },
      },
    });

    if (!entity) {
      return ctx.notFound();
    }

    const pageBanner = {
      pageName: entity.pageBanner?.pageName,
      alt_tag: entity.pageBanner?.alt_tag,
      bannerImg: getFullUrl(entity.pageBanner?.bannerImg?.url),
    };

    // Build products array
    const products = (entity.products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] ? getFullUrl(product.images[0].url) : null, // 👈 only first image
      image_alt_tag: product.images?.[0]?.alternativeText || null,
    }));

    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      image: entity.image ? `${process.env.MEDIA_URL!}${entity.image.url}` : null,
      image_alt_tag: entity.image_alt_tag,
      pageBanner,
      footer_content: entity.footer_content,
      seo: {
        ...entity.seo,
        og_image: entity.seo?.og_image ? `${process.env.MEDIA_URL!}${entity.seo.og_image.url}` : null,
        meta_image: entity.seo?.meta_image ? `${process.env.MEDIA_URL!}${entity.seo.meta_image.url}` : null,
        twitter_image: entity.seo?.twitter_image ? `${process.env.MEDIA_URL!}${entity.seo.twitter_image.url}` : null,
      },
      schema: entity.schema,
      updatedAt: entity.updatedAt,
      products,
    };
  }


}));
