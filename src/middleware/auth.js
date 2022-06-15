const jwt = require('jsonwebtoken')
const { models } = require('mongoose')
const Admin = require('../models/admin')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user){
            throw new error()
        }
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth