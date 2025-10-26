//  export const JWT_SECRET="1E3HUH9JVR40"

import dotenv from "dotenv";
import path from "path";

// load root-level .env
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const JWT_SECRET = process.env.JWT_SECRET!;