/** @format */

import React, {useState, useEffect} from 'react'
import {Input, Button} from 'antd'
import store from '../../store'
import * as ActionCreators from '../../store/action/actionCreators'
import {connect} from 'react-redux'

// interface IProps {
//     inputValue: string
//     name: string
//     list: Array<string>
//     changeInputValue: any
//     getData: any
//     addBtn: any
//     delBtn: any
// }
interface IState {
    inputValue: string
    list: Array<string>
}
const Home = (props: any) => {
    const [list, setList] = useState(props.list)
    useEffect(() => {
        props.getData()
    }, [list])
    const {inputValue, changeInputValue, delBtn, addBtn} = props
    console.log(list, 'list')
    return (
        <div className="home">
            <p>列表如下，增删改查(使用useState和react-redux结合，但是失败了2111!！)</p>
            <div className="input-center">
                <Input value={inputValue} onChange={changeInputValue} />
                <Button type="primary" onClick={addBtn}>
                    增加
                </Button>
            </div>
            {list.length &&
                list.map((item: any, index: number) => (
                    <p key={index}>
                        <span>{item}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="del" onClick={delBtn}>
                            删除
                        </span>
                    </p>
                ))}
        </div>
    )
}

const stateToProps = (state: IState) => {
    return {
        inputValue: state.inputValue,
        list: state.list,
    }
}
const dispatchToProps = () => {
    return {
        changeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
            const action = ActionCreators.changeInputAction(e.target.value)
            store.dispatch(action)
        },
        getData() {
            const action = ActionCreators.getList()
            store.dispatch(action)
        },
        addBtn() {
            const action = ActionCreators.addItemAction()
            store.dispatch(action)
        },
        delBtn() {
            const action = ActionCreators.deleteItemAction(0)
            store.dispatch(action)
        },
    }
}
export default connect(stateToProps, dispatchToProps)(Home)
