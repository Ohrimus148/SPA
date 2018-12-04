require('./bootstrap');
import Vue from 'vue';
import VueResource from 'vue-resource';
import {routes} from './routes';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import StoreData from './store';
import MainApp from './components/MainApp.vue';
import {initialize} from './helpers/general';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

initialize(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});