export default {
  routes: [
    {
      method: 'POST',
      path: '/enquiry',
      handler: 'enquiry.create',
      config: {
        auth: false, // if you want it public
      },
    },
  ],
};
