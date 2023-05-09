import { Router } from "express";
import { hash } from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const emailRegex = new RegExp(
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

const router = new Router();

router.get("/", (req, res) => {
	res.send("hello");
});

router.post("/", async (req, res) => {
	try {
		//new user validation
		if (req.body.name.length < 3) res.status(400).send("name");
		else if (req.body.username.length < 4) res.status(400).send("username");
		else if (req.body.password.length < 8) res.status(400).send("password");
		else if (emailRegex.exec(req.body.email)[0] !== req.body.email)
			res.status(400).send("email");
		//check if email is already in use
		else if (
			(await req.db.User.findOne({ where: { email: req.body.email } })) !== null
		)
			res.status(409).send("email");
		//check if username is already in use
		else if (
			(await req.db.User.findOne({ where: { email: req.body.username } })) !==
			null
		)
			res.status(409).send("username");
		else {
			const password = await hash(req.body.password, SALT_ROUNDS);
			const user = await req.db.User.create({
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
				password,
			});
			//perform authentication things here
			res.status(200).json(user.clean());
		}
	} catch (e) {
		console.error(e);
		res.status(502).send("Failed to POST user");
	}

	res.end();
});

export default router;