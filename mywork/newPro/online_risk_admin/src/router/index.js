import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/home/home';
import Detail from '../pages/configDetail/configDetail';
import configureList from '../pages/configureList/configureList';
import review from '../pages/review/review';
import test from '../pages/test/test';

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Home,
        children: [{
            path: '/configureList',
            name: 'configureList',
            component: configureList
        }, {
            path: '/review',
            name: 'review',
            component: review
        },{
            path: '/test',
            name: 'test',
            component: test
        }]
    }, {
      path: '/detail/:way',
      component: Detail
    },{
        path: '*',//路由不存在时
        redirect: '/configureList'
    }]
})
