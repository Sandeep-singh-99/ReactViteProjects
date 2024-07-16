const validate = (schema) => async (req, res, next) => {
    try {
        const pareseBody = await schema.parseAsync(req.body)
        req.body = pareseBody
        next()
    } catch (error) {
        const message = error.erros[0].message
        res.json({msg: message})
    }
}

module.exports = validate