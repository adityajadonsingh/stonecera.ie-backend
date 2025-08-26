export default {
  routes: [
    {
      method: 'GET',
      path: '/products',
      handler: 'product.find',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/product/:slug',
      handler: 'product.findBySlug',
      config: { auth: false },
    },
  ],
};
