/**
 * Created by LFarfan on 13/03/2017.
 */
import {ISistema} from './sistemas.interface';
import {SistemasService} from 'sistemas.service';
import * as utils from '../../core/utils';
import {ObjectHelper} from '../../core/helper.inei';
declare var $: any;
var objectHelper = new ObjectHelper();


class SistemaController {
    private sistemas: ISistema[];
    private sistema_selected :ISistema;
    private sistemaService = new SistemasService();
    private sistema_form_validate: any;
    private datatable_sistemas: any;

    constructor() {
        this.onInit();
    }

    onInit() {
        this.getSistemas();

        this.sistema_form_validate = $('#form_save').validate();
        this.datatable_sistemas = $('#tbl_sistemas');
        $('#btn_add_sistema').on('click', () => {
            this.setModal(null);
            $('#modal_sistemas').modal('show');
        });

        $('#btn_save_sistema').on('click', () => {

                 this.addSistema();

        });

    }


   /*Cargar  datos de  tabla de utils */
    // getSistemas() {
    //     this.sistemaService.getSistemas().done((data: any) => {
    //         this.sistemas = data;
    //         utils.drawTable(this.sistemas, ['codigo', 'descripcion', 'nombre','estado'],'id', {
    //             edit_name: 'btn_edit_sistema',
    //             delete_name: 'btn_delete_sistema',
    //             enumerar: true,
    //             table_id: 'tbl_sistemas'
    //         });
    //       this.upgradeHTMLElements();
    //
    //     }).fail(() => {
    //         utils.showSwalAlert('Ha ocurrido un error', 'Error', 'error');
    //     })
    // }



    /*Cargar datos de tabla*/
    getSistemas() {
        this.sistemaService.get().done((sistemas: ISistema[]) => {
            this.sistemas = sistemas;
            let html: string = '';
            this.sistemas.map((value: ISistema, pos: number) => {
                html += `<tr >
                            <td>${value.id}</td>
                            <td>${value.codigo}</td>
                            <td>${value.descripcion}</td>
                            <td>${value.nombre}</td>
                            <td>${value.estado === 1 ? '<span class="label label-success">Activo</span>' : '<span class="label label-danger">Inactivo</span>'}</td>
                            <td><ul class="icons-list">
                                    <li><i class="icon-pencil7"></i></a></li>
                                    <li ><a onclick="mensaje()"><i class="icon-trash"></i></a></li>
						        </ul></td>
                         </tr>`;
            });

                 this.upgradeHTMLElements();
                $('#tbl_sistemas').find('tbody').html(html);






        }).fail(() => {
            utils.showInfo('ERROR AL CARGAR USUARIOS');
        })

    }

             public mensaje(){
        alert("hola mundo");

              }





    /*Guardar Sistema*/
    addSistema() {


        let valid_form: any = objectHelper.formToObject(utils.serializeForm('form_save'));

             this.sistemaService.add(valid_form).done(() => {
                this.sistema_form_validate.resetForm();
               $('#modal_sistemas').modal('hide');
               utils.ShowDivAlerta('El permiso se ha agregado con éxito!','success');

        /*if (this.sistema_form_validate.valid()) {
            let valid_form: any = objectHelper.formToObject(utils.serializeForm('form_save'));

             this.sistemaService.add(valid_form).done(() => {
                this.sistema_form_validate.resetForm();
               $('#modal_sistemas').modal('hide');

                utils.ShowDivAlerta('El permiso se ha agregado con éxito!','success');*/





            }).fail(() => {
                utils.showSwalAlert('Ha ocurrido un error!, favor de contactar con el administrador', 'Error', 'error');
                $('#modal_sistemas').modal('hide');
            })





    }







    /*Eliminar Registro*/

    deletePermiso (pk: any) {
        this.sistemaService.delete(pk).done(() => {
            this.getSistemas();
            utils.showSwalAlert('El permiso se ha borrado con éxito', 'Eliminado', 'success');
        }).fail(() => utils.showSwalAlert('Ha ocurrido un error!, favor de contactar con el administrador', 'Error', 'error'))
    }

     /*actualiza  tabla cuando se edita o elimina un registro*/
     upgradeHTMLElements() {

        $('li[name="btn_delete_sistema"]').on('click', (event: any) => {
            this.setSistema(parseInt($(event.currentTarget).data('value')))
            utils.alert_confirm(() => this.deletePermiso(parseInt($(event.currentTarget).data('value'))), 'Esta seguro que desea eliminar?', 'error');
        });
    }
    /* establecer clase permiso*/

    setSistema(pk: number) {
        let data: any = null;
        this.sistemas.filter((value) => {
            if (value.id == pk) {
                data = value;
            }
        });
        this.sistema_selected = data;
    }

    setModal(data_selected: any = null) {
        this.sistema_selected = data_selected;
         if (data_selected != null) {
            for (let i in data_selected) {
                if ($(`[name=${i}]`).length) {
                    $(`[name=${i}]`).val(data_selected[i]);
                }
            }
        } else {
            $('#form_save')[0].reset();
            // this.sistema_form_validate.resetForm();
        }
    }


}

new SistemaController();
