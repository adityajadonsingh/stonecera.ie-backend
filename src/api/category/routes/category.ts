export default {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'category.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/category/:slug',
      handler: 'category.findBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
