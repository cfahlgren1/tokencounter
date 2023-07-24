import { NextSeo } from "next-seo";
import Navbar from "./Navbar";
const Layout = ({ children, title, description, url, imageUrl }) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: url,
          title: title,
          description: description,
          images: [
            {
              url: imageUrl,
              width: 800,
              height: 600,
              alt: "TokenCounterLogo",
              type: "image/png",
            },
          ],
          siteName: "TokenCounter",
        }}
        twitter={{
          handle: "@thecalebf",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
