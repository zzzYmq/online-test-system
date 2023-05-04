import Vue from 'vue'
import VueRouter from 'vue-router'

import PSW from '../pages/log-reg/FindPsw'
import LogReg from '../pages/log-reg/LogReg'
import Login from '../components/log-reg/MyLogin'
import Register from '../components/log-reg/MyRegister'

import TKs from '../pages/tikus/TiKus'
import TK from '../pages/tiku/TK'
import Text from '../pages/text/OnlineText'

import Preview from '../components/showTM/PreQuestion'

import Home from '../pages/Home/MyHome'
import WelCome from '../pages/welcome/WelCome'

import MyBank from '../components/Home/bankcenter/MyBank'
import ManageBank from '../components/Home/bankcenter/ManageBank'
import Single from '../components/Home/tmtype/SingleList'
import Multiple from '../components/Home/tmtype/MultipleList'
import FillBank from '../components/Home/tmtype/FillBank'
import UpLoad from '../components/Home/bankcenter/UpLoad'
import Mistake from '../components/Home/bankcenter/MistakeQue'

import Exam from '../components/Home/exam/MyExam'
import AddExam from '../components/Home/exam/AddExam'

// import CurrentTest from '../components/Home/onlinetest/CurrentTest'

import UserCenter from '../components/Home/user/UserCenter'




Vue.use(VueRouter)

const router = new VueRouter(
    {
        routes: [
            // 首页
            {
                path: '/',
                component: WelCome,
            },
            {
                path: '/tks',
                component: TKs,
                props({ query }) {
                    return {
                        tkname: query.tkname,
                        author: query.author
                    }
                },
                // beforeEnter(to,from,next){
                //     if(!Vue.prototype.$store.state.isLogin){
                //         Vue.prototype.$message.error('请先登录！')
                //         return next('/login')
                //     }
                //     if(!Vue.prototype.$store.state.isAuto) return next()
                //     Vue.prototype.$http.get('/api/user/account/',{
                //         params:{
                //           choice:"tokenInfo",
                //         }
                //     }).then(({data:res})=>{
                //         if(res.code===200){
                //             Vue.prototype.$store.commit('HandLogin',true)
                //             return next()
                //         }
                //         Vue.prototype.$store.dispatch('exit')
                //         next('/login')
                //     })
                // }

            },
            {
                path: '/tk/detail/',
                component: TK,
                props({ query }) {
                    return {
                        bankid: query.bankid,
                    }
                }
            },
            {
                path: '/online/',
                component: Text,
                props({ query }) {
                    return {
                        tkid: query.tkid,
                        tkname: query.tkname,
                        text: query.text,
                        type: query.type || ''
                    }
                }
            },
            {
                path: '/preview',
                component: Preview,
                props({ query }) {
                    return {
                        id: query.id
                    }
                }
            },
            {
                path: '/',
                component: LogReg,
                children: [
                    {
                        path: '/login',
                        component: Login
                    },
                    {
                        path: '/register',
                        component: Register
                    },
                ]
            },
            {
                path: '/find-psw',
                component: PSW
            },
            // 功能页
            {
                path: '/',
                component: Home,
                children: [
                    {
                        path: '/upload',
                        component: UpLoad,
                        props({ query }) {
                            return {
                                tkid: query.tkid
                            }
                        }
                    },
                    {
                        path: '/exam',
                        component: Exam
                    },
                    {
                        path: '/add_Exam',
                        component: AddExam
                    },
                    {
                        path: '/mybank',
                        component: MyBank
                    },
                    {
                        path: '/managebank',
                        component: ManageBank,
                        props({ query }) {
                            return {
                                id: query.id
                            }
                        },
                        children: [
                            {
                                path: '/bank/single',
                                component: Single,
                                props({ query }) {
                                    return {
                                        id: query.id,
                                        type: query.type
                                    }
                                }
                            },
                            {
                                path: '/bank/multiple',
                                component: Multiple,
                                props({ query }) {
                                    return {
                                        id: query.id,
                                        type: query.type
                                    }
                                }
                            },
                            {
                                path: '/bank/fillbank',
                                component: FillBank,
                                props({ query }) {
                                    return {
                                        id: query.id,
                                        type: query.type
                                    }
                                }
                            }
                        ]
                    },
                    {
                        path: "/mistake",
                        component: Mistake
                    },
                    {
                        path: '/currenttest',
                        component: () => import('../components/stuRouter/StuTest.vue')
                    },
                    {
                        path: '/user',
                        component: UserCenter
                    },
                ],
                // beforeEnter(to,from,next){
                //     // if(!Vue.prototype.$store.state.isLogin){
                //     //     Vue.prototype.$message.error('请先登录！')
                //     //     return next('/login')
                //     // }
                //     // if(!Vue.prototype.$store.state.isAuto) return next()
                //     // Vue.prototype.$http.get('/api/user/account/',{
                //     //     params:{
                //     //       choice:"tokenInfo",
                //     //     }
                //     // }).then(({data:res})=>{
                //     //     if(res.code===200) return next()
                //     //     Vue.prototype.$store.dispatch('exit')
                //     //     next('/login')
                //     // })
                // }
            }
        ]
    }
)

export default router