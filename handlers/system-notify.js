/**
 * system-notify
 * our Request handler.
 */
// const Sentry = require("@sentry/node");

module.exports = {
   /**
    * Key: the cote message key we respond to.
    */
   key: "log_manager.notification",

   inputValidation: {
      domain: { string: true, required: true },
      error: { optional: true },
      info: { object: true, optional: true },
      callStack: { optional: true },
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
      req.log("log_manager.notification");
      req.log("log_manager.notification recieved", req.params());
      cb();
   },
};
