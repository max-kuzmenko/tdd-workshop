import React, { useState } from "react";
import SuccessScreen from "./success-screen/success-screen";

const NewPlant: React.FC = () => {
    const [plantName, setPlantName] = useState("");
    const [plantPeriod, setPlantPeriod] = useState("");
    const [plantPhoto, setPlantPhoto] = useState("");
    const [success, setSuccess] = useState(false); // State to track successful plant addition

    const [plantNameError, setPlantNameError] = useState("");
    const [plantPeriodError, setPlantPeriodError] = useState("");
    const [plantPhotoError, setPlantPhotoError] = useState("");

    const handleAddPlant = () => {
        // Reset error messages
        setPlantNameError("");
        setPlantPeriodError("");
        setPlantPhotoError("");

        if (!plantName) {
            setPlantNameError("Plant name is required");
        }
        if (!plantPeriod) {
            setPlantPeriodError("Plant period is required");
        }
        if (!plantPhoto) {
            setPlantPhotoError("Photo is required");
        }

        if (plantName && plantPeriod && plantPhoto) {
            // Plant addition is successful
            const plantData = {
                name: plantName,
                periodDays: plantPeriod,
                photoSource: plantPhoto,
            };

            // Store plantData in localStorage or your data store
            // localStorage.setItem('plants', JSON.stringify([plantData]));

            // Set success to true to show the SuccessScreen component
            setSuccess(true);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setPlantPhoto(selectedFile.name);
        }
    };

    return (
        <div>
            {!success ? ( // Render the form if success is false
                <div>
                    <h1>Add new plant</h1>
                    <input
                        name="plantName"
                        aria-label={"plantName"}
                        onChange={(e) => setPlantName(e.target.value)}
                    />
                    <input
                        name="plantPeriod"
                        aria-label={"plantPeriod"}
                        value={plantPeriod}
                        onChange={(e) => setPlantPeriod(e.target.value)}
                    />
                    <input
                        name="plantPhoto"
                        type="file"
                        aria-label={"plantPhoto"}
                        onChange={handlePhotoChange}
                    />
                    <button
                        name="addPlant"
                        aria-label={"addPlant"}
                        onClick={handleAddPlant}
                    >
                        Add plant
                    </button>
                    {plantNameError ? <span>{plantNameError}</span> : null}
                    {plantPeriodError ? <span>{plantPeriodError}</span> : null}
                    {plantPhotoError ? <span>{plantPhotoError}</span> : null}
                </div>
            ) : (
                // Render the SuccessScreen component if success is true
                <SuccessScreen />
            )}
        </div>
    );
};

export default NewPlant;
