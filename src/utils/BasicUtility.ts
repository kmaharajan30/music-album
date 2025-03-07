export const formatDuration = (
  seconds: number,
  showMinsSeconds: boolean = false
): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (showMinsSeconds) {
    return `${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    } ${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}`;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const bytesToMB = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${Math.ceil(mb)} MB`;
};

export const formatDate = (
  dateString: string,
  showTime: boolean = true
): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(showTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  });
};

export const formatNames = (items: string[]): string => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return items.join(" & ");

  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
};
