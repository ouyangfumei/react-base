
import React, { Component } from 'react';
import { Input,Button } from 'antd';
import store from '../../store';
import * as ActionCreators from '../../store/action/actionCreators';
import {connect} from 'react-redux';

// redux的应用
// 获取：store.getState()；
// 修改 订阅storeChange subscribe
interface IProps {
    inputValue: string,
    name: string;
    list:Array<string>;
    changeInputValue:any;
    getData:any;
    addBtn:any;
    delBtn:any;
}
interface IState {
    inputValue:string;
    list:Array<string>;
}
// state
class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        // 未使用react-redux
        // const storeData = store.getState();
        // const inputValue = storeData.inputValue;
        // const list = storeData.list;
        // 使用react-redux
        const {inputValue,list} = this.props;
        // this.state = {
        //     inputValue:'',
        //     list:[]
        // };
        // ---修改store 订阅Redux的状态
        // this.storeChange = this.storeChange.bind(this);
        // store.subscribe(this.storeChange);
        // ---
    } 
    componentDidMount(){  
        this.props.getData();
    }
    // storeChange(){
    //     console.log(store.getState());
    //     const storeData = store.getState();
    //     this.setState({
    //         inputValue:storeData.inputValue,
    //         list:storeData.list
    //     })
    // }   
    render() { 
        const {inputValue,list,changeInputValue,delBtn,addBtn} = this.props;
        return (  
            <div className="home">
                <p>列表如下，增删改查</p>
               <div className="input-center">
                   <Input value={inputValue} onChange={changeInputValue}/>
                   <Button 
                    type="primary"
                    onClick={addBtn}>
                    增加</Button>
                </div>
                {list.length&&list.map((item,index)=>
                    <p key={index}><span>{item}&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="del" onClick={delBtn}>删除</span></p>
                )}
            </div> 
       );
    }
}
// export default Home;

// react-redux的使用
const stateToProps = (state:IState)=>{
    return{
        inputValue:state.inputValue,
        list:state.list
    }
}
const dispatchToProps = ()=>{
    return {
        changeInputValue(e: React.ChangeEvent<HTMLInputElement>){
            const action = ActionCreators.changeInputAction(e.target.value);
            store.dispatch(action);
        },
        getData(){
            const action = ActionCreators.getList();
            store.dispatch(action);
        },
        addBtn(){
            const action = ActionCreators.addItemAction();
            store.dispatch(action);
        },
        delBtn(){
            const action = ActionCreators.deleteItemAction(0);
            store.dispatch(action);
        }
    }
}
export default connect(stateToProps,dispatchToProps)(Home);
