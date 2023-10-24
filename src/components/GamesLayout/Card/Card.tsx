import { useState } from "react";
import style from "./Card.module.scss";
import { currencyFormat } from "@/utils/currencyFormat";
import { useUser } from "@/store/user/useUser";
import { getCookie } from "cookies-next";

interface ICard {
  prize: number;
  index: number;
  chance: number;
  onSelectBox: () => void;
}

function Card({ prize, index, chance, onSelectBox }: ICard) {
  const { updateWalletBalance } = useUser.getState();
  const [showPrize, setShowPrize] = useState<boolean>(false);

  const onShowPrize = async () => {
    const token = getCookie("accessToken");

    if (chance > 0 && !showPrize) {
      setShowPrize(true);
      onSelectBox();
      updateWalletBalance(token as string, prize as number);
    }
  };

  return (
    <button
      disabled={chance === 0}
      type="button"
      onClick={onShowPrize}
      className={`${style.flipCard} disabled:cursor-default`}
    >
      <div
        className={`${showPrize && style.rotateCard} ${style.flipCardInner}`}
      >
        <div className={`${style.flipCardFront}`}>
          <div
            className={`${
              chance === 0
                ? "bg-gray-500 transition "
                : "bg-prim-light transition"
            } border-secondary/50 flex h-full w-full items-center justify-center rounded-lg border-[1px] text-[5rem] font-bold text-white shadow-lg transition duration-500 hover:shadow-md hover:transition`}
          >
            {index + 1}
          </div>
        </div>
        <div className={`${style.flipCardBack}`}>
          <div className="border-secondary/50 flex h-full w-full items-center justify-center rounded-lg border-[1px] bg-white shadow-lg transition hover:shadow-md hover:transition">
            Rp {currencyFormat.format(prize)}
          </div>
        </div>
      </div>
    </button>
  );
}

export default Card;
