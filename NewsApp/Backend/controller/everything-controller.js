require('dotenv').config()
const axios = require('axios')
const getAll = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/everything`, {
            params: {
                q: "technology",
                apiKey: process.env.API_KEY
            }
        })
        res.json(response.data.articles)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {getAll}