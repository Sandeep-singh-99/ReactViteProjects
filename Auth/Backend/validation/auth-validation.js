const z = require("zod");

const authValidation = z.object({
  name: z.string().max(100).min(7),
  email: z.string().email(),
  password: z.string().max(100).min(5),
});

const authValidationSchema = (req, res, next) => {
    try {
        authValidation.parse(req.body)
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = authValidationSchema
