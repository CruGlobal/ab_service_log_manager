/**
 * rowlog-find
 * our Request handler.
 */
import queryRowLogFind from "../queries/rowLog-Find.js";

export default {
   key: "log_manager.rowlog-find",

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
      objectID: { string: { uuid: true }, required: true },
      row: { string: { uuid: true }, optional: true },
      level: { string: true, optional: true },
      username: { string: true, optional: true },
      start: { number: { integer: true }, optional: true },
      limit: { number: { integer: true }, optional: true },
      startDate: { date: true, optional: true },
      endDate: { date: true, optional: true },
   },

   /**
    * fn
    * our Request handler.
    * @param {obj} req
    *        the request object sent by the
    *        api_sails/api/controllers/log_manager/rowlog-find.
    * @param {fn} cb
    *        a node style callback(err, results) to send data when job is finished
    */
   fn: function handler(req, cb) {
      req.log("log_manager.rowlog-find");

      var values = {};
      Object.keys(this.inputValidation).forEach((k) => {
         var val = req.param(k);
         if (val) values[k] = val;
      });

      queryRowLogFind(req, values)
         .then((results) => {
            (results || []).forEach((r) => {
               if (typeof r.record == "string") {
                  r.record = JSON.parse(r.record);
               }
            });
            cb(null, results);
         })
         .catch(cb);
   },
};
