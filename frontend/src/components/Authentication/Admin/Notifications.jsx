import React, { useEffect, useState } from "react";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/notifications"
      );

      const data = await response.json();

      setNotifications(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Error fetching notifications:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this notification?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/notifications/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        setNotifications(
          notifications.filter(
            (notification) =>
              notification.id !== id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="notifications-page">

      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>
            Manage system notifications and alerts.
          </p>
        </div>

        <span className="notification-count">
          {notifications.length}
        </span>
      </div>

      {loading ? (
        <div className="notifications-empty">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (

        <div className="notifications-empty">
          <div>🔔</div>
          <h2>No Notifications</h2>
          <p>There are no system notifications.</p>
        </div>

      ) : (

        <div className="notification-list">

          {notifications.map((notification) => (

            <div
              className="notification-card"
              key={notification.id}
            >

              <div className="notification-icon">
                🔔
              </div>

              <div className="notification-content">

                <h3>
                  {notification.title ||
                    "System Notification"}
                </h3>

                <p>
                  {notification.message ||
                    notification.content ||
                    "No message available."}
                </p>

                <span>
                  {notification.created_at ||
                    notification.timestamp ||
                    ""}
                </span>

              </div>

              <button
                className="delete-notification-btn"
                onClick={() =>
                  deleteNotification(
                    notification.id
                  )
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Notifications;