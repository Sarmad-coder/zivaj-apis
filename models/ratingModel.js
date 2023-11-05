const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Rating=sequelize.define('rating',{
        review:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId:{
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

    return Rating

}