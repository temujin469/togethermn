const config = {
  translations: {
    en: {
      "app.utils.delete": "Устгах",
      "global.back": "Буцах",
      "app.components.LeftMenu.navbrand.title": "Together.mn",
    },
    mn: {
      "app.utils.delete": "Устгах",
      "global.back": "Буцах",
      "app.components.LeftMenu.navbrand.title": "Together.mn",
    },
  },
  locales: ["en"],
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
