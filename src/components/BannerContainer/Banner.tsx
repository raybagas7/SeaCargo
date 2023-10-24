import { FaCartPlus } from "react-icons/fa";
import Button from "../Button/Button";
import { FaShip } from "react-icons/fa6";

interface IBanner {
  imgUrl: string;
  slide: number;
}

function Banner({ imgUrl, slide }: IBanner) {
  return (
    <div
      className={`
        ${slide === 0 && "-translate-x-slide-0"} 
        ${slide === 1 && "-translate-x-slide-1"}
        ${
          slide === 2 && "-translate-x-slide-2"
        } flex h-full min-w-[80vw] flex-1 items-center bg-prim-light/20 transition-transform duration-1000 dark:bg-prim-dark/20`}
    >
      <div className="relative flex h-[31.25rem] w-full justify-end bg-prim-light dark:bg-prim-dark">
        {/* <img
          src={imgUrl}
          alt="banner"
          className="absolute -bottom-[6rem] -left-[3rem] z-50 h-[28rem] w-[28rem] object-cover"
        ></img> */}
        <div className="flex h-full w-full flex-col justify-between px-[10rem] py-10 pr-10">
          <h2 className="w-[30rem] text-[3.75rem]">SHIPPING WITH SEA CARGO</h2>
          <p className="w-[35rem] text-[2rem]">CARGO, LOGISTICS, WHEREHOUSE</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
