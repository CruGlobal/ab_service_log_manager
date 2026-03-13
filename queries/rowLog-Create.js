// rowLog-Create.sql
// Insert a row into the AB_RowLog table
import { v4 as uuidv4 } from "uuid";

export default function (req, v) {
   return new Promise((resolve, reject) => {
      let tenantDB = req.queryTenantDB(reject);
      if (!tenantDB) {
         return;
      }

      tenantDB += ".";

      var id = v["uuid"] ?? uuidv4();

      var fieldOrder = [
         "username",
         "usernameReal",
         "record",
         "level",
         "row",
         "object",
      ];
      // {array}
      // The order of the fields in the DB.  This is the order they must
      // appear in the values[].

      var values = [];
      // {array}
      // The insert data in the proper field order.

      var placeholders = [];
      // {array}  [ ?, ?, ... , ?]
      // The corresponding sql placeholder array for each field in fieldOrder.
      // There should be a "?" for each field in fieldOrder.

      // order the values:
      fieldOrder.forEach((f) => {
         values.push(v[f]);
         placeholders.push("?");
      });

      let sql = `INSERT INTO ${tenantDB}\`SITE_ROWLOG\` ( uuid, created_at, updated_at, properties, timestamp, ${fieldOrder.join(
         ", ",
      )})
      			  VALUES ("${id}", NOW(), NULL, NULL, NOW(), ${placeholders.join(
         ", ",
      )} );`;

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
}
