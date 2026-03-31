"use client";
import { useRef, useState } from "react";

export default function FormularioAgregar({ accionGuardar }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        setError(null); // Escondemos errores anteriores al volver a intentar
        const respuesta = await accionGuardar(formData);

        if (respuesta?.error) {
          setError(respuesta.error); // Si falló, mostramos el cartel
        } else {
          formRef.current?.reset(); // Si guardó bien, limpiamos las cajitas
        }
      }}
      className="flex flex-col gap-3"
    >
      {/* EL CARTELITO DE ERROR */}
      {error && (
        <div className="bg-red-50 text-red-600 p-2 rounded-lg text-xs font-bold text-center border border-red-200">
          {error}
        </div>
      )}

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        required
        className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-sm transition-all mt-1"
      >
        Guardar
      </button>
    </form>
  );
}