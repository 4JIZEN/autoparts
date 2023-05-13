import { hash } from "bcrypt";
import { Users } from "../../../databases";

export default async function handler(req, res) {
    const { firstname, lastname, phone, address, email, password } = req.body;

    const exists = await Users.findOne({
        where: { email },
    });

    if (exists) {
        const updateData = !password
            ? {
                  firstname,
                  lastname,
                  phone,
                  address,
                  email,
              }
            : {
                  firstname,
                  lastname,
                  phone,
                  address,
                  email,
                  password: await hash(password, 10),
              };
        const user = await Users.update(updateData, {
            where: {
                email: email,
            },
        });
        res.status(200).json(user);
    } else {
        res.status(400).send("User not exists");
    }
}
