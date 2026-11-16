// Fechas de la app. El contrato las envía como texto YYYY-MM-DD y «hoy» es la fecha de America/Bogota,
// nunca la del navegador ni la UTC (RN-GEN-001)

const TIME_ZONE = 'America/Bogota';

// Partes de una fecha YYYY-MM-DD sin pasar por Date: así no se corre un día por la zona horaria
export function parseIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
}

export function toIsoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// La fecha de hoy en Bogotá: '2026-11-16'
export function todayIso() {
  // en-CA da el formato YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date());
}

// Días que tiene un mes (month de 1 a 12)
export function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

// Día de la semana del primer día del mes, con la semana empezando en lunes: lunes 0 … domingo 6
export function firstWeekday(year: number, month: number) {
  return (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
}

const dayFormat = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
const monthFormat = new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// '2026-10-23' → '23 oct 2026' (sin el punto que agrega es-CO a las abreviaturas)
export function formatDate(value: string) {
  const { year, month, day } = parseIsoDate(value);
  return dayFormat
    .format(new Date(Date.UTC(year, month - 1, day)))
    .replaceAll('.', '')
    .replaceAll(' de ', ' ');
}

// (2026, 10) → 'Octubre 2026'
export function formatMonth(year: number, month: number) {
  const text = monthFormat.format(new Date(Date.UTC(year, month - 1, 1))).replace(' de ', ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}
