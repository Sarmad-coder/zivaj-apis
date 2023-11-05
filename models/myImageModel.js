const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const MyImage=sequelize.define('myImage',{
        image:{
            type: DataTypes.TEXT, // or DataTypes.STRING
            defaultValue: '[]',
            allowNull: true,
            get() {
                const value = this.getDataValue('image');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue('image', JSON.stringify(value));
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

    return MyImage

}