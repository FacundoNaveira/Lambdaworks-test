"use client"; // Le dice a Next.js: "Esto se ejecuta en el navegador del usuario"

export default function BotonEliminar() {
  return (
    <button
      type="submit"
      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm font-medium transition-colors"
      onClick={(e) => {
        // Hacemos la pregunta
        const confirmado = window.confirm("¿Estás seguro de que querés eliminar este contacto?");
        
        // Si el usuario toca "Cancelar", frenamos el envío del formulario
        if (!confirmado) {
          e.preventDefault();
        }
      }}
    >
      Eliminar
    </button>
  );
}