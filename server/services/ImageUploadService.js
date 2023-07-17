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
        private_key: Buffer.from(
          process.env.GCLOUD_PRIVATE_KEY,
          "base64"
        ).toString("ascii")
      }
    });

    this.bucket = storage.bucket("sketchconnect-images");
  }

  async uploadFile(req) {
    return new Promise((resolve, reject) => {
      this.multer.single("img")(req, {}, async (error) => {
        if (error) {
          console.log("Multer error during upload: ", error);
          reject(error);
        } else {
          try {
            const extension = path.extname(req.file.originalname);
            const quadrantNumber = req.body.quadrantNumber;
            let folder = "";
            let fileName = "";

            if (req.body.folder === "drawings/quadrants") {
              folder = `${req.body.folder}/${req.params.id}`;
              fileName = `${quadrantNumber}` + extension;
            } else {
              folder = req.body.folder;
              fileName = `${req.params.id}` + extension;
            }

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
}

export default ImageUploadService;
