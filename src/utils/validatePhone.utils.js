export function getValidPhone(phone) {
  if (!phone) return null;
  let cleaned = phone.replace(/[^\d]/g, "");
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
