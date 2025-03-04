const { catchAsync } = require("../utils/catchAsync");
const Contact = require("../models/contactModel");

/**
 * Get contacts list
 */
const getContacts = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  //check favorites
  const filter = { owner: _id };

  if (favorite === "true") {
    filter.favorite = true;
  } else if (favorite === "false") {
    filter.favorite = false;
  }
  //pagination
  const contacts = await Contact.find(filter)
    .limit(limit)
    .skip(skip)
    .populate("owner", "id email subscription");

  res.status(200).json({
    total: contacts.length,
    contacts,
  });
});

/**
 * Get contact by id
 */
const getContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  res.status(200).json({ contact });
});

/**
 * Create contact
 */
const addContact = catchAsync(async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { _id } = req.user;

  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });

  res.status(201).json({ contact: newContact });
});

/**
 * Update contact
 */
const updateContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const updateContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  );

  res.status(200).json({ updateContact });
});

/**
 * Favorite contact
 */
const favoriteContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const updateContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  res.status(200).json({ updateContact });
});

/**
 * Delete contact
 */
const removeContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.status(200).json({ id });
});

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  favoriteContact,
  removeContact,
};
