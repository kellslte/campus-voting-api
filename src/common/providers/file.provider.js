import multer from "multer";
import { join } from "path";
import { generateFullPhotoUrl } from "../../lib/utils.js";

class FileProvider {
  constructor() {
    this.client = multer({
      storage: multer.diskStorage({
        destination: join(process.cwd(), "public/images"),
        filename: (req, file, cb) => {
          const ext = file.mimetype === "image/jpeg" ? ".jpg" : ".png";
          cb(null, file.fieldname + "-" + Date.now() + ext);
        }
      }),
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
    return (req, res, next) => {
      this.client.single(file)(req, res, (err) => {
        if (err) return next(err);
        if (!req.file) return next(new Error("No file uploaded"));
        req.body.photo = generateFullPhotoUrl(req);
        next();
      });
    };
  }

  uploadFiles(files) {
    return (req, res, next) => {
      this.client.array(files)(req, res, (err) => {
        if (err) return next(err);
        if (!req.files) return next(new Error("No files uploaded"));
        next();
      });
    };
  }
}

const FileProviderService = new FileProvider();

export default FileProviderService;
