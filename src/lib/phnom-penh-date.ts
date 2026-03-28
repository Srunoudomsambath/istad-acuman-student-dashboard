export const PHNOM_PENH_TIME_ZONE = "Asia/Phnom_Penh";

type TimeZoneDateParts = {
  year: number;
  month: number;
  day: number;
};

function getTimeZoneDateParts(date: Date, timeZone = PHNOM_PENH_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  } satisfies TimeZoneDateParts;
}

export function getPhnomPenhDate(date = new Date()) {
  const { year, month, day } = getTimeZoneDateParts(date);
  return new Date(year, month - 1, day);
}

export function getPhnomPenhDateKey(date = new Date()) {
  const { year, month, day } = getTimeZoneDateParts(date);

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parsePhnomPenhDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatPhnomPenhDate(
  date: Date,
  options: Intl.DateTimeFormatOptions,
  locale = "en-GB"
) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: PHNOM_PENH_TIME_ZONE,
    ...options,
  }).format(date);
}
