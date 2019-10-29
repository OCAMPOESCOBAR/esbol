export class Clase {

    constructor(
        public asignatura: string,
        public horaInicio: string,
        public horaFin: string,
        public docente?: string,
        public fecha?: string,
        public seccion?: string,
        public estudiante?: string,
        public _id?: string
    ) { }

}