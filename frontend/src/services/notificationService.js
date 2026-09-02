import { apiRequest } from "./api";

export const getNotifications = async () => {
  return await apiRequest("/notifications");
};

export const markNotificationAsRead = async (
  notificationId
) => {
  return await apiRequest(
    `/notifications/${notificationId}/read`,
    {
      method: "PUT",
    }
  );
};

export const deleteNotification = async (
  notificationId
) => {
  return await apiRequest(
    `/notifications/${notificationId}`,
    {
      method: "DELETE",
    }
  );
};