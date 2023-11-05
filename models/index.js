const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            idle: dbConfig.pool.idle,
            acquire: dbConfig.pool.acquire,
        }
    }
)


sequelize.authenticate().then(() => {
    console.log('Connected to database')
    console.log('Creating tables')
}).catch((err) => {
    console.log(err)
})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.user = require('./userModel.js')(sequelize, DataTypes)
db.package = require('./packageModel.js')(sequelize, DataTypes)
db.preferences = require('./preferencesModel.js')(sequelize, DataTypes)
db.staff = require('./staffModel.js')(sequelize, DataTypes)
db.reel = require('./reelModel.js')(sequelize, DataTypes)
db.like = require('./likeModel.js')(sequelize, DataTypes)
db.comment = require('./commentModel.js')(sequelize, DataTypes)
db.follow = require('./followModel.js')(sequelize, DataTypes)
db.profile = require('./profileModel.js')(sequelize, DataTypes)
db.usersChat = require('./usersChatModel.js')(sequelize, DataTypes)
db.earning = require('./earningModel.js')(sequelize, DataTypes)
db.myImage = require('./myImageModel.js')(sequelize, DataTypes)
db.rating = require('./ratingModel.js')(sequelize, DataTypes)
db.adminUsersChat = require('./adminUsersChatModel.js')(sequelize, DataTypes)
db.room = require('./roomModel.js')(sequelize, DataTypes)
db.transaction = require('./transactionModel.js')(sequelize, DataTypes)
db.stripeKey = require('./stripeKeyModel.js')(sequelize, DataTypes)



db.sequelize.sync({ force: false }).then(() => {
    console.log('Yes Re-Sync Complete')
})



// post to many relationship





db.staff.hasMany(db.adminUsersChat, {
    foreignKey: 'staffId',
    as: 'adminUsersChat',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.adminUsersChat.belongsTo(db.staff, {
    foreignKey: 'staffId',
    as: 'profile',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



db.user.hasMany(db.transaction, {
    foreignKey: 'userId',
    as: 'transaction',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.transaction.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



db.user.hasMany(db.adminUsersChat, {
    foreignKey: 'userId',
    as: 'adminUsersChat',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.adminUsersChat.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})











db.user.hasMany(db.rating, {
    foreignKey: 'userId',
    as: 'rating',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.rating.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.package.hasMany(db.user, {
    foreignKey: 'packageId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.user.belongsTo(db.package, {
    foreignKey: 'packageId',
    as: 'package',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.user.hasMany(db.preferences, {
    foreignKey: 'userId',
    as: 'preferences',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.preferences.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.user.hasMany(db.reel, {
    foreignKey: 'userId',
    as: 'reel',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.reel.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.user.hasMany(db.like, {
    foreignKey: 'userId',
    as: 'like',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.like.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.reel.hasMany(db.like, {
    foreignKey: 'reelId',
    as: 'like',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.like.belongsTo(db.reel, {
    foreignKey: 'reelId',
    as: 'reel',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.user.hasMany(db.comment, {
    foreignKey: 'userId',
    as: 'comment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.comment.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.reel.hasMany(db.comment, {
    foreignKey: 'reelId',
    as: 'comment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.comment.belongsTo(db.reel, {
    foreignKey: 'reelId',
    as: 'reel',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})






// post to many relationship

db.user.hasMany(db.follow, {
    foreignKey: 'fromUserId',
    as: 'followFrom',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.follow.belongsTo(db.user, {
    foreignKey: 'fromUserId',
    as: 'userFrom',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})





// post to many relationship

db.user.hasMany(db.follow, {
    foreignKey: 'toUserId',
    as: 'followTo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.follow.belongsTo(db.user, {
    foreignKey: 'toUserId',
    as: 'userTo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})






// post to many relationship

db.user.hasMany(db.usersChat, {
    foreignKey: 'fromUserId',
    as: 'usersChatFrom',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.usersChat.belongsTo(db.user, {
    foreignKey: 'fromUserId',
    as: 'userFrom',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




// post to many relationship

db.user.hasMany(db.usersChat, {
    foreignKey: 'toUserId',
    as: 'usersChatTo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.usersChat.belongsTo(db.user, {
    foreignKey: 'toUserId',
    as: 'userTo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})







module.exports = db