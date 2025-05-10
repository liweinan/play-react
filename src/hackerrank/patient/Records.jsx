import React from "react";
import medical_records from "./medicalRecords";

function Records({ id, setId }) {
    const currentPatient = medical_records.find((record) => record.id === id);
    const patientData = currentPatient?.data[0];
    const records = currentPatient?.data;

    const handleNext = () => {
        const currentIndex = medical_records.findIndex((record) => record.id === id);
        const nextIndex = (currentIndex + 1) % medical_records.length;
        setId(medical_records[nextIndex].id);
    };

    // Format date to MM/DD/YYYY
    const formatDate = (timestamp) =>
        new Date(timestamp).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });

    if (!patientData) return null;

    return (
        <div className="patient-profile-container" id="profile-view">
            <div className="layout-row justify-content-center">
                <div id="patient-profile" data-testid="patient-profile" className="mx-auto">
                    <h4 id="patient-name">{patientData.userName}</h4>
                    <h5 id="patient-dob">DOB: {patientData.userDob}</h5>
                    <h5 id="patient-height">Height: {patientData.meta.height} cm</h5>
                </div>
                <button
                    className="mt-10 mr-10"
                    data-testid="next-btn"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>

            <table id="patient-records-table">
                <thead id="table-header">
                <tr>
                    <th>SL</th>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Weight</th>
                    <th>Doctor</th>
                </tr>
                </thead>
                <tbody id="table-body" data-testid="patient-table">
                {records.map((record, index) => (
                    <tr key={record.id}>
                        <td>{index + 1}</td>
                        <td>{formatDate(record.timestamp)}</td>
                        <td>{record.diagnosis.name}</td>
                        <td>{record.meta.weight}</td>
                        <td>{record.doctor.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Records;
