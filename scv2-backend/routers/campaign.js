const express = require('express')
const Campaign = require('../models/campaign')
const router = new express.Router()

router.get('/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find({completed: false})
        res.send(campaigns)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/empty', async (req, res) => {
    res.send()
})

router.post('/campaign', async (req, res) => {
    const { address } = req.body
    try {
        const campaign = await Campaign.findOne({address})
        res.send(campaign)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/create', async (req, res) => {
    const campaign = new Campaign(req.body)
    console.log(req.body)
  
    try {
        await campaign.save()
        res.status(201).send(campaign)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router