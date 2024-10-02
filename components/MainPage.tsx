'use client'

import React, { useState, useEffect } from 'react';
import { ref, push, onChildAdded } from "firebase/database";
import { firebaseClient } from '@/app/firebase';

const MainPage = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const dataRef = ref(firebaseClient, 'nombres');

    // Escucha cuando un nuevo nombre es añadido
    onChildAdded(dataRef, (snapshot) => {
      const data = snapshot.val();
      setNames(prevNames => [...prevNames, data.nombre]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRef = ref(firebaseClient, 'nombres');

    // Agrega un nuevo nombre a la base de datos
    push(dataRef, { nombre: name });
    setName(''); // Resetea el campo de input
  };

  return (
    <div>
      <h1>Firebase Database Demo con React</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <button type="submit">Guardar en Firebase</button>
      </form>

      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default MainPage
