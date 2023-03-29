const {
  Types: { ObjectId },
} = require("mongoose");

const Contact = require("../models/contactModel");
const { AppError } = require("../utils/errorHandler");
const { catchAsync } = require("../utils/catchAsync");
const { contactsValidators } = require("../utils/validators");

/**
 * Check new contact
 */
const checkContact = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.createContactValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  const { email } = value;

  const contactExists = await Contact.exists({ email });

  if (contactExists)
    return next(new AppError(409, "Contact with this email already exists"));

  req.body = value;

  next();
});

/**
 * Check contact update
 */
const checkContactUpdate = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.updateContactValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
});

/**
 * Check contact by id
 */
const checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return next(new AppError(400, "Invalid contact id"));

  const contact = await Contact.findById(id);
  
  if (!contact)
    return next(new AppError(400, "Contact with this id not exist"));

  next();
});

module.exports = { checkContact, checkContactUpdate, checkContactId };
