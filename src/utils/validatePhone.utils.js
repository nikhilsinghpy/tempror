
export function getValidPhone(phone) {
  if (!phone) return null;
  // Remove all non-digit characters (spaces, dashes, etc.)
  let cleaned = phone.replace(/[^\d]/g, "");
  // Remove prefixes +91, 91, or 0
  if (cleaned.startsWith("91") && cleaned.length > 10) {
    cleaned = cleaned.slice(cleaned.length - 10);
  } else if (cleaned.startsWith("0") && cleaned.length > 10) {
    cleaned = cleaned.slice(cleaned.length - 10);
  }
  const regex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  if (regex.test(cleaned)) {
    return cleaned;
  }
  return null;
}
