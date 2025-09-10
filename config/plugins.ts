export default ({ env }) => ({
  upload: {
    config: {
      provider: "local",
      breakpoints: env.bool("UPLOAD_BREAKPOINTS", true),
      sizeOptimization: env.bool("UPLOAD_OPTIMIZE", true),
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
    },
  },
  "sharp": env.bool("UPLOAD_BREAKPOINTS", true)
    ? {}
    : { resize: false, convertFormat: false },
});
