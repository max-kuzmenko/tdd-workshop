import { render, screen, act, fireEvent } from "@testing-library/react";

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

    it('clicking the "Add more" button should refresh the page', () => {
        // Mock the window.location.reload method
        const originalReload = window.location.reload;
        window.location.reload = jest.fn();

        render(<SuccessScreen />);
        const addButton = screen.getByRole('button', { name: 'Add more' });

        act(() => {
            fireEvent.click(addButton);
        });

        expect(window.location.reload).toHaveBeenCalled();

        // Restore the original method
        window.location.reload = originalReload;
    });

    it('clicking the "Back to the main screen" button should display the main screen', () => {
        const mockGoToMainScreen = jest.fn();
        jest.spyOn(window.location, 'assign').mockImplementation(mockGoToMainScreen);

        render(<SuccessScreen />);
        const backButton = screen.getByRole('button', { name: 'Back to the main screen' });

        act(() => {
            fireEvent.click(backButton);
        });

        expect(mockGoToMainScreen).toHaveBeenCalledWith('/');
    });
});
