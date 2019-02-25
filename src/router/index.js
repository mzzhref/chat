import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
import Sign from '@/components/Sign'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    }
  ]
})
