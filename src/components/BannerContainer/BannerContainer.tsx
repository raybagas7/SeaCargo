import React, { useEffect, useState } from "react";

import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Banner from "./Banner";
interface IBannerContainer {
  imageUrl: string[];
}
function BannerContainer({ imageUrl }: IBannerContainer) {
  const [showBanner, setShowBanner] = useState<number>(0);
  const [translate, setTranslate] = useState<number>(0);

  useEffect(() => {
    setTranslate(showBanner * 100);
  }, [showBanner]);
  const nextBanner = () => {
    if (showBanner !== imageUrl.length - 1) {
      setShowBanner(showBanner + 1);
    }
  };
  const prevBanner = () => {
    if (showBanner > 0) {
      setShowBanner(showBanner - 1);
    }
  };

  return (
    <>
      <div className="relative mx-[10vw] mt-12 flex h-[100vh] w-[80vw] overflow-hidden">
        {imageUrl.map((banner) => (
          <Banner slide={showBanner} key={banner} imgUrl={banner} />
        ))}
        <div className="absolute bottom-[6rem] right-10 flex gap-3">
          <button
            onClick={prevBanner}
            className="border-primary group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-[1px] hover:shadow-md"
          >
            <BsFillArrowLeftCircleFill className="text-primary h-full w-full scale-75 transition group-hover:scale-100 group-hover:transition" />
          </button>
          <button
            onClick={nextBanner}
            className="border-primary group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-[1px] hover:shadow-md"
          >
            <BsFillArrowRightCircleFill className="text-primary h-full w-full scale-75 transition group-hover:scale-100 group-hover:transition" />
          </button>
        </div>
      </div>
    </>
  );
}

export default BannerContainer;
