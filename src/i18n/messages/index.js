import thCommon from "./th/common";
import enCommon from "./en/common";
import thHome from "./th/home";
import enHome from "./en/home";
import thAbout from "./th/about";
import enAbout from "./en/about";
import thContact from "./th/contact";
import enContact from "./en/contact";
import thCustomers from "./th/customers";
import enCustomers from "./en/customers";
import thNews from "./th/news";
import enNews from "./en/news";
import thComingsoon from "./th/comingsoon";
import enComingsoon from "./en/comingsoon";
import thServicePlaceholder from "./th/servicePlaceholder";
import enServicePlaceholder from "./en/servicePlaceholder";
import thFooter from "./th/footer";
import enFooter from "./en/footer";
import thServices from "./th/services";
import enServices from "./en/services";

const bundles = {
  th: {
    common: thCommon,
    home: thHome,
    about: thAbout,
    contact: thContact,
    customers: thCustomers,
    news: thNews,
    comingsoon: thComingsoon,
    servicePlaceholder: thServicePlaceholder,
    footer: thFooter,
    services: thServices,
  },
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    contact: enContact,
    customers: enCustomers,
    news: enNews,
    comingsoon: enComingsoon,
    servicePlaceholder: enServicePlaceholder,
    footer: enFooter,
    services: enServices,
  },
};

export function getMessages(locale) {
  return bundles[locale === "en" ? "en" : "th"];
}

export function getNamespace(locale, namespace) {
  return getMessages(locale)[namespace] ?? {};
}

export function getNewsArticles(locale) {
  return getNamespace(locale, "news").articles ?? [];
}

export function getNewsArticle(locale, slug) {
  return getNewsArticles(locale).find((article) => article.slug === slug);
}

export function getServiceContent(locale, serviceKey) {
  return getNamespace(locale, "services")[serviceKey] ?? {};
}
