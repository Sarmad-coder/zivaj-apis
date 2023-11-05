const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Follow=sequelize.define('follow',{
        toUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        follow:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fromUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
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

    return Follow

}