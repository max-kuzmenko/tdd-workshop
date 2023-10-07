import React from "react";

const FlowerPot = ({ id, name, photo, wateringSchedule, onWater, onEdit, onDelete }) => {
    return (
        <div data-testid="flowerpot-card">
            <h2>{name}</h2>
            <img src={photo} alt={`Photo of ${name}`} />
            <p>Watering Schedule: {wateringSchedule}</p>
            <button onClick={() => onWater(id)}>Water</button>
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default FlowerPot;
