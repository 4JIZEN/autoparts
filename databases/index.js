import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

import ModelUsers from "./models/Users";
import ModelCategories from "./models/Categories";
import ModelProducts from "./models/Products";
import ModelOrders from "./models/Orders";
import ModelCarts from "./models/Carts";
import ModelOrderProds from "./models/OrderProds";
import ModelClaims from "./models/Claims";

const Users = ModelUsers(sequelize, DataTypes);
const Categories = ModelCategories(sequelize, DataTypes);
const Products = ModelProducts(sequelize, DataTypes);
const Orders = ModelOrders(sequelize, DataTypes);
const Carts = ModelCarts(sequelize, DataTypes);
const OrderProds = ModelOrderProds(sequelize, DataTypes);
const Claims = ModelClaims(sequelize, DataTypes);

export { Users, Categories, Products, Orders, Carts, OrderProds, Claims };
