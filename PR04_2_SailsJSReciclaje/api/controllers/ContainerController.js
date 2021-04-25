/**
 * ContainerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Container = require("../models/Container");

module.exports = {

    create: async function (req, res, next, callback) {
      var params = req.body;

      console.log(params);
      
      Container.create(params, function(err, createData) {
        if (err) {
            return res.badRequest({
                error: err
            });
        } else {
            return res.json ({
                data: createData
            });
        }
      });
    },

    throw: async function (req, res, id) {

    },

    empty: async function (req, res) {

    },

    listing: async function (res, req) {

    }
};

