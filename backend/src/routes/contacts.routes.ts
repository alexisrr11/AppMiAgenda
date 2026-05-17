import { Router } from "express";

import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} from "../controllers/contacts.controller.js";

const router = Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;