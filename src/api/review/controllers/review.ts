import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::review.review", ({ strapi }) => ({
  // GET /reviews/:productId
  async findByProduct(ctx) {
    const { productId } = ctx.params;

    if (!productId) {
      return ctx.badRequest("Product ID is required");
    }

    const reviews = await strapi.entityService.findMany("api::review.review", {
      filters: {
        product: { id: productId },
        review_status: "approved",
      },
      populate: ["product"],
      sort: { createdAt: "desc" },
    });

    return reviews;
  },

  // POST /reviews
  async createReview(ctx) {
    const { name, email, comment, rating, product } = ctx.request.body;

    if (!name || !email || !comment || !rating || !product) {
      return ctx.badRequest("All fields are required");
    }

    const newReview = await strapi.entityService.create("api::review.review", {
      data: {
        name,
        email,
        comment,
        rating,
        review_status: "pending", // default
        product, // relation (product id)
        publishedAt: new Date(), // required if Draft & Publish enabled
      },
    });

    return newReview;
  },
}));
