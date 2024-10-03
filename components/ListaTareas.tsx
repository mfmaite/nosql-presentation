import React, { useEffect, useState } from 'react';
import { ref, get, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';
import { firebaseClient } from '@/app/firebase';
import { Tarea } from '@/types/tarea';
import TareaComponent from './Tarea';

const NameList = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    const dataRef = ref(firebaseClient, 'tareas');

    onChildAdded(dataRef, (snapshot) => {
      const data = snapshot.val();
      const id = snapshot.key;

      // Agrega la tarea a la lista de tareas
      setTareas(prevTareas => {
        if (!prevTareas.find(tarea => tarea.id === id)) {
          return [...prevTareas, { ...data, id }];
        }
        return prevTareas;
      });
    });

    onChildChanged(dataRef, (snapshot) => {
      const updatedData = snapshot.val();
      const id = snapshot.key;

      // Actualiza el estado con los datos modificados
      setTareas(prevTareas =>
        prevTareas.map(tarea =>
          tarea.id === id ? { ...tarea, ...updatedData } : tarea
        )
      );
    });

    // Detecta cuando se elimina un hijo
    onChildRemoved(dataRef, (snapshot) => {
      const id = snapshot.key;

      // Elimina la tarea correspondiente del estado
      setTareas(prevTareas =>
        prevTareas.filter(tarea => tarea.id !== id)
      );
    });
  }, []);

  const fetchTareas = async () => {
    const dataRef = ref(firebaseClient, 'tareas');
    const res = await get(dataRef);

    if(res) {
      const data = res.val();
      const temp = Object.keys(data).map((dato) => {
        return { ...data[dato], id: dato }
      })
      setTareas(temp);
    }
  }

  useEffect(() => {
    fetchTareas();
  }, [])

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold from-stone-800 text-4xl py-5">Lista de Tareas</h1>

      {tareas.map((task) => (
        <TareaComponent key={task.nombre} tarea={task} />
      ))}
    </div>
  );
};

export default NameList;
