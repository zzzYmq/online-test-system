import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions={
    exit(context,value){
        context.commit('Exit',value)
        window.localStorage.clear()
    }
}

const mutations={
    HandLogin(state,value){
        state.isLogin=value
        state.isAuto=false
    },
    AutoLogin(state,value){
        state.isLogin=value
    },
    SaveUserInfo(state,value){
        state.userinfo=value
    },
    BankId(state,value){
        state.bankid=value
    },
    Exit(state,value){
        state.isLogin=value
        state.isAuto=true
    }
}

const state={
    isLogin:false,
    // 记录用户打开网页后是否是网页登录还是缓存自动登录 自动登录为true
    isAuto:true,
    userinfo:{},
    tkinfo:{}
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})