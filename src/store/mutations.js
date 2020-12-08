import {ADDCOUNT,ADDTOCAR} from './mutations-types'
export default {
  // 计数
  [ADDCOUNT] (state,payload) {
    payload.count += 1
  },
  // 添加购物车
  [ADDTOCAR] (state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
 
}