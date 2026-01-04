export interface FridgeList {
  _id: string;
  title: string;
  expiry: Date;
  status: "Expired" | "Expiring Soon" | "Healthy";
}

function formatDateDMY(date: Date): string {
  if (isNaN(date.getTime())) return "Invalid date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


function parseExpiryDate(dateStr: string): Date {
  if (!dateStr) return new Date(NaN);


  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr);
  }

  
  const normalized = dateStr.replace(/-/g, "/");
  const parts = normalized.split("/").map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) {
    return new Date(NaN);
  }

  let year: number;
  let month: number;
  let day: number;

  
  if (parts[0] > 31) {
    year = parts[0];
    month = parts[1];
    day = parts[2];
  }
  
  else if (parts[2] > 31) {
    day = parts[0];
    month = parts[1];
    year = parts[2];
  }
  
  else {
    day = parts[0];
    month = parts[1];
    year = parts[2];
  }

  
  return new Date(year, month - 1, day);
}


function getExpiryStatus(expiry: Date): "Expired" | "Expiring Soon" | "Healthy" {
  const now = new Date();

  
  if (expiry < now) {
    return "Expired";
  }

  
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(now.getMonth() + 1);

  
  if (expiry <= oneMonthFromNow) {
    return "Expiring Soon";
  }

  
  return "Healthy";
}
export { parseExpiryDate, getExpiryStatus,formatDateDMY };