export const FormatPrice = (value: any) => {
  return Number(value).toLocaleString('en-US');
};

export const FormatUrl = (value: any) => {
  return value.toLowerCase().replace(/ /g, '-');
};
