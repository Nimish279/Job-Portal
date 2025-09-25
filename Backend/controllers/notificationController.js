import { Notification } from "../models/Notification.js";
import { timeAgo } from "../utils/timeAgo.js";

export const getNotifications = async (req, res) => {
  try {
    const { _id, role } = req.user;

    const notifications = await Notification.find({
      recipient: _id,
      recipientModel: role === "Seeker" ? "User" : "Recruiter",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notifications.length,
      notifications: notifications.map((n) => ({
        _id: n._id,
        message: n.message,
        type: n.type,
        isRead: n.isRead,
        createdAt: n.createdAt,
        timeAgo: timeAgo(n.createdAt),
      })),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ success: false, error: "Notification not found" });
    }
    res.json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Notification not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// OPTIONAL: mark all read
export const markAllAsRead = async (req, res) => {
  try {
    const { _id, role } = req.user;
    await Notification.updateMany(
      { recipient: _id, recipientModel: role === "Seeker" ? "User" : "Recruiter" },
      { isRead: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// OPTIONAL: delete all
export const deleteAllNotifications = async (req, res) => {
  try {
    const { _id, role } = req.user;
    await Notification.deleteMany({
      recipient: _id,
      recipientModel: role === "Seeker" ? "User" : "Recruiter",
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
