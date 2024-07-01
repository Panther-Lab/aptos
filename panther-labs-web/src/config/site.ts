export const siteConfig = {
  name: "panther-labs - invest with panther labs",
  description:
    "The platform for onchain finance.Transparent. Affordable. Limitless.",
  links: {
    github: "",
    twitter: "",
  },
  ogImage: "",
};

export const siteRoutes = {
  root: "/",
  onBoarding: "",
  earn: "/earn",
  borrow: "/borrow",
  underwriter: "/underwriter",
  tokenization: "/borrow/tokenization",
};

export const newDealRoutes = {
  root: `${siteRoutes.underwriter}/new-deal`,
  tranches: `${siteRoutes.underwriter}/new-deal/tranches`,
  review: `${siteRoutes.underwriter}/new-deal/review-deal`,
};
