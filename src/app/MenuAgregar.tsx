"use client";
import { useState, useRef, useEffect } from "react";
import FormularioAgregar from "./FormularioAgregar";

export default function MenuAgregar({ accionGuardar }: any) {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // El "Sensor": si hacés clic afuera, se cierra el menú
  useEffect(() => {
    function handleClickFuera(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <div className="relative group" ref={menuRef}>
      <button
        onClick={() => setAbierto(!abierto)}
        title="Agregar nuevo contacto"
        className="bg-violet-600 text-white w-10 h-10 rounded-xl hover:bg-violet-700 transition-all flex items-center justify-center shadow-md"
      >
        <span className="text-2xl leading-none font-light">+</span>
      </button>

      {/* Solo mostramos el formulario si 'abierto' es true */}
      {abierto && (
        <div className="absolute right-0 top-12 w-72 bg-white shadow-2xl border border-slate-100 rounded-2xl p-5 z-20">
          <h3 className="font-bold text-slate-800 mb-4 text-sm">Nuevo Contacto</h3>
          
          <FormularioAgregar 
            accionGuardar={async (formData: FormData) => {
                const respuesta = await accionGuardar(formData);

                if(respuesta?.error){
                    return respuesta; // si da error se lo paso al formulario 
                }

                setAbierto(false); // Solo se cierra si no hubo error
            }}
        />    
        </div>
      )}
    </div>
  );
}