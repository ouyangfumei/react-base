
import React, { Component } from 'react';
import { Input,Button } from 'antd';
import store from '../../store';
import * as ActionCreators from '../../store/action/actionCreators';
// redux的应用
// 获取：store.getState()；
// 修改 订阅storeChange subscribe
interface IProps {
    name: string;
}
interface IState {
    inputValue: string,
    list:Array<string>
}
class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const storeData = store.getState();
        this.state = {
            inputValue:storeData.inputValue,
            list:storeData.list
        };
        this.changeInputValue = this.changeInputValue.bind(this);
        // ---修改store 订阅Redux的状态
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        // ---
        this.addBtn = this.addBtn.bind(this);
        this.delBtn = this.delBtn.bind(this);
    } 
    changeInputValue(e: React.ChangeEvent<HTMLInputElement>){
        // const action = {type:'changeInputValue',value:e.target.value};        
        // store.dispatch(action);
        const action = ActionCreators.changeInputAction(e.target.value);
        console.log(action)
        store.dispatch(action);
    }  
    storeChange(){
        console.log(store.getState());
        const storeData = store.getState();
        this.setState({
            inputValue:storeData.inputValue,
            list:storeData.list
        })
    }   
    addBtn(){
        const action = ActionCreators.addItemAction();
        store.dispatch(action);
    }
    delBtn(){
        const action = ActionCreators.deleteItemAction(0);
        store.dispatch(action);
    }
    render() { 
    return (  
        <div>
            <Input value={this.state.inputValue} onChange={this.changeInputValue}/>
            <Button 
                type="primary"
                onClick={this.addBtn}
            >增加</Button>
            <Button 
                type="primary"
                onClick={this.delBtn}
            >删除</Button>
        </div> 
       );
    }
}

export default Home;