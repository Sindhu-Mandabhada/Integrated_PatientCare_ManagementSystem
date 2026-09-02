import React from "react";
import "./DashboardCard.css";

function DashboardCard({
  title,
  value,
  icon,
  description,
  onClick
}) {
  return (
    <div
      className={`dashboard-card ${onClick ? "clickable" : ""}`}
      onClick={onClick}
    >
      <div className="dashboard-card-top">
        <div className="dashboard-card-icon">
          {icon}
        </div>

        <div className="dashboard-card-content">
          <h3>{title}</h3>
          <h2>{value}</h2>

          {description && (
            <p>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;