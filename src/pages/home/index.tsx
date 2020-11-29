
import React, { Component } from 'react';
import { Input,Button } from 'antd';
import store from '../../store';
import * as ActionCreators from '../../store/action/actionCreators';
import axios from 'axios';

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
    componentDidMount(){  
        this.getData();
    }
    getData(){
        // 未使用中间件thunk的写法
        // axios.get('/mock') 
        //     .then(res=>{
        //     console.log(res.data.userinfo);
        //     const resData = res.data.userinfo;
        //     const action = ActionCreators.getListAction(resData);
        //     store.dispatch(action);
        // })
        // 修改后，使用中间件的写法
        const action = ActionCreators.getList();
        store.dispatch(action);
    }
    changeInputValue(e: React.ChangeEvent<HTMLInputElement>){
        const action = ActionCreators.changeInputAction(e.target.value);
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
        const {list} = this.state;
        return (  
            <div className="home">
                <p>列表如下，增删改查</p>
               <div className="input-center">
                   <Input value={this.state.inputValue} onChange={this.changeInputValue}/>
                   <Button 
                    type="primary"
                    onClick={this.addBtn}>
                    增加</Button>
                </div>
                {list.length&&list.map((item,index)=>
                    <p key={index}><span>{item}&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="del" onClick={this.delBtn}>删除</span></p>
                )}
            </div> 
       );
    }
}

export default Home;