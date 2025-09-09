/**
 * footer controller
 */

import { factories } from '@strapi/strapi';

const { createCoreController } = factories;

module.exports = createCoreController('api::footer.footer', ({ strapi }) => ({
  async find(ctx) {
    
    const entity = await strapi.entityService.findMany('api::footer.footer');

    const footer = Array.isArray(entity) ? entity[0] : entity;

    if (!footer) {
      return ctx.notFound();
    }

    return {
      phone_number1: footer.phone_number1,
      phone_number2: footer.phone_number2,
      email1: footer.email1,
      email2: footer.email2,
      address: footer.address,
      footer_content: footer.footer_content,
    };
  },
}));
