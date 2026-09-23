// rowLog-Find.js
// return values from the AB_RowLog table

module.exports = function (req, v) {
   return new Promise((resolve, reject) => {
      let tenantDB = req.queryTenantDB(reject);
      if (!tenantDB) {
         // reject() has already been called in .queryTenantDB()
         return;
      }

      tenantDB += ".";

      var conditions = [];
      var values = [];

      if (v.objectID) {
         conditions.push(`object = ?`);
         values.push(v.objectID);
      }

      var commonFields = ["row", "level", "username"];
      commonFields.forEach((f) => {
         if (v[f]) {
            conditions.push(`${f} = ?`);
            values.push(v[f]);
         }
      });

      if (v.startDate) {
         conditions.push(`timestamp >= ?`);
         values.push(v.startDate);
      }

      if (v.endDate) {
         conditions.push(`timestamp <= ?`);
         values.push(v.endDate);
      }
      var WHERE = "";
      if (conditions.length > 0) {
         WHERE = `WHERE ${conditions.join(" AND ")}`;
      }

      var LIMIT = "";
      if (v.limit) {
         LIMIT = `LIMIT ${v.start ? v.start : 0}, ${v.limit}`;
      }

      let sql = `SELECT username, level, record, timestamp 
                 FROM ${tenantDB}\`SITE_ROWLOG\` 
                 ${WHERE}
                 ORDER BY timestamp 
                 ${LIMIT}`;

      req.query(sql, values, (error, results /* fields */) => {
         if (error) {
            req.log("Error creating RowLog entry:", error);
            req.log(error.sql);
            reject(error);
         } else {
            resolve(results);
         }
      });
   });
};
