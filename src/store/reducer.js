import * as ActionType from './action/actionType';

const defaultState = {
    inputValue : 'input-init',
    list:[
        '早上4点起床，锻炼身体',
        '中午下班游泳一小时'
    ]
}; 
export default (state = defaultState,action)=>{
    if(action.type === ActionType.CHANGE_INPUT){
        console.log(action,'-----')
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState
    }
    if(action.type === ActionType.ADD_ITEM){
        console.log(action,'-----')
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = 'input-add';
        newState.list.push('最后一个');
        return newState
    }
    if(action.type === ActionType.DELETE_ITEM){
        console.log(action,'-----')
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = 'input-del';
        newState.list.splice(action.index,1);
        return newState
    }
    return state
}