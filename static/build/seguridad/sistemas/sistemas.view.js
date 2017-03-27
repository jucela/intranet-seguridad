define(["require", "exports", "sistemas.service", "../../core/utils", "../../core/helper.inei"], function (require, exports, sistemas_service_1, utils, helper_inei_1) {
    "use strict";
    exports.__esModule = true;
    var objectHelper = new helper_inei_1.ObjectHelper();
    var SistemaController = (function () {
        function SistemaController() {
            this.sistemaService = new sistemas_service_1.SistemasService();
            this.onInit();
        }
        SistemaController.prototype.onInit = function () {
            var _this = this;
            this.getSistemas();
            this.sistema_form_validate = $('#form_save').validate();
            this.datatable_sistemas = $('#tbl_sistemas');
            $('#btn_add_sistema').on('click', function () {
                _this.setModal(null);
                $('#modal_sistemas').modal('show');
            });
            $('#btn_save_sistema').on('click', function () {
                _this.addSistema();
            });
        };
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
        SistemaController.prototype.getSistemas = function () {
            var _this = this;
            this.sistemaService.get().done(function (sistemas) {
                _this.sistemas = sistemas;
                var html = '';
                _this.sistemas.map(function (value, pos) {
                    html += "<tr >\n                            <td>" + value.id + "</td>\n                            <td>" + value.codigo + "</td>\n                            <td>" + value.descripcion + "</td>\n                            <td>" + value.nombre + "</td>\n                            <td>" + (value.estado === 1 ? '<span class="label label-success">Activo</span>' : '<span class="label label-danger">Inactivo</span>') + "</td>\n                            <td><ul class=\"icons-list\">\n                                    <li><i class=\"icon-pencil7\"></i></a></li>\n                                    <li ><a onclick=\"mensaje()\"><i class=\"icon-trash\"></i></a></li>\n\t\t\t\t\t\t        </ul></td>\n                         </tr>";
                });
                _this.upgradeHTMLElements();
                $('#tbl_sistemas').find('tbody').html(html);
            }).fail(function () {
                utils.showInfo('ERROR AL CARGAR USUARIOS');
            });
        };
        SistemaController.prototype.mensaje = function () {
            alert("hola mundo");
        };
        /*Guardar Sistema*/
        SistemaController.prototype.addSistema = function () {
            var _this = this;
            var valid_form = objectHelper.formToObject(utils.serializeForm('form_save'));
            this.sistemaService.add(valid_form).done(function () {
                _this.sistema_form_validate.resetForm();
                $('#modal_sistemas').modal('hide');
                utils.ShowDivAlerta('El permiso se ha agregado con éxito!', 'success');
                /*if (this.sistema_form_validate.valid()) {
                    let valid_form: any = objectHelper.formToObject(utils.serializeForm('form_save'));
        
                     this.sistemaService.add(valid_form).done(() => {
                        this.sistema_form_validate.resetForm();
                       $('#modal_sistemas').modal('hide');
        
                        utils.ShowDivAlerta('El permiso se ha agregado con éxito!','success');*/
            }).fail(function () {
                utils.showSwalAlert('Ha ocurrido un error!, favor de contactar con el administrador', 'Error', 'error');
                $('#modal_sistemas').modal('hide');
            });
        };
        /*Eliminar Registro*/
        SistemaController.prototype.deletePermiso = function (pk) {
            var _this = this;
            this.sistemaService["delete"](pk).done(function () {
                _this.getSistemas();
                utils.showSwalAlert('El permiso se ha borrado con éxito', 'Eliminado', 'success');
            }).fail(function () { return utils.showSwalAlert('Ha ocurrido un error!, favor de contactar con el administrador', 'Error', 'error'); });
        };
        /*actualiza  tabla cuando se edita o elimina un registro*/
        SistemaController.prototype.upgradeHTMLElements = function () {
            var _this = this;
            $('li[name="btn_delete_sistema"]').on('click', function (event) {
                _this.setSistema(parseInt($(event.currentTarget).data('value')));
                utils.alert_confirm(function () { return _this.deletePermiso(parseInt($(event.currentTarget).data('value'))); }, 'Esta seguro que desea eliminar?', 'error');
            });
        };
        /* establecer clase permiso*/
        SistemaController.prototype.setSistema = function (pk) {
            var data = null;
            this.sistemas.filter(function (value) {
                if (value.id == pk) {
                    data = value;
                }
            });
            this.sistema_selected = data;
        };
        SistemaController.prototype.setModal = function (data_selected) {
            if (data_selected === void 0) { data_selected = null; }
            this.sistema_selected = data_selected;
            if (data_selected != null) {
                for (var i in data_selected) {
                    if ($("[name=" + i + "]").length) {
                        $("[name=" + i + "]").val(data_selected[i]);
                    }
                }
            }
            else {
                $('#form_save')[0].reset();
                // this.sistema_form_validate.resetForm();
            }
        };
        return SistemaController;
    }());
    new SistemaController();
});
//# sourceMappingURL=sistemas.view.js.map