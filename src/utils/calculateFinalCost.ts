import { calculateDiscount } from "./calculateDiscount";

export const calculateFinalCost = (
  totalCost: number,
  discount: number,
  maxDisc: number,
) => {
  const discountPrice = calculateDiscount(totalCost, discount, maxDisc);
  const listPrice = totalCost - discountPrice;
  return listPrice;
};
