import React from 'react';
// import { createRoot } from 'react-dom/client';

// https://www.testdome.com/library?page=1&skillArea=48&questionId=104185

class Input extends React.PureComponent {
    render() {
        let {forwardedRef, ...otherProps} = this.props;
        return <input {...otherProps} ref={forwardedRef} />;
    }
}

const TextInput = React.forwardRef((props, ref) => {
    return <Input {...props} forwardedRef={ref} />
});

export default class Focus extends React.Component {
    ref = React.createRef();
    
    constructor(props) {
        super(props);
        this.state = {
            focused: props.focused || false
        };
    }

    toggleFocus = () => {
        this.setState(prevState => ({
            focused: !prevState.focused
        }));
    };

    render() {
        return (
            <div>
                <TextInput ref={this.ref} />
                <button onClick={this.toggleFocus}>
                    {this.state.focused ? 'Unfocus' : 'Focus'} Input
                </button>
            </div>
        );
    }

    // When the focused prop is changed from false to true,
    // and the input is not focused, it should receive focus.
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.focused && this.state.focused && document.activeElement !== this.ref.current) {
            this.ref.current.focus();
        }
    }

    // If focused prop is true on mount, the input should receive the focus.
    componentDidMount() {
        if (this.state.focused) {
            this.ref.current.focus();
        }
    }
}

Focus.defaultProps = {
    focused: false
};

// const App = (props) => <Focus focused={props.focused} />;
//
// document.body.innerHTML = "<div id='root'></div>";
// const root = createRoot(document.getElementById("root"));
// root.render(<App />);