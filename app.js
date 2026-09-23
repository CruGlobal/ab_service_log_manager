//
// log_manager
// (AppBuilder) A log manager for various AB operations
//
const AB = require("@digiserve/ab-utils");
const { version } = require("./package");
// Use sentry by default, but can override with env.TELEMETRY_PROVIDER
if (AB.defaults.env("TELEMETRY_PROVIDER", "sentry") == "sentry") {
   AB.telemetry.init("sentry", {
      dsn: AB.defaults.env(
         "SENTRY_DSN",
         "https://2c6d39a4a232e87591840bcf3d8ca948@o144358.ingest.sentry.io/4505945305120768",
      ),
      release: version,
   });
}

const controller = AB.controller("log_manager");
// controller.afterStartup((cb)=>{ return cb(/* err */) });
// controller.beforeShutdown((cb)=>{ return cb(/* err */) });
controller.init();
