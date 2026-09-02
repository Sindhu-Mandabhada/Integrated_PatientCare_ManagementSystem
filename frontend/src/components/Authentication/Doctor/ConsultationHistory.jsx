import React, { useEffect, useState } from "react";
import "./ConsultationHistory.css";

function ConsultationHistory() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/consultations"
      );

      const data = await response.json();

      setConsultations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultation-history-page">

      <div className="history-header">
        <h1>Consultation History</h1>
        <p>View previous patient consultations.</p>
      </div>

      {loading ? (
        <div className="history-empty">
          Loading consultations...
        </div>
      ) : consultations.length === 0 ? (
        <div className="history-empty">
          <div>🩺</div>
          <h2>No Consultation Records</h2>
          <p>No consultations have been recorded yet.</p>
        </div>
      ) : (
        <div className="consultation-list">

          {consultations.map((consultation) => (

            <div
              className="consultation-history-card"
              key={consultation.id}
            >

              <div className="history-card-header">
                <div>
                  <h2>
                    Patient ID: {consultation.pid}
                  </h2>
                  <span>
                    {consultation.consultation_date}
                  </span>
                </div>
              </div>

              <div className="history-content">

                <div>
                  <label>Symptoms</label>
                  <p>{consultation.symptoms}</p>
                </div>

                <div>
                  <label>Diagnosis</label>
                  <p>{consultation.diagnosis}</p>
                </div>

                <div>
                  <label>Doctor's Notes</label>
                  <p>
                    {consultation.notes || "No additional notes."}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default ConsultationHistory;