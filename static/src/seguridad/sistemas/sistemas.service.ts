/**
 * Created by lfarfan on 27/02/2017.
 */
declare var BASEURL: string;
interface Urlsistemas {

    sistemas: string;

   
}

export class SistemasService {
    private url: Urlsistemas = {

        sistemas: `${BASEURL}/rest_sistemas/sistema/`,
    };

    get(pk: number = null): JQueryXHR {
        return $.ajax({
            url: pk == null ? this.url.sistemas : `${this.url.sistemas}${pk}/`,
            type: 'GET'
        });
    }

    getSistemas(): JQueryXHR {
        return $.ajax({
            url: this.url.sistemas,
            type: 'GET'
        });
    }

    add(obj: Object): JQueryXHR {
        return $.ajax({
            url: `${this.url.sistemas}`,
            type: 'POST',
            data: obj,
        });
    }



    delete(pk: number): JQueryXHR {
        return $.ajax({
            url: `${this.url.sistemas}${pk}/`,
            type: 'DELETE',
        });
    }
    
}

