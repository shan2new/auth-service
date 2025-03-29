import SuperTokens from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";

SuperTokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI || "http://localhost:3567",
  },
  appInfo: {
    appName: "Anime Tracker",
    apiDomain: process.env.API_DOMAIN || "http://localhost:3001",
    websiteDomain: process.env.WEBSITE_DOMAIN || "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    Session.init({
      cookieDomain: ".animetracker.xyz",  
      cookieSameSite: "none",
      cookieSecure: true,     
    }),
  ],
});