export const randomizePrize = () =>
  Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * (30001 - 10000 + 1) + 10000),
  );
