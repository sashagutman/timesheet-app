import type { DayEntry, DayStatus, TimesheetSettings } from "../types/timesheet";

// Делаем 1 -> "01" для красивых дат/времени
function pad2(value: number) {
  return String(value).padStart(2, "0");
}

// Форматируем дату для UI: "01.02.2026"
function formatDateLabel(date: Date) {
  return `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}`;
}

// Прибавляем к стартовому времени часы и получаем toTime
function addHoursToTime(startTime: string, hoursToAdd: number) {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const totalStartMinutes = startHours * 60 + startMinutes;
  const totalEndMinutes = totalStartMinutes + Math.round(hoursToAdd * 60);

  const endHours = Math.floor((totalEndMinutes / 60) % 24);
  const endMinutes = totalEndMinutes % 60;

  return `${pad2(endHours)}:${pad2(endMinutes)}`;
}

// Генерируем массив дней для выбранного месяца
export function generateDaysForMonth(settings: TimesheetSettings): DayEntry[] {
  // 1) Разбираем "YYYY-MM"
  const [yearString, monthString] = settings.monthYYYYMM.split("-");
  const year = Number(yearString);
  const monthIndex = Number(monthString) - 1; // Date() ждёт 0..11

  // 2) Считаем сколько дней в месяце (трюк: 0-й день следующего месяца)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const days: DayEntry[] = [];

  // 3) Создаём DayEntry для каждого дня месяца
  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    const date = new Date(year, monthIndex, dayNumber);
    const jsWeekday = date.getDay(); // 0..6 (Sunday..Saturday)

    // 4) Определяем статус (work/weekend) по weekendDays
    const isWeekend = settings.weekendDays.includes(jsWeekday);
    const status: DayStatus = isWeekend ? "weekend" : "work";

    // 5) Заполняем время и часы (если выходной — 0 и пустые строки)
    const hours = status === "work" ? settings.hoursPerDay : 0;
    const fromTime = status === "work" ? settings.startTime : "";
    const toTime =
      status === "work" ? addHoursToTime(settings.startTime, settings.hoursPerDay) : "";

    // 6) ISO строка удобна как ключ и для диапазонов
    const dateISO = `${year}-${pad2(monthIndex + 1)}-${pad2(dayNumber)}`;

    // 7) Добавляем строку в итоговый список
    days.push({
      dateISO,
      dateLabel: formatDateLabel(date),
      dayIndex: jsWeekday,
      status,
      fromTime,
      toTime,
      hours,
    });
  }

  return days;
}
