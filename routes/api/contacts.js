const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
<<<<<<< HEAD
  favoriteContact,
  updateContact,
} = require("../../controllers/contacts");

const { checkContact, checkContactId } = require("../../middlewares/contacts");

router.route("/").get(listContacts).post(checkContact, addContact);

router
  .route("/:id")
  .get(checkContactId, getContactById)
  .put(checkContactId, updateContact)
  .delete(removeContact);

router.route("/:id/favorite").patch(favoriteContact);

=======
  updateContact,
} = require("../../models/contacts");


router.route("/")
    .get(listContacts)
    .post(addContact);

router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(removeContact);

>>>>>>> d9b914df5906d3e03c7a15dd38331283879d5380
module.exports = router;
