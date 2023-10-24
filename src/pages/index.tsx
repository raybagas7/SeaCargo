import BannerContainer from "@/components/BannerContainer/BannerContainer";
import React from "react";

export default function Home() {
  const imageUrl = [
    "https://res.cloudinary.com/dro3sbdac/image/upload/v1695896921/ufnwcakd3gtyezdc6dws.png",
    "https://res.cloudinary.com/dro3sbdac/image/upload/v1696092835/y3dnti56wrdus9jrw00i.png",
    "https://res.cloudinary.com/dro3sbdac/image/upload/v1696099350/cp22tryimheyl37nrshe.png",
  ];
  return (
    <main>
      <BannerContainer imageUrl={imageUrl} />
    </main>
  );
}
