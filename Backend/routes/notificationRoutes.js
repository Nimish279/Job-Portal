import express from "express";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  markAllAsRead,
  deleteAllNotifications,
} from "../controllers/notificationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteNotification);

// optional bulk routes
router.patch("/all/read", protect, markAllAsRead);
router.delete("/all", protect, deleteAllNotifications);

export default router;
