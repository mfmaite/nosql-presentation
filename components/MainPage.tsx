'use client'

import React from 'react';
import AgregarTareas from './AgregarTareas';
import ListaTareas from './ListaTareas';

const MainPage = () => {

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <AgregarTareas />

      <ListaTareas />
    </div>
  )
}

export default MainPage
