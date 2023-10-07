import { render, screen, act, fireEvent } from "@testing-library/react";
import SuccessScreen from "./success-screen";
import {navigateToMainScreen} from "../../navigation-utils";
jest.mock("../../navigation-utils");

describe('Success Screen', () => {
    it('should display a success message', () => {
        render(<SuccessScreen />);
        const successMessage = screen.getByText('Plant added successfully');
        expect(successMessage).toBeInTheDocument();
    });

    it('should have an "Add more" button', () => {
        render(<SuccessScreen />);
        const addButton = screen.getByRole('button', { name: 'Add more' });
        expect(addButton).toBeInTheDocument();
    });

    it('should have a "Back to the main screen" button', () => {
        render(<SuccessScreen />);
        const backButton = screen.getByRole('button', { name: 'Back to the main screen' });
        expect(backButton).toBeInTheDocument();
    });

    it('clicking the "Add more" button should navigate to the main screen', () => {
        render(<SuccessScreen />);
        const addButton = screen.getByRole('button', { name: 'Add more' });

        act(() => {
            fireEvent.click(addButton);
        });

        expect(navigateToMainScreen).toHaveBeenCalled();
    });
});