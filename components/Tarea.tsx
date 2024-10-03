import React, { useState } from 'react'
import { Tarea as TareaType } from '@/types/tarea'
import { Button, Checkbox, Input, Textarea } from '@headlessui/react';
import { ref, remove, set } from 'firebase/database';
import { firebaseClient } from '@/app/firebase';

const Tarea = ({ tarea }: { tarea: TareaType }) => {
  const [edit, setEdit] = useState(false);
  const [editedTarea, setEditedTarea] = useState(tarea);

  const handleUpdate = async () => {
    if (edit) {
      const dataRef = ref(firebaseClient, 'tareas/'+tarea.id);

      set(dataRef, {
        nombre: editedTarea.nombre,
        descripcion: editedTarea.descripcion
      }).catch(() => {
        alert("Error al actualizar")
      })
    }

    setEdit(!edit)
  }

  const markAsCompleted = () => {
    const dataRef = ref(firebaseClient, 'tareas/'+tarea.id);

    set(dataRef, {
      ...tarea,
      completed: !tarea.completed
    }).catch(() => {
      alert("Error al actualizar")
    })
  }

  const handleDelete = () => {
    const dataRef = ref(firebaseClient, 'tareas/'+tarea.id);

    remove(dataRef).catch(() => {
      alert("Error al eliminar")
    })
  }

  return (
    <div className="flex flex-row w-96 justify-between bg-componentBg p-3 rounded-lg mb-4">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <Checkbox
            checked={tarea.completed}
            onChange={markAsCompleted}
            className="group block size-6 rounded border bg-white data-[checked]:bg-blue-500 mr-2"
          >
            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
              <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Checkbox>

          {edit ? (
            <Input value={editedTarea.nombre} onChange={(e) => setEditedTarea({ ...editedTarea, nombre: e.target.value })} className="rounded-md p-2"/>
          ) : (
            <span className="font-bold text-xl">{tarea.nombre}</span>
          )}
        </div>

        {edit ? (
          <Textarea
            value={editedTarea.descripcion}
            onChange={(e) => setEditedTarea({ ...editedTarea, descripcion: e.target.value })}
            className="rounded-md p-2 mt-4"
          />
        )
        : (
          <span>{tarea.descripcion}</span>
        )}
      </div>

      <div className="flex flex-col h-full items-center">
        <Button
          className="mr-2 w-4 h-4"
          onClick={handleUpdate}
        >
          {edit ? (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          ) : (
            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.637 306.637"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"></path> <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
          )}
        </Button>

        <Button
          className="mr-2 w-5 h-5 mt-2"
          onClick={handleDelete}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5001 6H3.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M9.5 11L10 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M14.5 11L14 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#1C274C" strokeWidth="1.5"></path> </g></svg>
        </Button>
      </div>
    </div>
  )
}

export default Tarea;
