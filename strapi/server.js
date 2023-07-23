const strapi = require("@strapi/strapi");

strapi()
  .start()
  .then(() => console.log("server running..."));
