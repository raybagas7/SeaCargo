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
        } flex h-full min-w-[80vw] flex-1 items-center transition-transform duration-1000`}
    >
      <div className="bg-secondary relative flex h-[31.25rem] w-full justify-end">
        <img
          src={imgUrl}
          alt="banner"
          className="absolute -bottom-[6rem] -left-[3rem] h-[28rem] w-[28rem] rounded-full object-cover"
        ></img>
        <div className="flex h-full w-2/3 flex-col justify-between py-10 pr-10">
          <h2 className="w-[30rem] text-[3.75rem]">WAY KAMBAS MINI EBONY</h2>
          <p className="w-[35rem]">
            MATOA Way Kambas - This wood is chosen to represent the Sumatran
            Rhino's skin which is designed with an overlap effect on its strap
            to represent Rhino's skin.
          </p>
          <button className="bg-primary group w-fit rounded-full px-5 py-2 shadow-md transition hover:bg-white/20 hover:shadow">
            <FaCartPlus className="group-hover:animate-default_quantum_bouncing_fast group-hover:text-primary h-5 w-5 text-white transition group-hover:transition" />
          </button>
          <div className="flex gap-5">
            <Button primary name="add-cart" children="Add To Chart" />
            <Button name="cicil" component={<FaShip />} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
