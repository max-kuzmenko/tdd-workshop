import React, { useState } from "react";
import FlowerPot from "./flower-pot-item"; // Import the FlowerPot component

const FlowerpotPage = ({ flowerpots }) => {
    const [flowerpotsList, setFlowerpotsList] = useState(flowerpots);

    const handleWatering = (id) => {
        // Implement watering logic here if needed
        console.log(`Watering flowerpot with id: ${id}`);
    };

    const handleEdit = (id) => {
        // Implement edit logic here if needed
        console.log(`Editing flowerpot with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Remove the flowerpot with the specified id
        const updatedFlowerpots = flowerpotsList.filter((flowerpot) => flowerpot.id !== id);
        setFlowerpotsList(updatedFlowerpots);
    };

    return (
        <div>
            <h1>Flowerpots</h1>
            {flowerpotsList.map((flowerpot) => (
                <FlowerPot
                    key={flowerpot.id}
                    id={flowerpot.id}
                    name={flowerpot.name}
                    photo={flowerpot.photo}
                    wateringSchedule={flowerpot.wateringSchedule}
                    onWater={handleWatering}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default FlowerpotPage;
