import React, { Component } from 'react';
interface IProps {
    name: string;
}
interface IState {
    title: string;
}
class Login extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            title: "login"
        };
      }
    render() { 
    return (  <h2>{this.state.title}</h2> );
    }
}

export default Login;