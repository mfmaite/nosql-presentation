// NameList.js
import React, { useEffect, useState } from 'react';
import { ref, onChildAdded } from 'firebase/database';
import { firebaseClient } from '@/app/firebase';

const NameList = () => {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const dataRef = ref(firebaseClient, 'nombres');

    // Escucha cuando un nuevo nombre es añadido
    onChildAdded(dataRef, (snapshot) => {
      const data = snapshot.val();
      setNames(prevNames => [...prevNames, data.nombre]);
    });
  }, []);

  return (
    <ul>
      {names.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
};

export default NameList;
