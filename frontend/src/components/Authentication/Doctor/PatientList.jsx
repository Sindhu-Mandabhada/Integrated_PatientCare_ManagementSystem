import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PatientList.css";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/patients"
      );

      const data = await response.json();

      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.pid} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="patient-list-page">

      <div className="patient-list-header">
        <div>
          <h1>Patient List</h1>
          <p>View all registered patients.</p>
        </div>

        <Link
          to="/doctor/dashboard"
          className="back-dashboard-btn"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="patient-search">
        <input
          type="text"
          placeholder="Search by name, ID or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="patient-loading">
          Loading patients...
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="no-patients">
          <div>👥</div>
          <h2>No Patients Found</h2>
          <p>No patient records match your search.</p>
        </div>
      ) : (
        <div className="patients-table-container">

          <table className="patients-table">

            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Blood Group</th>
              </tr>
            </thead>

            <tbody>

              {filteredPatients.map((patient) => (

                <tr key={patient.pid}>

                  <td>{patient.pid}</td>

                  <td className="patient-name">
                    {patient.name}
                  </td>

                  <td>{patient.age}</td>

                  <td>{patient.gender}</td>

                  <td>{patient.phone}</td>

                  <td>
                    <span className="blood-group">
                      {patient.blood_group}
                    </span>
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

export default PatientList;