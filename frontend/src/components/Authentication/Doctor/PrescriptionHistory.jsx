import React, { useEffect, useState } from "react";
import "./PrescriptionHistory.css";

function PrescriptionHistory() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/prescriptions"
      );

      const data = await response.json();

      setPrescriptions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prescription-history-page">

      <div className="prescription-history-header">
        <h1>Prescription History</h1>
        <p>View previously issued prescriptions.</p>
      </div>

      {loading ? (
        <div className="prescription-empty">
          Loading prescriptions...
        </div>
      ) : prescriptions.length === 0 ? (

        <div className="prescription-empty">
          <div>💊</div>
          <h2>No Prescriptions</h2>
          <p>
            No prescription records have been created yet.
          </p>
        </div>

      ) : (

        <div className="prescription-list">

          {prescriptions.map((prescription) => (

            <div
              className="prescription-history-card"
              key={prescription.id}
            >

              <div className="prescription-card-header">

                <div>
                  <h2>
                    Patient ID: {prescription.pid}
                  </h2>

                  <span>
                    {prescription.date ||
                      prescription.prescription_date ||
                      "Date not available"}
                  </span>
                </div>

                <div className="medicine-icon">
                  💊
                </div>

              </div>

              <div className="prescription-details">

                <div>
                  <label>Medicine</label>
                  <strong>
                    {prescription.medicine}
                  </strong>
                </div>

                <div>
                  <label>Dosage</label>
                  <strong>
                    {prescription.dosage}
                  </strong>
                </div>

                <div>
                  <label>Frequency</label>
                  <strong>
                    {prescription.frequency}
                  </strong>
                </div>

                <div>
                  <label>Duration</label>
                  <strong>
                    {prescription.duration}
                  </strong>
                </div>

              </div>

              <div className="prescription-instructions">

                <label>Instructions</label>

                <p>
                  {prescription.instructions ||
                    "No additional instructions."}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default PrescriptionHistory;