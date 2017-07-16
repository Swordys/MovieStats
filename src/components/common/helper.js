export const convTime = mins => {
  if (mins <= 60) {
    return `${mins}m`;
  }
  if (mins % 60 === 0) {
    return `${mins / 60}h`;
  }
  let h = 0;
  let m = mins;
  while (m - 60 > 0) {
    h++;
    m -= 60;
  }
  return `${h}h ${m}m`;
};

export const formatToUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

