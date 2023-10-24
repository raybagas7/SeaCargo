import { ICity } from "@/interface/rajaongkir";
import { FC, SelectHTMLAttributes } from "react";

export interface DataSelect {
  value: string | number;
  option: string;
}

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  boldLabel?: boolean;
  labelOnTop?: boolean;
  wFull?: boolean;
  data: any[] | ICity[];
}
const SelectCity: FC<ISelect> = ({
  name,
  label,
  boldLabel,
  labelOnTop,
  wFull,
  data,
  ...rest
}) => {
  return (
    <div className={labelOnTop ? "flex flex-col gap-2" : " space-x-5"}>
      {label && (
        <label
          className={`${
            boldLabel ? "font-bold" : "font-normal"
          } text-xs text-prim-light dark:text-prim-dark `}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <select
        className={`${
          wFull && "w-full"
        } bg-select-light cursor-pointer px-[1rem] py-[0.7rem] capitalize shadow outline-none disabled:bg-black/10`}
        value={data[0].city_id}
        {...rest}
      >
        {data.map((data) => (
          <option
            className="capitalize"
            key={data.city_id}
            value={data.city_id}
          >
            {data.city_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCity;
