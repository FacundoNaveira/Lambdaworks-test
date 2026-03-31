"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Buscador() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term); // Si escribís algo, lo agrega a la URL
    } else {
      params.delete("query"); // Si borrás todo, limpia la URL
    }
    // Actualiza la URL sin recargar la página entera
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center bg-violet-100 rounded-xl px-3 py-2 group focus-within:ring-2 focus-within:ring-blue-500 transition-all">
      <span className="text-slate-400">🔍</span>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()} // Mantiene escrito lo que buscaste
        className="w-12 focus:w-48 transition-all duration-300 bg-transparent outline-none ml-2 text-sm text-slate-700 placeholder-slate-400"
      />
    </div>
  );
}