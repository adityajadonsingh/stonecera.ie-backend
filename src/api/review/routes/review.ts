export default {
  routes: [
    {
      method: "GET",
      path: "/reviews/:productId",
      handler: "review.findByProduct",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/reviews",
      handler: "review.createReview",
      config: {
        auth: false,
      },
    },
  ],
};
