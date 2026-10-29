import type { ApiResult } from '@/lib/api';

// Muestra la respuesta de la API tal cual: el código HTTP y el JSON
export function Result({ result }: { result: ApiResult | null }) {
  if (result === null) {
    return null;
  }

  return (
    <pre className="mt-4 bg-gray-100 p-4 text-sm whitespace-pre-wrap">
      {result.status}
      {'\n'}
      {JSON.stringify(result.data, null, 2)}
    </pre>
  );
}