const express = require("express")
const authorization = require("../utilities")
const noteConrollers = require("../controllers/notes")
const router = express.Router()

router.post("/add-note",authorization.authorize,noteConrollers.postAddNote)
router.put("/edit-note/:noteId",authorization.authorize,noteConrollers.editNote)
router.get("/get-notes",authorization.authorize,noteConrollers.getNotes)
router.delete("/delete-note/:noteId",authorization.authorize,noteConrollers.deleteNote)
router.put("/update-note-pinned/:noteId",authorization.authorize,noteConrollers.updatepinNote)
router.get("/search-notes",authorization.authorize,noteConrollers.searchNote)

module.exports = router