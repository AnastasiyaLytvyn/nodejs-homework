const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

/**
 * Get contacts list
 */
const listContacts = async (req, res, next) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    res.status(200).json({
      contacts,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
/**
 * Get contacts by id
 */
const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = contacts.find((item) => item.id === id);
    // console.log(contact);

    res.status(200).json({
      contact,
    });
  } catch (err) {
    next(err);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
