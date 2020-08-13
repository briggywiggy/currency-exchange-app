const express = require('express')
const router = new express.Router()

const fixer = require('../utils/fixer')
const exchangeratesapi = require('../utils/exchangeratesapi')

router.get('/api/forex/symbols', (req, res) => {
    const data = {
        type: 'symbols',
        test: true
    }

    exchangeratesapi(data, (error, returnData) => {
        if(error) {
            return res.status(400).send({error})
        }
        res.status(200).send(returnData)
    })
})

router.get('/api/forex/rates', (req, res) => {
    const { base } = req.query
    const data = {
        type: 'latest',
        base
    }

    exchangeratesapi(data, (error, returnData) => {
        if(error) {
            return res.status(400).send({error})
        }
        res.status(200).send(returnData)
    })
})

router.get('/api/forex/convert', (req, res) => {
    const { base, symbols } = req.query
    const data = {
        type: 'latest',
        base,
        symbols
    }

    exchangeratesapi(data, (error, returnData) => {
        if(error) {
            return res.status(400).send({error})
        }
        res.status(200).send(returnData)
    })
})

module.exports = router