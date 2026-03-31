"use client";
import { useState, useRef, useEffect } from "react";
import BotonEliminar from "./BotonEliminar";

export default function MenuOpciones({ idContacto, accionEliminar, onEditar }: any) {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={menuRef}
      // Si está abierto se ve siempre, sino, solo cuando pasás el mouse (group-hover)
      className={`relative transition-opacity duration-200 z-10 ${
        abierto ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all"
      >
        {/* Ícono de 3 puntos */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      </button>

      {abierto && (
        <div className="absolute right-0 top-10 w-32 bg-white shadow-xl border border-slate-100 rounded-xl overflow-hidden z-30 py-1">
          <button 
          type="button"
          onClick={() => {
              onEditar(); //avisa que queremos editar
              setAbierto(false); //Cierra el menu de 3 puntitos
            }}
          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors flex items-center gap-2">
            Editar
          </button>
          
          <form action={accionEliminar}>
            <input type="hidden" name="id" value={idContacto} />
            <BotonEliminar />
          </form>
        </div>
      )}
    </div>
  );
}