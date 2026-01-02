export interface FridgeList {
  _id: string;
  title: string;
  expiry: Date;
  status: "Expired" | "Expiring Soon" | "Healthy";
}


function parseExpiryDate(dateStr: string): Date {
  if (!dateStr) return new Date(NaN);

  // Normalize separator
  const normalized = dateStr.replace(/-/g, "/");
  const parts = normalized.split("/").map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) {
    return new Date(NaN);
  }

  let year: number;
  let month: number;
  let day: number;

  // YYYY/MM/DD
  if (parts[0] > 31) {
    year = parts[0];
    month = parts[1];
    day = parts[2];
  }
  // DD/MM/YYYY
  else if (parts[2] > 31) {
    day = parts[0];
    month = parts[1];
    year = parts[2];
  }
  // Ambiguous (12/8/2024 vs 8/12/2024)
  else {
    // Default to DD/MM/YYYY (common outside US)
    day = parts[0];
    month = parts[1];
    year = parts[2];
  }

  return new Date(year, month - 1, day);
}



function getExpiryStatus(expiry: Date): "Expired" | "Expiring Soon" | "Healthy" {
  const now = new Date();

  // Expired
  if (expiry < now) {
    return "Expired";
  }

  // One month from now
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(now.getMonth() + 1);

  // Expiring soon
  if (expiry <= oneMonthFromNow) {
    return "Expiring Soon";
  }

  // Healthy
  return "Healthy";
}
export { parseExpiryDate, getExpiryStatus };