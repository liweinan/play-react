import React from 'react';

const SecurityContext = React.createContext({username: "", permissions: []});

const ControlsComponent = (props) => {
    return (
        <SecurityContext.Provider value={{username: props.username}}>
            <LogoutWrapper></LogoutWrapper>
        </SecurityContext.Provider>
    );
};

const LogoutWrapper = (props) => {
    var context = React.useContext(SecurityContext);
    return (
        <div>
            <p>{context.username}</p>
            <button>Click here to logout</button>
        </div>
    );
};

export default ControlsComponent;
