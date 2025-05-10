import React from 'react';
// https://www.testdome.com/library?page=1&skillArea=48&questionId=132235
const SecurityContext = React.createContext({username: "", permissions: []});

const ControlsComponent = (props) => {
    return (
        <SecurityContext.Provider value={{username: props.username}}>
            {/*<SecurityContext.Provider value={{username: "Tom"}}>*/}
                <LogoutWrapper></LogoutWrapper>
            {/*</SecurityContext.Provider>*/}
        </SecurityContext.Provider>
    );
};

const LogoutWrapper = (props) => {
    var context = React.useContext(SecurityContext);
    console.log("permissions: ", props.permissions);
    return (
        <div>
            <p>{context.username}</p>
            <button>Click here to logout</button>
        </div>
    );
};

export default ControlsComponent;
