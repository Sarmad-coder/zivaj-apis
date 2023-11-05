const db = require('../models');
const dbConfig = require('../config/dbConfig.js');
const { Op } = require('sequelize');


// create main model
const Follow = db.follow;
const User = db.user;
const Reel = db.reel;

// main work




// 1.create product
const addfollow = async (req, res) => {

    try {

        let info = {
            fromUserId: req.body.fromUserId,
            toUserId: req.body.toUserId,
            follow: req.body.follow,
        }


        const nameUserFrom = await User.findOne({
            where: {
                id: info.fromUserId
            }
        })
        const nameUserTo = await User.findOne({
            where: {
                id: info.toUserId
            }
        })
        if (!nameUserFrom) {
            res.status(200).json({
                status: 'fail',
                message: 'From user not found',
            })
        }
        else if (!nameUserTo) {
            res.status(200).json({
                status: 'fail',
                status: 'To user not found',
            })
        }
        else if (nameUserFrom.id === nameUserTo.id) {
            res.status(200).json({
                status: 'fail',
                message: 'You cannot follow yourself',
            })
        }

        else {

            let getfollow = await Follow.findOne({
                where: { fromUserId: info.fromUserId, toUserId: info.toUserId }
            })


            if (getfollow) {

               
                const getUserFollow=await User.findOne({
                    where:{id:info.toUserId}
                })

                if(info.follow==='like'){


                    // const myFollow=getUserFollow?.myFollow.push(info?.fromUserId)
    
                    const newUserFollow=await User.update({myFollow:[...getUserFollow?.myFollow,info?.fromUserId]},{
                        where:{id:info.toUserId}
                    })

                // if(getUserFollow?.myFollow?.includes(info?.fromUserId) ){
                //     const myFollow=getUserFollow?.myFollow.filter(i=>i!==(info?.fromUserId))
                //     const newUserFollow=await User.update({myFollow:myFollow},{
                //         where:{id:info.toUserId}
                //     })
                //     console.log(myFollow)
                // }

                // else
                // {

                //     // const myFollow=getUserFollow?.myFollow.push(info?.fromUserId)
    
                //     const newUserFollow=await User.update({myFollow:[...getUserFollow?.myFollow,info?.fromUserId]},{
                //         where:{id:info.toUserId}
                //     })

                // }
            }

            if(info.follow==='pass'){
                const myFollow=getUserFollow?.myFollow.filter(i=>i!==(info?.fromUserId))
                    const newUserFollow=await User.update({myFollow:myFollow},{
                        where:{id:info.toUserId}
                    })
                    console.log(myFollow)
            }
            

                    const mylike = await Follow.update({ ...req.body, follow:info.follow }, {
                        where: { fromUserId: info.fromUserId, toUserId: info.toUserId }
                    }
                    )
                    res.status(200).json({
                        status: 'ok',
                        data: mylike,
                    })

            }
            else {

                const getUserFollow=await User.findOne({
                    where:{id:info.toUserId}
                })


                // const myFollow=getUserFollow?.myFollow.push(info?.fromUserId)



                const newUserFollow=await User.update({myFollow:[...getUserFollow?.myFollow,info?.fromUserId]},{
                    where:{id:info.toUserId}
                })



                const follow = await Follow.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: follow,
                })
            }


        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getfollow = async (req, res) => {

    try {
        let follows = await Follow.findAll({})
        res.status(200).json({
            status: 'ok',
            data: follows
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getfollowById = async (req, res) => {


    try {
        let id = req.params.id

        let follow = await Follow.findAll({
            include: [
                {
                    model: User,
                    as: 'userTo',
                    include: [
                        {
                            model: Reel,
                            as: 'reel'
                        },
                    ]
                },


            ],
            where: { fromUserId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: follow
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}






const getLikefollowById = async (req, res) => {


    try {
        let id = req.params.id


        const checkUser = await User.findOne({
            where: { id: id }
          });
          
          if (checkUser.gender === 'male') {
            const users = await User.findAll({
              where: {
                gender: 'female',
                status: true
              },
              include: [
                {
                  model: Follow,
                  as: 'followTo',
                  where: { fromUserId: id },
                  required: false // To perform a LEFT JOIN
                }
              ]
            });
            
            const filteredUsers = users.filter(user => !user.followTo);
            
            res.status(200).json({
              status: 'ok',
              data: filteredUsers
            });
          } else {
            const users = await User.findAll({
              where: {
                gender: 'male',
                status: true
              },
              include: [
                {
                  model: Follow,
                  as: 'followTo',
                  where: { fromUserId: id },
                  required: false // To perform a LEFT JOIN
                }
              ]
            });
          
            const filteredUsers = users.filter(user => !user.followTo);
            
            res.status(200).json({
              status: 'ok',
              data: filteredUsers
            });
          }
          
        // let follow = await Follow.findAll({
        //     include: [
        //         {
        //             model: User,
        //             as: 'userTo',
                    
        //         },


        //     ],
        //     where: { fromUserId: id,follow:'pass' }
        // })

        // res.status(200).json({
        //     status: 'ok',
        //     data: follow
        // })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}

const getmatchfollowById = async (req, res) => {


    try {
        // let id = req.params.id


        // const checkUser = await User.findOne({
        //     where: { id: id }
        //   });
          
            const users = await Follow.findAll({
              include: [
                {
                  model: User,
                  as: 'userFrom',
                 }
            ]
            });
            
            
            res.status(200).json({
              status: 'ok',
              data: users
            });
          

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getfollowUserById = async (req, res) => {


    try {
        let id = req.params.id

        let follow = await Follow.findAll({
            include: [
                {
                    model: User,
                    as: 'userFrom'
                },
            ],
            where: { toUserId: id,follow:'like' }
        })
        res.status(200).json({
            status: 'ok',
            data: follow
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}




// 4.update product

const updatefollow = async (req, res) => {

    try {
        let id = req.params.id


        let getfollow = await Follow.findOne({
            where: { id: id }
        })

        const follow = await Follow.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: follow
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletefollow = async (req, res) => {

    try {
        let id = req.params.id

        const follow = await Follow.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: follow
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addfollow,
    getfollow,
    getfollowById,
    updatefollow,
    deletefollow,
    getfollowUserById,
    getLikefollowById,
    getmatchfollowById
}

