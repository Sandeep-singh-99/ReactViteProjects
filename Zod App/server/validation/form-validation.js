const z = require("zod");
// import Form from '../models/form-models';

const formValidation = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits") // Accept as string
    .transform((val) => Number(val)), // Convert to number
  message: z.string().min(1),
  date: z
    .string() // Accept date as a string
    .transform((val) => new Date(val)), // Convert to Date object
  description: z.string().min(1).max(100),
});

// Function to validate data using zod

const validateFormData = (data) => {
  try {
    return formValidation.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      throw new Error("Validation failed");
    }
    throw error;
  }
};

// const createForm = async (data) => {
//     const validateData = validateFormData(data)
//     const form = new Form(validateData)
//     await form.save()
//     return form
// }

module.exports = { validateFormData };
