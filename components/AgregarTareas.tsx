import React, { useState } from 'react'

import { push, ref, set } from "firebase/database";
import { firebaseClient } from '@/app/firebase';
import { Button, Input, Textarea } from '@headlessui/react';
import { initialTarea, Tarea } from '@/types/tarea';

const AgregarTareas = () => {
  const [tarea, setTarea] = useState<Tarea>(initialTarea);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Busca la referencia a location
    // si no existe la crea
    const dataRef = push(ref(firebaseClient, 'tareas'));

    // Agrega una nueva tarea
    set(dataRef, {
      nombre: tarea.nombre,
      descripcion: tarea.descripcion,
      completed: tarea.completed,
    })
    setTarea(initialTarea);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-3 w-fit items-center'>
      <h1 className="font-semibold from-stone-800 text-4xl py-5">Nueva Tarea</h1>

      <Input
        type="text"
        value={tarea.nombre}
        onChange={(e) => setTarea({ ...tarea, nombre: e.target.value })}
        placeholder="Nombre"
        required
        className="border data-[hover]:shadow data-[focus]:bg-blue-100 w-96 p-2 rounded-md"
      />

      <Textarea
        value={tarea.descripcion}
        onChange={(e) => setTarea({ ...tarea, descripcion: e.target.value })}
        placeholder="Descripción de la Tarea"
        className="border data-[hover]:shadow data-[focus]:bg-blue-100 w-96 p-2 rounded-md"
        rows={4}
      />

      <Button type="submit" className="w-36 rounded-lg bg-sky-600 my-5 py-2 px-4 text-m text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
        Guardar Tarea
      </Button>
    </form>
  )
}

export default AgregarTareas
