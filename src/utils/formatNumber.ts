export function formatNumber(num: number | string): string {
  const value = Number(num); // Ensure the input is a number
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M"; // Converts to millions
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + "K"; // Converts to thousands
  } else {
    return value.toFixed(2); // If it's less than 1000, return the number with 2 decimals
  }
}
