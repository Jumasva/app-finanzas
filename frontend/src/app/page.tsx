'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('cargando...');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.estado))
      .catch(() => setStatus('error: la API no responde'));
  }, []);

  return <main className="p-8 text-lg">Estado de la API: {status}</main>;
} 