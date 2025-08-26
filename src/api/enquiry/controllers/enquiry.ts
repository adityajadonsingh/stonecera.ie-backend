import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::enquiry.enquiry', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { name, email, phone_number, message, product_name } = ctx.request.body;

      if (!name || !email || !phone_number || !message) {
        return ctx.badRequest("Missing required fields");
      }

      const form_type = product_name ? "product_enquiry" : "common";

      const entry = await strapi.entityService.create('api::enquiry.enquiry', {
        data: {
          name,
          email,
          phone_number,
          message,
          product_name: product_name || null,
          form_type,
        },
      });

      return { success: true, data: entry };
    } catch (err) {
      strapi.log.error("Contact form error:", err);
      return ctx.internalServerError("Something went wrong");
    }
  },
}));
