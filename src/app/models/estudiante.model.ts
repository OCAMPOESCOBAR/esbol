export class Estudiante {

    constructor(
        public cedula: string,
        public nombres: string,
        public apellidos: string,
        public programa: string,
        public compania: string,
        public seccion: string,
        public _id?: string
    ) { }

}