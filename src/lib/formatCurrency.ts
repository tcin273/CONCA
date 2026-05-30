export const formatVND = (value: number) => {
  const vndValue = Math.round(value * 1000);
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(vndValue);
};
