/*
 * log_manager
 */
import AB from "@digiserve/ab-utils";

const env = AB.defaults.env;

export default {
   log_manager: {
      /*************************************************************************/
      /* enable: {bool} is this service active?                                */
      /*************************************************************************/
      enable: env("LOG_MANAGER_ENABLE", true),

      sentry: env("SENTRY_CONFIG", {
         dns: env("SENTRY_DNS", "sentry.url.here"),
         tracesSampleRate: env("SENTRY_SAMPLE_RATE", 1.0),
         serverName: env("SENTRY_SERVER_NAME", "AppBuilder"),
      }),
   },

   /**
    * datastores:
    * Sails style DB connection settings
    */
   datastores: AB.defaults.datastores(),
};
