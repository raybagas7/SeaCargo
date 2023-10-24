import { randomizePrize } from "@/utils/randomizePrize";
import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import Button from "../Button/Button";
import { useRouter } from "next/router";

function GamesLayout() {
  const [randPrize, setRandPrize] = useState<number[]>([]);
  const [chance, setChance] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const randomNumbers = randomizePrize();
    setRandPrize(randomNumbers);
  }, []);

  const onSelectBox = () => {
    if (chance > 0) {
      setChance(chance - 1);
    }
  };

  return (
    <div>
      {/*3.12*/}
      <div className="grid h-[13rem] w-[20rem] grid-cols-3 gap-[1rem] tablet:h-[15rem] tablet:w-[34.375rem] tablet:gap-[3.12rem]">
        {randPrize.map((prize, index) => (
          <Card
            chance={chance}
            onSelectBox={onSelectBox}
            key={prize}
            prize={prize}
            index={index}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        {chance === 0 && (
          <Button
            onClick={() => {
              router.reload();
            }}
            type="button"
            name="confirm-prize"
            normal
            primary
          >
            Confirm Prize
          </Button>
        )}
      </div>
    </div>
  );
}

export default GamesLayout;
