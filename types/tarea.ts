export type Tarea = {
  id: string,
  nombre: string,
  descripcion: string,
  completed: boolean,
}

export const initialTarea: Tarea = {
  id: '',
  nombre: '',
  descripcion: '',
  completed: false,
}
