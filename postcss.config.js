module.exports = {
  plugins: [
    require("tailwindcss")({
      autoprefixer: true,
      future: {
        purgeLayersByDefault: true,
      },
      purge: ["./src/**/*.ts", "./src/**/*.vue"],
    }),
  ],
};
