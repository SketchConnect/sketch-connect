import { Storage } from "@google-cloud/storage";
import Multer from "multer";
import { format } from "date-fns";
import path from "path";

class ImageUploadService {
  constructor() {
    this.multer = Multer({
      storage: Multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024 // limit files to 5MB
      }
    });

    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY.replace(/\\n/g, "\n")
      }
    });

    this.bucket = storage.bucket("sketchconnect-images");
  }

  async uploadFile(req, folder) {
    return new Promise((resolve, reject) => {
      this.multer.single("img")(req, {}, async (error) => {
        if (error) {
          console.log("Multer error during upload: ", error);
          reject(error);
        } else {
          try {
            const timestamp = this.getFormattedTimestamp();
            const extension = path.extname(req.file.originalname);
            const fileName = `${timestamp}` + extension;
            const blob = this.bucket.file(`${folder}/${fileName}`);
            const blobStream = blob.createWriteStream();

            blobStream.on("error", (error) => {
              reject(error);
            });

            blobStream.on("finish", () => {
              const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`;
              resolve(publicUrl);
            });

            blobStream.end(req.file.buffer);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  getFormattedTimestamp() {
    const now = new Date();
    return format(now, "MM-dd-yyyy-HH:mm:ss:SSS");
  }
}

export default ImageUploadService;
