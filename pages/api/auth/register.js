import { hash } from "bcrypt";
import { Users } from "../../../databases";

export default async function handler(req, res) {
    const { firstname, lastname, phone, address, email, password } = req.body;

    const exists = await Users.findOne({
        where: { email },
    });

    if (exists) {
        res.status(400).send("User already exists");
    } else {
        const user = await Users.create({
            firstname,
            lastname,
            phone,
            address,
            email,
            password: await hash(password, 10),
        });
        res.status(200).json(user);
    }
}
