import {render, screen, waitFor, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewPlant from "./new-plant";
import * as SuccessScreen from "./success-screen/success-screen";


const successScreenSpy = jest.spyOn(SuccessScreen, 'default');

/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */

describe('New Plant', () => {
    describe('Should show new plant screen', () => {
        it('should show add plant headline', () => {
            render(<NewPlant/>)
            const element = screen.getByRole('heading');
            expect(element).toBeInTheDocument()
        })

        it('should show name input', () => {
            render(<NewPlant/>)
            const element = screen.getByRole('textbox', { name: 'plantName' });
            expect(element).toBeInTheDocument()
        })

        it('should show period input', () => {
            render(<NewPlant/>)
            const element = screen.getByRole('textbox', {name: 'plantPeriod'});
            expect(element).toBeInTheDocument()
        })

        it('should show photo input', () => {
            render(<NewPlant/>)
            const element = screen.getByLabelText('plantPhoto');
            expect(element).toBeInTheDocument()
        })

        it('should show add plant button', () => {
            render(<NewPlant/>)
            const element = screen.getByRole('button', { name: 'addPlant'});
            expect(element).toBeInTheDocument()
        });
    })

    describe('All fields should be editable', () => {
        it('Name input is editable', () => {
            render(<NewPlant/>)
            const element = screen.getByRole('textbox', { name: 'plantName' });
            userEvent.type(element, 'Ficus')
            expect(element).toHaveValue('Ficus');
        })

        it('Period input is editable', () => {
            render(<NewPlant/>)
            const element = screen.getByRole('textbox', { name: 'plantPeriod' });
            userEvent.type(element, '12')
            expect(element).toHaveValue('12');
        })

        it('Photo input is editable', () => {
            render(<NewPlant/>)
            const element: HTMLInputElement = screen.getByLabelText('plantPhoto');
            userEvent.upload(element, new File([], 'photo.jpg', { type: 'image/jpeg' }))
            expect(element.files?.[0]).toHaveProperty('name', 'photo.jpg');
        })
    })

    describe('Submit validation',() => {
       it('After button click should show error message for plan name', async () => {
           render(<NewPlant/>)
           const element = screen.getByRole('button', { name: 'addPlant'});
           act(() => userEvent.click(element))

           await waitFor(() => {
               const nameErrorElement = screen.getByText('Plant name is required')
               expect(nameErrorElement).toBeInTheDocument()
           });

           await waitFor(() => {
               const periodErrorElement = screen.getByText('Plant period is required')
               expect(periodErrorElement).toBeInTheDocument()
           });

           await waitFor(() => {
               const photoErrorElement = screen.getByText('Photo is required')
               expect(photoErrorElement).toBeInTheDocument()
           });
       });
    });

    describe('Success plant create', () => {
        it('After button click plant should be stored in LocalStorage', async () => {
            render(<NewPlant />)
            const submitButton = screen.getByRole('button', { name: 'addPlant' });

            const elementName = screen.getByRole('textbox', { name: 'plantName' });
            const elementPeriod = screen.getByRole('textbox', { name: 'plantPeriod' });
            const elementPhoto: HTMLInputElement = screen.getByLabelText('plantPhoto');

            act(() => {
                userEvent.type(elementName, 'Ficus')
                userEvent.type(elementPeriod, '12')
                userEvent.upload(elementPhoto, new File([], 'photo.jpg', { type: 'image/jpeg' }))
            });

            act(() => {
                userEvent.click(submitButton);
            });

            await waitFor(() => {
                const plantsJson = localStorage.getItem('plants');
                expect(plantsJson).not.toBeNull();

                const plant = JSON.parse(plantsJson || '')[0];

                expect(plant.name).toEqual("Ficus")
                expect(plant.periodDays).toEqual("12")
                expect(plant.photoSource).toEqual("photo.jpg")
            });
        });
    });

    describe('Success plant create show', () => {
        it('After button click should show success screen', async () => {
            render(<NewPlant />);
            const submitButton = screen.getByRole('button', { name: 'addPlant' });

            const elementName = screen.getByRole('textbox', { name: 'plantName' });
            const elementPeriod = screen.getByRole('textbox', { name: 'plantPeriod' });
            const elementPhoto: HTMLInputElement = screen.getByLabelText('plantPhoto');

            act(() => {
                userEvent.type(elementName, 'Ficus');
                userEvent.type(elementPeriod, '12');
                userEvent.upload(elementPhoto, new File([], 'photo.jpg', { type: 'image/jpeg' }));
            });

            successScreenSpy.mockReturnValue(<div>Mocked SuccessScreen</div>);

            act(() => {
                userEvent.click(submitButton);
            });

            // Wait for the SuccessScreen component to be displayed
            await waitFor(() => {
                expect(successScreenSpy).toHaveBeenCalledTimes(1);
            });

            // Now you can assert further about the SuccessScreen component or its content
            const successMessage = screen.getByText('Mocked SuccessScreen');
            expect(successMessage).toBeInTheDocument();
        });
    });
})