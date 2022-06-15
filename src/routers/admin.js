const express = require('express')
const Admin = require('../models/admin')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/admin', async (req, res) => {
    const user = new Admin(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuth()
        res.status(201).send({ user,token })

    } catch (e) {
        res.status(400).send
    }
})

module.exports = router