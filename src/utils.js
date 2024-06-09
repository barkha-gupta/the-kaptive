export const columnData = [
  "Cashflow",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const convertValue = (value, currency) => {
  switch (currency) {
    case "EUR":
      return value * 0.85;
    case "GBP":
      return value * 0.75;
    case "USD":
    default:
      return value;
  }
};
