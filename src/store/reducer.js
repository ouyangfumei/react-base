import * as ActionType from './action/actionType';

const defaultState = {
    inputValue : 'input-init',
    list:[]
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
    if(action.type === ActionType.GET_LIST){
        let newState = JSON.parse(JSON.stringify(state));
        newState.list = (action.value);
        return newState
    }
    return state
}