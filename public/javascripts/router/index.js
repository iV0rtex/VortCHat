import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ '../components/pages/home');
const MainPage = () => import(/* webpackChunkName: "home" */ '../components/pages/mainPage');

const router = new VueRouter({
    mode: 'history',
    base: '/',
    linkActiveClass: "active",
    routes: [
        {
            path: '/',
            component: MainPage,
            meta: {
                title: 'main'
            }
        },
        {
            path: '/home',
            component: Home,
            meta: {
                title: 'homepage'
            }
        },
    ]

});

router.beforeEach((to, from, next) => {
    //document.title = methods.methods.translate(to.meta.title) + ' - ' + __ps_name;
    next();
});


export default router;