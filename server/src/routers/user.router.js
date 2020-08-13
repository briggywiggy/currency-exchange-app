const express = require('express')
const router = new express.Router()
const User = require('../models/user.model')
const auth = require('../middleware/auth.middleware')
// const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

// router.get('/api/users', async (req, res) => {
//     try {
//         const email = await User.verifyIfExists(req.body.email)
//         res.status(201).send(email)
//     } catch(e) {
//         res>status(400).send(e)
//     }
// })

router.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }

})

router.post('/api/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user, token })
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/api/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/api/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/api/users/me', auth, async (req, res) => {

    res.send(req.user)

})

router.patch('/api/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/api/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        // sendCancellationEmail(req.user.email, req.user.name)
        res.status(200).send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})
module.exports = router