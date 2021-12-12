const path = require("path");

const dotenv = require("dotenv");
if (process.env.NODE_ENV) {
    dotenv.config({
        path: path.resolve(`.env.${process.env.NODE_ENV}`),
    });
} else {
    dotenv.config(); // will load all environment variable from the .env file, and put it inside the process.env variable
}

mongo_url =
    (process.env.MONGO_PROTOCOL ? process.env.MONGO_PROTOCOL : "mongodb://") +
    (process.env.MONGO_USERNAME ? `${process.env.MONGO_USERNAME}:` : "") +
    (process.env.MONGO_PASSWORD ? `${process.env.MONGO_PASSWORD}` : "") +
    (process.env.MONGO_DOMAIN_NAME
        ? `${process.env.MONGO_DOMAIN_NAME}/`
        : "localhost/") +
    (process.env.DATABASE_NAME ? process.env.DATABASE_NAME : "test");

module.exports = {
    port: process.env._SERVER_PORT_NUMBER_ || 5000,
    database: {
        mongodb: {
            uri: mongo_url,
        },
        mysql: {
            uri: "",
        },
    },
    keys: {
        google: {
            clientID: process.env.GOOGLE_PLUS_CLIENT_ID,
            clientSecret: process.env.GOOGLE_PLUS_SECRET,
        },
        session: {
            cookieKey: "WzA9bW8Fwb0XwnAp1TG4dHx3R3wkgTx3gX0hIXK2YBPkOdyDU4vXAR",
        },
    },
};
