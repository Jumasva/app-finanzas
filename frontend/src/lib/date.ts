// Fechas de la app. El contrato las envía como texto YYYY-MM-DD y «hoy» es la fecha de America/Bogota,
// nunca la del navegador ni la UTC (RN-GEN-001). Las cuentas se hacen en UTC para que no se corra un día

const TIME_ZONE = 'America/Bogota';

// Partes de una fecha YYYY-MM-DD sin pasar por Date
export function parseIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
}

export function toIsoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Date en UTC de un día (month de 1 a 12; un day fuera del mes pasa al mes vecino)
function utcDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day));
}

// La fecha de hoy en Bogotá: '2026-11-16'
export function todayIso() {
  // en-CA da el formato YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date());
}

// Días que tiene un mes
export function daysInMonth(year: number, month: number) {
  return utcDate(year, month + 1, 0).getUTCDate();
}

// Día de la semana del primer día del mes, con la semana empezando en lunes: lunes 0 … domingo 6
export function firstWeekday(year: number, month: number) {
  return (utcDate(year, month, 1).getUTCDay() + 6) % 7;
}

// ('2026-10-31', 1) → '2026-11-01'
export function addDays(value: string, days: number) {
  const { year, month, day } = parseIsoDate(value);
  const date = utcDate(year, month, day + days);
  return toIsoDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

// (2026, 12, 1) → { year: 2027, month: 1 }
export function addMonths(year: number, month: number, months: number) {
  const index = year * 12 + (month - 1) + months;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

// El mismo día en otro mes; si ese mes es más corto, su último día: ('2026-01-31', 1) → '2026-02-28'
export function sameDayInMonth(value: string, months: number) {
  const { year, month, day } = parseIsoDate(value);
  const next = addMonths(year, month, months);
  return toIsoDate(next.year, next.month, Math.min(day, daysInMonth(next.year, next.month)));
}

/* ── Textos ── */

const dayFormat = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
const monthFormat = new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('es-CO', { dateStyle: 'full', timeZone: 'UTC' });

// '2026-10-23' → '23 oct 2026' (sin el punto ni el «de» que agrega es-CO)
export function formatDate(value: string) {
  const { year, month, day } = parseIsoDate(value);
  return dayFormat
    .format(utcDate(year, month, day))
    .replaceAll('.', '')
    .replaceAll(' de ', ' ');
}

// '2026-10-23' → 'viernes, 23 de octubre de 2026' (para el lector de pantalla)
export function formatLongDate(value: string) {
  const { year, month, day } = parseIsoDate(value);
  return longFormat.format(utcDate(year, month, day));
}

// (2026, 10) → 'Octubre 2026'
export function formatMonth(year: number, month: number) {
  const text = monthFormat.format(utcDate(year, month, 1)).replace(' de ', ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}
