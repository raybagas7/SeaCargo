import BannerContainer from "@/components/BannerContainer/BannerContainer";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import HomeLayout from "@/components/Layout/HomeLayout";
import Head from "next/head";

const Home: NextPageWithLayout = () => {
  const imageUrl = [
    "https://static.vecteezy.com/system/resources/previews/021/164/996/original/open-cardboard-box-transparent-background-png.png",
    "https://res.cloudinary.com/dro3sbdac/image/upload/v1696092835/y3dnti56wrdus9jrw00i.png",
    "https://res.cloudinary.com/dro3sbdac/image/upload/v1696099350/cp22tryimheyl37nrshe.png",
  ];
  return (
    <>
      <Head>
        <title>SeaCargo</title>
        <meta name="seacargo" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BannerContainer imageUrl={imageUrl} />
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
