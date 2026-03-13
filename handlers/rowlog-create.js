/**
 * rowlog-create
 * our Request handler.
 */
import sqlRowLogCreate from "../queries/rowLog-Create.js";

export default {
   key: "log_manager.rowlog-create",

   /**
    * inputValidation
    * define the expected inputs to this service handler:
    * Format:
    * "parameterName" : {
    *    {joi.fn}   : {bool},  // performs: joi.{fn}();
    *    {joi.fn}   : {
    *       {joi.fn1} : true,   // performs: joi.{fn}().{fn1}();
    *       {joi.fn2} : { options } // performs: joi.{fn}().{fn2}({options})
    *    }
    *    // examples:
    *    "required" : {bool},  // default = false
    *
    *    // custom:
    *        "validation" : {fn} a function(value, {allValues hash}) that
    *                       returns { error:{null || {new Error("Error Message")} }, value: {normalize(value)}}
    * }
    */
   inputValidation: {
      uuid: { string: { uuid: true }, optional: true },
      username: { string: true, required: true },
      usernameReal: { string: { allow: [null] }, optional: true },
      record: { required: true },
      level: { string: true, required: true },
      row: { string: { uuid: true }, required: true },
      object: { string: { uuid: true }, required: true },
   },

   /**
    * fn
    * our Request handler.
    * @param {obj} req
    *        the request object sent by the api_sails/api/controllers/log_manager/rowlog-create.
    * @param {fn} cb
    *        a node style callback(err, results) to send data when job is finished
    */
   fn: function handler(req, cb) {
      req.log("log_manager.rowlog-create");

      // Get the passed in parameters
      var values = {};
      Object.keys(this.inputValidation).forEach((k) => {
         values[k] = req.param(k);
      });

      let ignoreProps = [
         "id",
         "uuid",
         "created_at",
         "updated_at",
         "properties",
         "createdAt",
         "updatedAt",
      ];

      ignoreProps.forEach((p) => {
         delete values.record[p];
      });

      // record must be a string:
      values.record = JSON.stringify(values.record);

      sqlRowLogCreate(req, values)
         .then(() => {
            cb(null, { status: "success" });
         })
         .catch(cb);
   },
};
