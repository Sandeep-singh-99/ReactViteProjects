const Form = require('../models/form-models.js')
const { validateFormData } = require('../validation/form-validation.js');


const addForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, date, description } =
      req.body;

    const user = await Form.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const validatedData = validateFormData({firstName, lastName, email, phone, message, date, description});

    const form = await Form.create(validatedData);

    
    res.status(200).json({
        message: "Form added successfully",
        success: true,
        data: form
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const viewForm = async (req, res) => {
    try {
        const viweAllForm = await Form.find()

        if (!viweAllForm) {
            return res.status(400).json({
                message: "No form found",
                success: false
            })
        }

        res.status(200).json({
            message: "All form",
            success: true,
            data: viweAllForm
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    addForm,
    viewForm
}
