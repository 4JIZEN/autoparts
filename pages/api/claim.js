import _ from "lodash";
import { Claims } from "../../databases/";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            if (_.isEmpty(req.query)) {
                const data = await Claims.findAll();
                res.json(data);
            } else {
                const data = await Claims.findOne({
                    where: req.query,
                });
                res.json(data);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "POST") {
        try {
            if (!req.body) {
                return res.status(400).json({ error: "Data is required" });
            }
            const data = await Claims.create(req.body);
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "PUT") {
        try {
            const { id } = req.query;
            if (!req.body) {
                return res.status(400).json({ error: "Data is required" });
            }
            await Claims.update(req.body, {
                where: {
                    id,
                },
            });

            res.json({ message: "Updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "DELETE") {
        try {
            const { id } = req.query;
            await Claims.destroy({
                where: {
                    id,
                },
            });
            res.json({ message: "Deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(500).json({ error: "Internal server error" });
    }
}
