import * as ActionType from './actionType';

export const changeInputAction = (value)=>({
    type:ActionType.CHANGE_INPUT,
    value
})
export const addItemAction =()=>({
    type:ActionType.ADD_ITEM,
})
export const deleteItemAction = (index)=>({
    type:ActionType.DELETE_ITEM,
    index
})
