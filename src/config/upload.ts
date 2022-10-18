import multer from "multer";
import path from "path";
import crypto from "crypto"

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default {
    directory: uploadFolder,
    storage: {
        filename: crypto.randomBytes(10).toString("hex"),
    }
}