const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const StripeKey=sequelize.define('stripeKey',{
        publishKey:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        secretKey:{
            type: DataTypes.STRING,
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

    return StripeKey

}