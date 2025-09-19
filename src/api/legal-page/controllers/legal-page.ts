/**
 * legal-page controller
 */

import { factories } from "@strapi/strapi";
import { getFullUrl } from "../../../utils/getFullUrl";

export default factories.createCoreController(
  "api::legal-page.legal-page",
  ({ strapi }) => ({
    async find(ctx) {
      const entities = await strapi.entityService.findMany(
        "api::legal-page.legal-page",
        {
          populate: {
            seo: {
              populate: {
                og_image: true,
                meta_image: true,
              },
            },
          },
        }
      );

      return entities.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        page_type: item.page_type,
        content: item.content,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        seo: item.seo
          ? {
              ...item.seo,
              og_image: item.seo.og_image
                ? getFullUrl(item.seo.og_image.url)
                : null,
              meta_image: item.seo.meta_image
                ? getFullUrl(item.seo.meta_image.url)
                : null,
              twitter_image: item.seo.twitter_image
                ? getFullUrl(item.seo.twitter_image.url)
                : null,
            }
          : null,
      }));
    },
  })
);
