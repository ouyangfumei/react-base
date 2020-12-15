/** @format */

import {Link} from 'react-router-dom'
import React, {Component} from 'react'
interface IProps {
    name: string
}
interface IState {
    title: string
}
export default class CommonApp extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            title: 'pageTop',
        }
    }
    render() {
        return (
            <div>
                <div>{this.state.title}</div>
                <ul>
                    <li>
                        {' '}
                        <Link to="/">首页1？</Link>{' '}
                    </li>
                    <li>
                        <Link to="/list/">列表</Link>{' '}
                    </li>
                </ul>
            </div>
        )
    }
}
