import React from "react";
//グローバルCSSはここにimportする
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
