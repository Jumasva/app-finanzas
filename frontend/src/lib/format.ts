// Formatos de la app (es-CO)

// Pesos colombianos sin decimales y con punto de miles: 1250000 → "1.250.000"
// useGrouping 'always': en español el 4250 saldría "4250" sin punto
const moneyFormat = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0, useGrouping: 'always' });

// 1250000 → "$1.250.000" (sin signo: el signo lo pone quien lo muestra)
export function formatMoney(value: number) {
  return `$${moneyFormat.format(Math.abs(value))}`;
}

// Segundos de espera para una cuenta regresiva: 59 → "0:59", 125 → "2:05"
export function formatWait(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
