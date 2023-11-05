const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const AdminUsersChat=sequelize.define('adminUsersChat',{
        staffId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId:{
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
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('HH-MM-SS');
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        },
    },
    )

    return AdminUsersChat

}