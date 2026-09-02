import React, { useEffect, useState } from "react";
import "./AuditLogs.css";

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/audit-logs"
      );

      const data = await response.json();

      setLogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audit-logs-page">

      <div className="audit-header">
        <h1>Audit Logs</h1>
        <p>
          Monitor system activity and administrative actions.
        </p>
      </div>

      {loading ? (
        <div className="audit-empty">
          Loading audit logs...
        </div>
      ) : logs.length === 0 ? (

        <div className="audit-empty">
          <div>📋</div>
          <h2>No Audit Logs</h2>
          <p>No system activity has been recorded.</p>
        </div>

      ) : (

        <div className="audit-table-container">

          <table className="audit-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>

              {logs.map((log) => (

                <tr key={log.id}>

                  <td>{log.id}</td>

                  <td>
                    {log.user ||
                      log.username ||
                      "Unknown"}
                  </td>

                  <td>
                    <span className="audit-action">
                      {log.action || "-"}
                    </span>
                  </td>

                  <td>
                    {log.details || "-"}
                  </td>

                  <td>
                    {log.timestamp ||
                      log.created_at ||
                      "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default AuditLogs;