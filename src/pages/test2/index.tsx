import React, { Component } from 'react';
interface IProps {
    name: string;
}
interface IState {
    title: 'page1' | 'page2';
}
class List extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            title: "page2"
        };
      }
    render() { 
    return (  <h2>{this.state.title}</h2> );
    }
}

export default List;