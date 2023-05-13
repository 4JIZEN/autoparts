export default (sequelize, DataTypes) => {
    return sequelize.define(
        "categories",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "categories",
            timestamps: false,
            underscored: true,
        }
    );
};
