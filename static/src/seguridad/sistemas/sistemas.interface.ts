import {IPermiso} from "../permisos/permisos.interface";
/**
 * Created by lfarfan on 27/02/2017.
 */
export interface ISistema {
    id: number;
    codigo: string;
    descripcion: string;
    nombre: string;
    estado:number;

}
 export interface ISistema extends Array<ISistema>{

}