import React, { useEffect, useState } from "react";
import "./ManageAppointments.css";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/appointments"
      );

      const data = await response.json();

      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/appointments/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        setAppointments(
          appointments.filter(
            (appointment) => appointment.id !== id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manage-appointments-page">

      <div className="manage-appointments-header">

        <div>
          <h1>Manage Appointments</h1>
          <p>Monitor all patient appointments.</p>
        </div>

        <span className="appointment-count">
          {appointments.length} Appointments
        </span>

      </div>

      {loading ? (
        <div className="appointments-admin-empty">
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (

        <div className="appointments-admin-empty">
          <div>📅</div>
          <h2>No Appointments</h2>
          <p>No appointments are currently available.</p>
        </div>

      ) : (

        <div className="appointments-admin-table-container">

          <table className="appointments-admin-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Patient ID</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr key={appointment.id}>

                  <td>{appointment.id}</td>

                  <td>
                    {appointment.pid}
                  </td>

                  <td className="appointment-doctor">
                    {appointment.doctor}
                  </td>

                  <td>
                    {appointment.date}
                  </td>

                  <td>
                    {appointment.time}
                  </td>

                  <td>
                    {appointment.reason}
                  </td>

                  <td>
                    <button
                      className="delete-appointment-btn"
                      onClick={() =>
                        deleteAppointment(
                          appointment.id
                        )
                      }
                    >
                      Delete
                    </button>
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

export default ManageAppointments;