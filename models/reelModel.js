const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Reel=sequelize.define('reel',{
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        myLike: {
            type: DataTypes.STRING, // or DataTypes.STRING
            defaultValue: '[]',
            get() {
              const value = this.getDataValue('myLike');
              return value ? JSON.parse(value) : [];
            },
            set(value) {
              this.setDataValue('myLike', JSON.stringify(value));
            }
        },
        myDislike: {
            type: DataTypes.STRING, // or DataTypes.STRING
            defaultValue: '[]',
            get() {
              const value = this.getDataValue('myDislike');
              return value ? JSON.parse(value) : [];
            },
            set(value) {
              this.setDataValue('myDislike', JSON.stringify(value));
            }
        },
        about:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:{
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

    return Reel

}