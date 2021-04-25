/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  /**
   * Acciones que se tendrán para rutas (1 acción = 1 ruta):
   * Estructura --> 'address':'target'
   *  address --> verb (POST, GET, PUT, DELETE or PATCH (si no se pone nada puede coincidir con cualquiera)) + path
   *  - Accionar cada cubo para introducir cada elemento de la lista
   *  - Accionar camión para vaciar los cubos de basura
  */
  
  'POST /container': 'containerController.throw',
  ' /truck': 'containerController.empty'

};