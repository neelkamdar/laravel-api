import TanstackWrapper from "@/layout/TanstackWrapper";
import { dir } from "i18next";
import { ToastContainer } from "react-toastify";
import "../../public/assets/scss/app.scss";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";
import LanguageProvider from "@/helper/languageContext/LanguageProvider";
import request from "@/utils/axiosUtils";

export async function generateMetadata() {
  try {
    const response = await request({ url: "/settings" });

    const settingData = response?.data;

    return {
      metadataBase: new URL(process.env.URL),
      title: settingData?.values?.general?.site_title,
      description: settingData?.values?.general?.site_tagline,
      icons: {
        icon: settingData?.values?.general?.favicon_image?.original_url,
      },
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

export default async function RootLayout({ children }) {
  const lng = await detectLanguage();

  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body suppressHydrationWarning={true}>
        <I18nProvider language={lng}>
          <LanguageProvider initialLanguage={lng}>
            <TanstackWrapper>{children}</TanstackWrapper>
            <ToastContainer position="top-center" />
          </LanguageProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
