import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()

const redis = new Redis(process.env.Upstash_URI);
export default redis