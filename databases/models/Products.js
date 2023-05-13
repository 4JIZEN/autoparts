export default (sequelize, DataTypes) => {
    return sequelize.define(
        "products",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            qty: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(1000),
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING(2000),
                allowNull: false,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "categories",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};
