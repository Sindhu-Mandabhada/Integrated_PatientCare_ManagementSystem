import React, { useEffect, useState } from "react";
import "./ManagePatients.css";

function ManagePatients() {
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (pid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/patients/${pid}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        setPatients(
          patients.filter(
            (patient) => patient.pid !== pid
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.pid} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="manage-patients-page">

      <div className="manage-patients-header">

        <div>
          <h1>Manage Patients</h1>
          <p>View and manage patient records.</p>
        </div>

        <span className="patient-count">
          {patients.length} Patients
        </span>

      </div>

      <div className="patient-admin-search">

        <input
          type="text"
          placeholder="Search patient by name, ID or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {loading ? (
        <div className="patients-admin-empty">
          Loading patients...
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="patients-admin-empty">
          <div>👥</div>
          <h2>No Patients Found</h2>
          <p>No patient records are available.</p>
        </div>
      ) : (

        <div className="patients-admin-table-container">

          <table className="patients-admin-table">

            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredPatients.map((patient) => (

                <tr key={patient.pid}>

                  <td>{patient.pid}</td>

                  <td className="admin-patient-name">
                    {patient.name}
                  </td>

                  <td>{patient.age}</td>

                  <td>{patient.gender}</td>

                  <td>{patient.phone}</td>

                  <td>
                    <span className="admin-blood-group">
                      {patient.blood_group}
                    </span>
                  </td>

                  <td>
                    <button
                      className="delete-patient-btn"
                      onClick={() =>
                        deletePatient(patient.pid)
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

export default ManagePatients;