const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, 'models', 'contacts.json');

const listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

const getContactById = async (contactId) => {};

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
