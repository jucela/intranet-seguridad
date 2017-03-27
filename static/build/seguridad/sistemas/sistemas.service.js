define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SistemasService = (function () {
        function SistemasService() {
            this.url = {
                sistemas: BASEURL + "/rest_sistemas/sistema/"
            };
        }
        SistemasService.prototype.get = function (pk) {
            if (pk === void 0) { pk = null; }
            return $.ajax({
                url: pk == null ? this.url.sistemas : "" + this.url.sistemas + pk + "/",
                type: 'GET'
            });
        };
        SistemasService.prototype.getSistemas = function () {
            return $.ajax({
                url: this.url.sistemas,
                type: 'GET'
            });
        };
        SistemasService.prototype.add = function (obj) {
            return $.ajax({
                url: "" + this.url.sistemas,
                type: 'POST',
                data: obj
            });
        };
        SistemasService.prototype["delete"] = function (pk) {
            return $.ajax({
                url: "" + this.url.sistemas + pk + "/",
                type: 'DELETE'
            });
        };
        return SistemasService;
    }());
    exports.SistemasService = SistemasService;
});
//# sourceMappingURL=sistemas.service.js.map