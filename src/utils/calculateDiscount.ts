export const calculateDiscount = (
  totalCost: number,
  discount: number,
  maxDisc: number,
) => {
  const dicount = (discount / 100) * totalCost;
  if (dicount > maxDisc) {
    return maxDisc;
  }
  return dicount;
};
