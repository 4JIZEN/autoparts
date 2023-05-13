import { hash } from "bcrypt";
import { Admin } from "../../../databases";

export default async function handler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send("Missing username or password");
    }

    const user = await Admin.findOne({
        where: { email },
    });

    if (!user || !(await compare(password, user.password))) {
        res.status(400).send("Missing username or password");
    }

    res.status(200).json(user);
}
