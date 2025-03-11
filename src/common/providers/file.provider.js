import multer from "multer";
import { join } from "path";

class FileProvider {
  constructor() {
    this.client = multer({
      dest: join(process.cwd(), "public/images"),
      limits: { fileSize: 12000000 }, // 12MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          cb(null, true);
        } else {
          cb(new Error("Only JPG and PNG format allowed"), false);
        }
      },
    });
  }

  uploadFile(file) {
    return this.client.single(file);
  }

  uploadFiles(files) {
    return this.client.array(files);
  }
}

const FileProviderService = new FileProvider();

export default FileProviderService;
