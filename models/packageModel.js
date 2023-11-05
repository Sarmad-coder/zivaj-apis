const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Package=sequelize.define('package',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        discount:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        numberOfUser:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        message:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        calls:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
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

    return Package

}