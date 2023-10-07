import React from "react";
import {navigateToMainScreen} from "../../navigation-utils";

const SuccessScreen = () => {
    return (
        <div>
            <h1>Success Screen</h1>
            <p>Plant added successfully</p>
            <button onClick={navigateToMainScreen}>Add more</button>
            <button onClick={navigateToMainScreen}>Back to the main screen</button>
        </div>
    );
}

export default SuccessScreen;
