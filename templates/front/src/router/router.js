import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Forum from '../pages/forum/list'
import ForumAdd from '../pages/forum/add'
import ForumDetail from '../pages/forum/detail'
import MyForumList from '../pages/forum/myForumList'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import dianyingleibieList from '../pages/dianyingleibie/list'
import dianyingleibieDetail from '../pages/dianyingleibie/detail'
import dianyingleibieAdd from '../pages/dianyingleibie/add'
import remendianyingList from '../pages/remendianying/list'
import remendianyingDetail from '../pages/remendianying/detail'
import remendianyingAdd from '../pages/remendianying/add'
import dianyingxinxiList from '../pages/dianyingxinxi/list'
import dianyingxinxiDetail from '../pages/dianyingxinxi/detail'
import dianyingxinxiAdd from '../pages/dianyingxinxi/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'
import discussremendianyingList from '../pages/discussremendianying/list'
import discussremendianyingDetail from '../pages/discussremendianying/detail'
import discussremendianyingAdd from '../pages/discussremendianying/add'
import discussdianyingxinxiList from '../pages/discussdianyingxinxi/list'
import discussdianyingxinxiDetail from '../pages/discussdianyingxinxi/detail'
import discussdianyingxinxiAdd from '../pages/discussdianyingxinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'forum',
					component: Forum
				},
				{
					path: 'forumAdd',
					component: ForumAdd
				},
				{
					path: 'forumDetail',
					component: ForumDetail
				},
				{
					path: 'myForumList',
					component: MyForumList
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'dianyingleibie',
					component: dianyingleibieList
				},
				{
					path: 'dianyingleibieDetail',
					component: dianyingleibieDetail
				},
				{
					path: 'dianyingleibieAdd',
					component: dianyingleibieAdd
				},
				{
					path: 'remendianying',
					component: remendianyingList
				},
				{
					path: 'remendianyingDetail',
					component: remendianyingDetail
				},
				{
					path: 'remendianyingAdd',
					component: remendianyingAdd
				},
				{
					path: 'dianyingxinxi',
					component: dianyingxinxiList
				},
				{
					path: 'dianyingxinxiDetail',
					component: dianyingxinxiDetail
				},
				{
					path: 'dianyingxinxiAdd',
					component: dianyingxinxiAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
				{
					path: 'discussremendianying',
					component: discussremendianyingList
				},
				{
					path: 'discussremendianyingDetail',
					component: discussremendianyingDetail
				},
				{
					path: 'discussremendianyingAdd',
					component: discussremendianyingAdd
				},
				{
					path: 'discussdianyingxinxi',
					component: discussdianyingxinxiList
				},
				{
					path: 'discussdianyingxinxiDetail',
					component: discussdianyingxinxiDetail
				},
				{
					path: 'discussdianyingxinxiAdd',
					component: discussdianyingxinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
