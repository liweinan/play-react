import React, { useState } from "react";
// import "./App.css";
// import "h8k-components";
import Search from "./Search";
import Records from "./Records";

const title = "Patient Medical Records";

const App = () => {
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [showRecords, setShowRecords] = useState(false);

    return (
        <div className="forms-container">
            {/*<h8k-navbar header={title}></h8k-navbar>*/}
            <h1>{title}</h1>
            <div className="content">
                <Search
                    setRecord={setShowRecords}
                    setId={setSelectedPatientId}
                    id={selectedPatientId}
                />
                {showRecords && <Records id={selectedPatientId} setId={setSelectedPatientId} />}
            </div>
        </div>
    );
};

export default App;
