import { db } from "../lib/db";
import { revalidatePath } from "next/cache";
import MenuAgregar from "./MenuAgregar";
import MenuOpciones from "./MenuOpciones";
import Link from "next/link";
import Buscador from "./Buscador";
import TarjetaContacto from "./TarjetaContacto";

interface Contacto {
  id: number;
  nombre: string;
  email: string;
}

export default async function Home({ searchParams }: {searchParams: { orden?: string, query?: string } }) {
  // 1. LEER: Traemos los contactos reales de la base de datos ordenados
  const ordenActual = searchParams.orden === "desc" ? "desc" : "asc";
  const textoBusqueda = searchParams.query || "";
  const contactos = await db.contacto.findMany({
    where: {
      OR: [
        {
          nombre: { contains: textoBusqueda, mode: "insensitive" },
        },
        {
          email: { contains: textoBusqueda, mode: "insensitive" },
        },
      ],
    },
  });

  // 3. Ordeno la lista usando JavaScript
  contactos.sort((a, b) => {
    if (ordenActual === "asc") {
      return a.nombre.localeCompare(b.nombre); // Orden A-Z
    } else {
      return b.nombre.localeCompare(a.nombre); // Orden Z-A
    }
  });

  // 2. CREAR: Función para guardar (Server Action)
  async function agregarContacto(formData: FormData) {
    "use server";
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;

    // --- EL PATOVICA (que no haya mails repetidos)---
    const contactoExistente = await db.contacto.findFirst({
      where: { email: email }
    });

    if (contactoExistente) {
      return { error: "Error: el mail ya está registrado"}; 
    }

    await db.contacto.create({
      data: { nombre, email },
    });

    revalidatePath("/");
  }

  // 3. ACTUALIZAR: Función para editar (Server Action)
  async function editarContacto(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;

    // Revisamos que el nuevo mail no esté ocupado por OTRO contacto
    const existente = await db.contacto.findFirst({ where: { email } });
      if (existente && existente.id !== id) {
        return {error: "Error: el mail ya está registrado"}; 
      }

    // Le pedimos a Prisma que actualice solo ese ID
    await db.contacto.update({
      where: { id },
      data: { nombre, email },
    });

    revalidatePath("/");
  }

  // 4. ELIMINAR: Función para borrar (Server Action)
  async function eliminarContacto(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));

    await db.contacto.delete({
      where: { id },
    });

    revalidatePath("/");
  }

  return (
    <div className="bg-violet-100 min-h-screen">
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-black text-slate-800 mb-8 text-center tracking-tight">
        Agenda de contactos
      </h1>

      {/* LA BARRA DE HERRAMIENTAS */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-6">
        
        {/* Lado Izquierdo: Buscador Expandible y Filtro */}
        <div className="flex items-center gap-2">

          <Buscador />

          {/* Botón Ordenar (A-Z) */}
          <Link 
            href={`/?orden=${ordenActual === "asc" ? "desc" : "asc"}`}
            className="flex items-center gap-1 px-3 py-2 hover:bg-slate-100 rounded-xl text-slate-600 text-sm font-bold transition-all" 
            title={ordenActual === "asc" ? "Ordenar de Z a A" : "Ordenar de A a Z"}
          >
            {ordenActual === "asc" ? "A-Z" : "Z-A"} <span className="text-lg leading-none">⇅</span>
          </Link>
        </div>

        {/* Lado Derecho: Botón Agregar Desplegable */}
        <MenuAgregar accionGuardar={agregarContacto}/>
      </div>

      {/* LA LISTA DE CONTACTOS */}
      <div className="flex flex-col gap-3">
        {contactos.map((c: any) => (
          <TarjetaContacto
            key={c.id}
            contacto={c}
            accionEditar={editarContacto}
            accionEliminar={eliminarContacto}
          />
        ))}

        {contactos.length === 0 && (
          <div className="text-center p-10 mt-4 bg-transparent border-2 border-slate-200 border-dashed rounded-2xl">
            <p className="text-slate-500 font-medium">No hay nadie por acá...</p>
          </div>
        )}
      </div>

    </main>
  )
  </div>
  )}