/** @format */

import * as ActionType from './actionType'
import axios from 'axios'

export const changeInputAction = value => ({
    type: ActionType.CHANGE_INPUT,
    value,
})
export const addItemAction = () => ({
    type: ActionType.ADD_ITEM,
})
export const deleteItemAction = index => ({
    type: ActionType.DELETE_ITEM,
    index,
})
// 未使用中间件thunk的写法
// export const getListAction = (value)=>({
//     type:ActionType.GET_LIST,
//     value
// })
// 修改后，使用中间件的写法,可以是原来的对象也可以是函数 start--
export const getList = () => {
    return dispatch => {
        axios.get('/mock').then(res => {
            const resData = res.data.userinfo
            const action = getListAction(resData)
            dispatch(action)
        })
    }
}
export const getListAction = value => ({
    type: ActionType.GET_LIST,
    value,
})
// end--
