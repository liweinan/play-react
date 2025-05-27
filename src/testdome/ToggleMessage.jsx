import React, {useState} from 'react';
// https://www.testdome.com/library?page=1&skillArea=48&questionId=107225
const ToggleMessage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <a href="#" onClick={handleClick}>Want to buy a new car?</a>
            {isVisible && <p>Call +11 22 33 44 now!</p>}
        </div>
    );
}

export default ToggleMessage;