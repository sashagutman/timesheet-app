// Считаем конец смены по startTime + hours
export function dayEndTime(startTime: string, hours: number) {
  const [startHours, startMinutes] = startTime.split(":").map(Number);

  const totalStartMinutes = startHours * 60 + startMinutes;
  const totalEndMinutes = totalStartMinutes + Math.round(hours * 60);

  const endHours = Math.floor((totalEndMinutes / 60) % 24);
  const endMinutes = totalEndMinutes % 60;

  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}
