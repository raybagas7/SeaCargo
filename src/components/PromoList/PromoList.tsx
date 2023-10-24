import { useShipping } from "@/store/shipping/useShipping";
import { formatDate } from "@/utils/formatDate";
import { BiSolidDiscount } from "react-icons/bi";
import React, { useEffect } from "react";
import { currencyFormat } from "@/utils/currencyFormat";
import { IPromosData } from "@/interface/shippings";
import { useModal } from "@/store/modal/useModal";
import { getCookie } from "cookies-next";

function PromoList() {
  const selectedPromo = useShipping.use.selectedPromo();
  const promosData = useShipping.use.promosData();
  const { setSelectedPromo, getPromosData } = useShipping.getState();
  const { hideModal2 } = useModal.getState();
  const handleChangePromo = (promo: IPromosData) => {
    setSelectedPromo(promo);
    hideModal2();
  };

  useEffect(() => {
    const token = getCookie("accessToken");
    getPromosData(token as string);
  }, []);

  return (
    <div
      id="list-container"
      className="max-h-[90vh] w-[70vw] space-y-3 overflow-y-scroll p-5 text-prim-litext tablet:w-[40vw]"
    >
      {promosData?.map((promo) => (
        <div
          key={promo.id}
          onClick={() => handleChangePromo(promo)}
          className={`${
            promo.id === selectedPromo?.id && "bg-prim-light/10"
          } group relative cursor-pointer overflow-hidden rounded-lg border-[0.5px] border-sec-light p-3 hover:bg-prim-light/10`}
        >
          {selectedPromo?.id === promo?.id ? (
            <BiSolidDiscount className="absolute right-0 top-5 h-full w-auto text-prim-light/20" />
          ) : (
            <BiSolidDiscount className="absolute right-0 top-5 h-full w-auto translate-y-full text-prim-light/20 transition-transform duration-300 group-hover:translate-y-0 group-hover:transition-transform group-hover:duration-300" />
          )}
          <div className=" border-b-2 pb-2">
            <p className="font-bold">{promo.name}</p>
            <p className="text-xs text-sec-litext dark:text-sec-litext">
              Until: {formatDate(promo.expired)}
            </p>
          </div>
          <div className="mt-2 flex gap-1">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <BiSolidDiscount className="h-5 w-5" />
                <p>{promo.value}%</p>
              </div>
              <p>Max: Rp {currencyFormat.format(promo.max)}</p>
              <p>{promo.count} Remaining</p>
            </div>
            <div className="line-clamp-2 flex-1">
              <p>{promo.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PromoList;
