import React from "react";
import medical_records from "./medicalRecords";

function Search({ setRecord, setId, id }) {
    const handleShow = () => {
        if (!id || id === "0") {
            alert("Please select a patient name");
            return;
        }
        setRecord(true);
    };

    const handleSelectChange = (e) => {
        setId(e.target.value);
    };

    return (
        <div className="layout-row align-items-baseline select-form-container">
            <div className="select">
                <select
                    data-testid="patient-name"
                    value={id || "0"}
                    onChange={handleSelectChange}
                >
                    <option value="0" disabled>
                        Select Patient
                    </option>
                    {medical_records.map((record) => (
                        <option key={record.id} value={record.id}>
                            {record.data[0].userName}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                data-testid="show"
                onClick={handleShow}
            >
                Show
            </button>
        </div>
    );
}

export default Search;
