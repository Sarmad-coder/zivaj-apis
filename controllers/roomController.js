const db = require('../models');
const { compareSync } = require('bcrypt')
const { sign }=require('jsonwebtoken')
const dbConfig = require('../config/dbConfig.js')

const Room = db.room;



exports.createRoom = async (req, res) => {
    try {
      const { name } = req.body;
      const room = await Room.create({ name });
      res.status(200).json({
        status: 'ok',
        data: room
    })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the room.' });
    }
  };

