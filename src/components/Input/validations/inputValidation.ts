export const noWhiteSpace = (value: string) =>
  !String(value).replace(/\s/g, "").length;

export const moreThanThree = (value: string) => String(value).length <= 3;

export const minValueInput = (value: number, minValue: number) =>
  value < minValue;

export const maxValueInput = (value: number, maxValue: number) =>
  value > maxValue;

export const startsWithSpace = (value: string) => value.startsWith(" ");
