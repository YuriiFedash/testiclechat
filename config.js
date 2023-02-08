import dotenv from "dotenv";

const { parsed } = dotenv.config();

const config = {
  port: parsed.PORT,
  databaseUrl: parsed.DATABASE_URL,
  environment: parsed.ENV,
};

console.log(parsed);

export default config;
