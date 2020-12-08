import {ADDCOUNT,ADDTOCAR,ADDCART} from './mutations-types'
export default {
  // 添加到购物车
  [ADDCART] (context,payload) {
    return new Promise((resolve,reject) => {
        /*  基础版
        let oldPruduct = null;  //cartlist原有的商品
        // 通过判断iid确定添加商品是否已经有了
        for (let item of state.cartList) {
          if (payload.iid === item.iid) {
              oldPruduct = item
          } 
        }
        */
        //  进阶版
        let oldPruduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 判断oldproduct 
        if (oldPruduct) { //null就是false,已有商品了，数量加一 
          context.commit(ADDCOUNT,oldPruduct)
          // toast提示数量+1
          resolve('已添加到购物车')
        } else {  //添加商品到购物车
          payload.count = 1 //  可有可无
          context.commit(ADDTOCAR,payload)
          // toast提示新增商品到购物车
          resolve('加入购物车成功')
        }
    })
  }
}

// actions是可以返回一个promise的