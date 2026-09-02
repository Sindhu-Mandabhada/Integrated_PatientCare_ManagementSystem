import React, { useEffect, useState } from "react";
import "./ManageDoctors.css";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/doctors"
      );

      const data = await response.json();

      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/doctors/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        setDoctors(
          doctors.filter(
            (doctor) =>
              doctor.id !== id && doctor.did !== id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.did || ""} ${doctor.specialization || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="manage-doctors-page">

      <div className="manage-doctors-header">
        <div>
          <h1>Manage Doctors</h1>
          <p>View and manage doctor accounts.</p>
        </div>

        <span className="doctor-count">
          {doctors.length} Doctors
        </span>
      </div>

      <div className="doctor-search">
        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="doctor-empty">
          Loading doctors...
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="doctor-empty">
          <div>👨‍⚕️</div>
          <h2>No Doctors Found</h2>
          <p>No doctor records are available.</p>
        </div>
      ) : (
        <div className="doctors-table-container">

          <table className="doctors-table">

            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredDoctors.map((doctor) => (

                <tr key={doctor.id || doctor.did}>

                  <td>
                    {doctor.did || doctor.id || "-"}
                  </td>

                  <td className="doctor-name">
                    {doctor.name || "-"}
                  </td>

                  <td>
                    {doctor.specialization || "-"}
                  </td>

                  <td>
                    {doctor.phone || "-"}
                  </td>

                  <td>
                    {doctor.email || "-"}
                  </td>

                  <td>
                    <button
                      className="delete-doctor-btn"
                      onClick={() =>
                        deleteDoctor(
                          doctor.id || doctor.did
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

export default ManageDoctors;