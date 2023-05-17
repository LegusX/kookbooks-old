import { Router } from "express";
import fileUpload from "express-fileupload";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";

const router = new Router();

//eventually increase file cap for paying users?
router.use(
	fileUpload({
		limits: { fileSize: 10 * 1024 * 1024 },
		safeFileNames: true,
		preserveExtension: true,
		abortOnLimit: true,
	})
);

//create new image
router.post("/", (req, res) => {
	if (!req.files.thumbnail) return res.status(400).end();
	else {
		try {
			const file = req.files.thumbnail;

			const image = new req.db.Image({
				user: req.user._id,
			});
			convertAndWrite(file.data, image.id);
			image.save();
			res.status(201).send(image.id);
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	}
});

export default router;

function convertAndWrite(buffer, id) {
	//convert buffer to stream
	const stream = Readable.from(buffer);

	ffmpeg().input(stream).saveToFile(`./public/images/${id}.webp`);
}
