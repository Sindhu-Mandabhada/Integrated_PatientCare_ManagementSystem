import React, { useEffect, useState } from "react";
import "./MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/appointments"
      );

      const data = await response.json();

      const patientAppointments = data.filter(
        (appointment) =>
          appointment.pid === user?.pid
      );

      setAppointments(patientAppointments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

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

  if (loading) {
    return (
      <div className="appointments-loading">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="appointments-page">

      <div className="appointments-header">
        <div>
          <h1>My Appointments</h1>
          <p>View and manage your appointments.</p>
        </div>
      </div>

      {appointments.length === 0 ? (

        <div className="no-appointments">
          <div className="no-appointment-icon">📅</div>
          <h2>No Appointments</h2>
          <p>You don't have any appointments yet.</p>
        </div>

      ) : (

        <div className="appointments-list">

          {appointments.map((appointment) => (

            <div
              className="appointment-card"
              key={appointment.id}
            >

              <div className="appointment-info">

                <h2>
                  {appointment.doctor}
                </h2>

                <p>
                  <strong>Date:</strong>{" "}
                  {appointment.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {appointment.time}
                </p>

                <p>
                  <strong>Reason:</strong>{" "}
                  {appointment.reason}
                </p>

              </div>

              <button
                className="cancel-btn"
                onClick={() =>
                  cancelAppointment(appointment.id)
                }
              >
                Cancel Appointment
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyAppointments;