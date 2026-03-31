"use client";
import { useState } from "react";
import MenuOpciones from "./MenuOpciones";

export default function TarjetaContacto({ contacto, accionEditar, accionEliminar }: any) {
  const [editando, setEditando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // MODO EDICIÓN: Muestra los inputs
  if (editando) {
    return (
      <form
        action={async (formData) => {
          setError(null); // Limpiamos errores viejos al reintentar
          const respuesta = await accionEditar(formData); // Guarda en la BD
          
          if (respuesta?.error) {
            setError(respuesta.error); // Si falló, mostramos el cartel rojo
          } else {
            setEditando(false); // Si guardó bien, vuelve a la vista normal
          }
        }}
        className="flex flex-col p-4 border-2 border-blue-400 rounded-2xl bg-blue-50 shadow-sm transition-all gap-3"
      >
        {/* EL CARTELITO DE ERROR */}
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded-lg text-xs font-bold text-center border border-red-200">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center w-full">
          <input type="hidden" name="id" value={contacto.id} />
          
          <div className="flex flex-col gap-2 w-full mr-4">
            <input
              type="text"
              name="nombre"
              defaultValue={contacto.nombre}
              required
              className="p-2 border border-blue-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              defaultValue={contacto.email}
              required
              className="p-2 border border-blue-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button type="submit" className="text-xs font-bold bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Guardar
            </button>
            <button 
              type="button" 
              onClick={() => {
                setEditando(false); 
                setError(null); // Limpiamos el error si cancela
              }} 
              className="text-xs font-bold bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    );
  }

  // MODO NORMAL: Muestra el texto y los puntitos
  return (
    <div className="flex justify-between items-center p-4 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all group">
      <div>
        <p className="font-bold text-slate-800">{contacto.nombre}</p>
        <p className="text-sm text-slate-500">{contacto.email}</p>
      </div>

      <MenuOpciones
        idContacto={contacto.id}
        accionEliminar={accionEliminar}
        onEditar={() => setEditando(true)} 
      />
    </div>
  );
}