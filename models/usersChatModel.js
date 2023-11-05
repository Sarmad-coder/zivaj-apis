const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const UsersChat=sequelize.define('usersChat',{
        toUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fromUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sendBy:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        time:{
            type: DataTypes.TIME,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    )

    return UsersChat

}