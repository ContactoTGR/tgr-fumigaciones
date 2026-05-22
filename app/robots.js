export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://tgr-fumigaciones.vercel.app/sitemap.xml",
  };
}