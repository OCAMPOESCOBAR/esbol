export class Docente {

    constructor(
        public cedula: string,
        public nombres: string,
        public apellidos: string,
        public compania: string,
        public curso: string,
        public seccion: string,
        public ciudad: string,
        public telefono: string,
        public email: string,
        public tipo: string,
        public _id?: string
    ) { }

}