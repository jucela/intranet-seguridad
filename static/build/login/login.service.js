define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var LoginService = (function () {
        function LoginService() {
            this.url = BASEURL + "/seguridad/authenticate/";
        }
        LoginService.prototype.validateSession = function (usuario, clave) {
            return $.ajax({
                url: this.url,
                type: 'POST',
                data: { usuario: usuario, clave: clave }
            });
        };
        return LoginService;
    }());
    exports["default"] = LoginService;
});
//# sourceMappingURL=login.service.js.map