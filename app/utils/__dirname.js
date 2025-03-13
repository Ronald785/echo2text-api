import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { platform } from "os";

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);

if (platform() === "win32") {
    __dirname = __dirname.replace(/\\/g, "/");
}

__dirname = __dirname.replace("/utils", "");

export default __dirname;
