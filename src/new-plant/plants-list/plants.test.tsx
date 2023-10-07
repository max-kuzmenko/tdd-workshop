import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FlowerpotPage from "./FlowerpotPage"; // Replace with the actual component name

const mockFlowerpots = [
    {
        id: 1,
        name: "Rose",
        photo: "rose.jpg",
        wateringSchedule: "Every 2 days",
    },
    {
        id: 2,
        name: "Lily",
        photo: "lily.jpg",
        wateringSchedule: "Every 3 days",
    },
];

describe("FlowerpotPage", () => {
    it("renders a list of flowerpots", () => {
        render(<FlowerpotPage flowerpots={mockFlowerpots} />);

        // Check if flowerpot cards are rendered
        const flowerpotCards = screen.getAllByTestId("flowerpot-card");
        expect(flowerpotCards).toHaveLength(mockFlowerpots.length);

        // Check if each flowerpot card contains name, photo, watering schedule, buttons
        mockFlowerpots.forEach((flowerpot, index) => {
            const card = flowerpotCards[index];
            expect(card).toBeInTheDocument();

            // Check if name is displayed
            const nameElement = screen.getByText(flowerpot.name);
            expect(nameElement).toBeInTheDocument();

            // Check if photo is displayed
            const photoElement = screen.getByAltText(`Photo of ${flowerpot.name}`);
            expect(photoElement).toBeInTheDocument();
            expect(photoElement).toHaveAttribute("src", flowerpot.photo);

            // Check if watering schedule is displayed
            const scheduleElement = screen.getByText(flowerpot.wateringSchedule);
            expect(scheduleElement).toBeInTheDocument();

            // Check if watering button is displayed
            const wateringButton = screen.getByText("Water");
            expect(wateringButton).toBeInTheDocument();

            // Check if edit button is displayed
            const editButton = screen.getByText("Edit");
            expect(editButton).toBeInTheDocument();

            // Check if delete button is displayed
            const deleteButton = screen.getByText("Delete");
            expect(deleteButton).toBeInTheDocument();
        });
    });

    it("clicking on the delete button removes the flowerpot", () => {
        render(<FlowerpotPage flowerpots={mockFlowerpots} />);

        // Check the initial number of flowerpot cards
        const flowerpotCards = screen.getAllByTestId("flowerpot-card");
        expect(flowerpotCards).toHaveLength(mockFlowerpots.length);

        // Click the delete button of the first flowerpot
        const deleteButton = screen.getAllByText("Delete")[0];
        fireEvent.click(deleteButton);

        // Check if the flowerpot is removed
        const updatedFlowerpotCards = screen.getAllByTestId("flowerpot-card");
        expect(updatedFlowerpotCards).toHaveLength(mockFlowerpots.length - 1);
    });

    // Add more test cases for other interactions as needed
});
