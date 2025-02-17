import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "/../../../public/upload/"));
	},
	filename: (req, file, cb) => {
		if (file.mimetype === "image/png") {
			cb(null, `${Date.now()}-${file.originalname}`);
		}
	},
});

const upload = multer({ storage, limits: { fileSize: 2000000 } });

export default upload;
