import { SessionTestPanel } from '@/features/auth/components/SessionTestPanel';

// Provisional: destino después de iniciar sesión, hasta construir el panel (Módulo 5)
export default function InicioPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-h1">Inicio</h1>
      {/* Botones para probar la sesión; no aparecen en producción */}
      {process.env.NODE_ENV !== 'production' && <SessionTestPanel />}
    </div>
  );
}
