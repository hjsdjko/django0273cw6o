<template>
	<div class="main-containers">
		<div class="body-containers" :style='{"minHeight":"100vh","padding":"88px 0 0","margin":"0","background":"url(http://codegen.caihongy.cn/20240111/d1e1436a001445b08c5508f0bb6e20a4.png)","backgroundSize":"100% 100%","position":"relative","backgroundPosition":"center center","backgroundRepeat":"no-repeat"}'>
		<div class="top-container" :style='{"boxShadow":"none","padding":"0 20px","alignItems":"flex-start","display":"flex","justifyContent":"flex-end","overflow":"hidden","top":"0","left":"0","background":"#8E4033","width":"100%","position":"fixed","height":"88px","zIndex":"1002"}'>
			<!-- info -->
			<div :style='{"padding":"0","top":"30px","left":"20px","background":"none","display":"block","width":"35%","position":"absolute"}'>
			  <span @click="goMenu('/index/home')" :style='{"padding":"0","color":"#fff","alignItems":"center","background":"none","display":"flex","width":"100%","lineHeight":"auto","fontSize":"18px","float":"left","fontWeight":"bold","justifyContent":"center"}'>基于协同过滤算法的电影个性化推荐系统</span>
			</div>
			<!-- weather -->
			<div class="weather" :style='{"padding":"0 10px","alignItems":"center","top":"8px","left":"0","display":"flex","position":"absolute","justifyContent":"center"}'>
				<div :style='{"padding":"0 4px","fontSize":"15px","lineHeight":"70px","color":"#fff"}'>{{weather.city}}</div>
				<div :style='{"padding":"0 4px","fontSize":"15px","lineHeight":"70px","color":"#fff"}'>{{weather.tem}}°</div>
				<div :style='{"padding":"0 4px","fontSize":"15px","lineHeight":"70px","color":"#fff"}'>{{weather.wea}}</div>
				<div :style='{"padding":"0 4px","fontSize":"15px","lineHeight":"70px","color":"#fff"}'>{{weather.win}}</div>
				<div :style='{"padding":"0 4px","fontSize":"15px","lineHeight":"70px","color":"#fff"}'>{{weather.win_speed}}</div>
			</div>
			<!-- time -->
			<div :style='{"padding":"0 0px","fontSize":"15px","lineHeight":"70px","color":"#fff","display":"none"}'>{{times}}</div>
			
			<div v-if="false" :style='{"color":"#666","margin":"0 10px","fontSize":"14px"}'>0753-1234567</div>
			
			<div id="search" class="search" :style='{"margin":"0 10px","flexWrap":"wrap","background":"#fff","display":"none","height":"auto"}'>
				<div :style='{"margin":"0 10px 0 0"}' class="select">
					<el-select v-model="queryIndex">
						<el-option v-for="(item,index) in queryList" :key="index" :label="item.queryName" :value="index"></el-option>
					</el-select>
				</div>
				<div :style='{"margin":"0 10px 0 0"}' class="input" v-if="queryIndex==0">
					<el-input v-model="remendianyingdianyingmingcheng" placeholder="电影名称"></el-input>
				</div>
				<div :style='{"margin":"0"}' class="btn" v-if="queryIndex==0">
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"rgba(64, 158, 255, 1)","width":"auto","lineHeight":"44px","fontSize":"14px","height":"44px"}' type="primary" @click="search('remendianying')">
						<span class="icon iconfont icon-fangdajing07" :style='{"color":"rgba(255, 255, 255, 1)","margin":"0 4px 0 0","fontSize":"14px"}'></span>
						搜索
					</el-button>
				</div>
			</div>
			<img v-if="headportrait&&Token" :style='{"width":"44px","margin":"22px 10px 0 0","borderRadius":"50%","display":"inline-block","height":"44px"}' :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')">
			<div v-if="Token" :style='{"padding":"0 0px","margin":"0 20px 0 0","fontSize":"15px","lineHeight":"88px","color":"#fff","height":"88px"}'>{{username}}</div>
			<div v-if="Token && notAdmin" :style='{"padding":"0 0px","fontSize":"15px","lineHeight":"70px","color":"#fff","display":"none","height":"70px"}' @click="goMenu('/index/center')">个人中心</div>
			<el-button v-if="!Token" @click="toLogin()" :style='{"border":"none","padding":"0 0px","margin":"0 20px 0 0","color":"#fff","borderRadius":"0","background":"none","display":"inline-block","fontSize":"14px","lineHeight":"88px","height":"88px"}'>登录/注册</el-button>
			<el-button v-if="Token" @click="logout" :style='{"border":"none","padding":"0","margin":"0","color":"#fff","borderRadius":"0","background":"none","display":"inline-block","fontSize":"15px","lineHeight":"88px","height":"88px"}'>退出</el-button>
		</div>


			<div class="menu-preview" :style='{"padding":"0","borderColor":"#efefef","top":"0","left":"37%","background":"none","borderWidth":"0px 0 0","width":"calc(50% - 0px)","position":"fixed","borderStyle":"solid","zIndex":"1004"}'>
			<el-scrollbar wrap-class="scrollbar-wrapper-horizontal">
				<el-menu class="el-menu-horizontal-demo" :style='{"border":0,"padding":"0","listStyle":"none","margin":"0","background":"none","display":"flex","position":"relative"}' :default-active="activeMenu" :unique-opened="true" mode="horizontal" :router="true" @select="handleSelect">
					<div class="userinfo" :style='{"width":"84px","padding":"6px 10px 0","display":"none","height":"auto"}'>
					  <el-image v-if="headportrait&&Token" :style='{"width":"100%","objectFit":"cover","borderRadius":"20px","display":"block","height":"32px"}' :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')" fit="cover"></el-image>
					  <div :style='{"fontSize":"12px","lineHeight":"1.5","color":"#333","textAlign":"center"}'>{{username}}</div>
					</div>
					<el-menu-item class="home" index="/index/home" @click.native="goMenu('/index/home')">
						<span :style='{"padding":"0 0","margin":"0 8px 0 0","color":"inherit","display":"none","width":"14px","lineHeight":"1","fontSize":"inherit","height":"auto"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0","lineHeight":"1","fontSize":"inherit","color":"inherit","height":"auto"}'>首页</span>
					</el-menu-item>
					<el-menu-item class="item" v-for="(menu, index) in menuList" :index="menu.url" :key="index" @click.native="goMenu(menu.url)">
						<i :style='{"padding":"0","margin":"0 8px 0 0","color":"inherit","display":"none","width":"auto","lineHeight":"1","fontSize":"inherit","height":"auto"}' :class="iconArr[index]"></i>
						<span :style='{"padding":"0","lineHeight":"1","fontSize":"inherit","color":"inherit","height":"auto"}'>{{menu.name}}</span>
					</el-menu-item>
					<el-menu-item class="user" index="/index/center" v-if="Token && notAdmin" @click.native="goMenu('/index/center')">
						<span :style='{"padding":"0 0","margin":"0 8px 0 0","color":"inherit","display":"none","width":"auto","lineHeight":"56px","fontSize":"inherit","height":"56px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 0","lineHeight":"56px","fontSize":"inherit","color":"inherit","height":"56px"}'>个人资料</span>
					</el-menu-item>
				</el-menu>
			</el-scrollbar>
			</div>



			<div :style='{"width":"100%","margin":"0 auto","flexWrap":"wrap","background":"#fff","display":"flex","height":"auto"}'>
			  <div class="swiper21" :style='{"width":"100%","height":"auto","order":"2"}'>
			    <div class="swiper-container mySwiper21">
			      <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
			          <div :style='{"width":"100%","height":"auto"}'>
						<el-image v-if="preHttp(item.value)" @click="carouselClick(item.url)" :style='{"objectFit":"cover","width":"100%","height":"500px"}' :src="item.value" fit="cover"></el-image>
			            <el-image v-else @click="carouselClick(item.url)" :style='{"objectFit":"cover","width":"100%","height":"500px"}' :src="baseUrl + item.value" fit="cover"></el-image>
			          </div>
			        </div>
			      </div>
			      <div class="swiper-button-prev" :style='{"width":"24px","margin":"-12px 0 0","top":"50%","height":"24px"}'>
			        <span class="icon iconfont icon-jiantou39" :style='{"width":"24px","fontSize":"24px","color":"#fff","height":"24px"}'></span>
			      </div>
			      <div class="swiper-button-next" :style='{"width":"24px","margin":"-12px 0 0","top":"50%","height":"24px"}'>
			        <span class="icon iconfont icon-jiantou18" :style='{"width":"24px","fontSize":"24px","color":"#fff","height":"24px"}'></span>
			      </div>
			    </div>
			  </div>
			  <div class="swiper22" :style='{"width":"100%","display":"none","height":"auto","order":"2"}'>
			    <div class="swiper-container mySwiper22">
			      <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
			          <div>
			            <el-image v-if="preHttp(item.value)" :style='{"objectFit":"cover","width":"100%","height":"100px"}' :src="item.value" fit="cover"></el-image>
			            <el-image v-else :style='{"objectFit":"cover","width":"100%","height":"100px"}' :src="baseUrl + item.value" fit="cover"></el-image>
			          </div>
			        </div>
			      </div>
			      <div class="swiper-button-prev" :style='{"width":"14px","margin":"-7px 0 0","top":"50%","height":"14px"}'>
			        <span class="icon iconfont icon-jiantou39" :style='{"width":"14px","fontSize":"14px","color":"#fff","height":"14px"}'></span>
			      </div>
			      <div class="swiper-button-next" :style='{"width":"14px","margin":"-7px 0 0","top":"50%","height":"14px"}'>
			        <span class="icon iconfont icon-jiantou18" :style='{"width":"14px","fontSize":"14px","color":"#fff","height":"14px"}'></span>
			      </div>
			    </div>
			  </div>
			</div>

			<router-view id="scrollView"></router-view>
			
			<div class="bottom-preview" :style='{"width":"100%","height":"auto"}'>
				<div :style='{"minHeight":"100px","width":"100%","padding":"20px","overflow":"hidden","background":"#000","height":"auto"}'><div v-html="bottomContent"></div></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import Vue from 'vue'
import Swiper from "swiper";
import axios from 'axios'

export default {
    data() {
		return {
		queryList:[
		  {
			  queryName:"电影名称",
		  },
		],
		queryIndex: 0,
		remendianyingdianyingmingcheng: '',
            activeIndex: '0',
			roleMenus: [{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-similar","buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-camera","buttons":["新增","查看","修改","删除"],"menu":"电影类别","menuJump":"列表","tableName":"dianyingleibie"}],"menu":"电影类别管理"},{"child":[{"allButtons":["新增","查看","修改","删除","主演统计","电影类别统计","语言统计","查看评论","首页总数","首页统计","生成数据"],"appFrontIcon":"cuIcon-attentionfavor","buttons":["新增","查看","修改","删除","查看评论","生成数据"],"menu":"热门电影","menuJump":"列表","tableName":"remendianying"}],"menu":"热门电影管理"},{"child":[{"allButtons":["新增","查看","修改","删除","数据统计","名称","查看评论","首页总数","首页统计","生成数据","爬取数据"],"appFrontIcon":"cuIcon-news","buttons":["查看","修改","删除","爬取数据","生成数据","查看评论"],"menu":"电影信息","menuJump":"列表","tableName":"dianyingxinxi"}],"menu":"电影信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-group","buttons":["查看","修改","删除"],"menu":"交流论坛","tableName":"forum"}],"menu":"交流论坛"},{"child":[{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-phone","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-shop","buttons":["新增","查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"电影资讯","tableName":"news"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"电影资讯分类","tableName":"newstype"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","主演统计","电影类别统计","语言统计","查看评论","首页总数","首页统计","生成数据"],"appFrontIcon":"cuIcon-camera","buttons":["查看","查看评论"],"menu":"热门电影列表","menuJump":"列表","tableName":"remendianying"}],"menu":"热门电影模块"},{"child":[{"allButtons":["新增","查看","修改","删除","数据统计","名称","查看评论","首页总数","首页统计","生成数据","爬取数据"],"appFrontIcon":"cuIcon-skin","buttons":["查看","查看评论"],"menu":"电影信息","menuJump":"列表","tableName":"dianyingxinxi"}],"menu":"电影信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","主演统计","电影类别统计","语言统计","查看评论","首页总数","首页统计","生成数据"],"appFrontIcon":"cuIcon-camera","buttons":["查看","查看评论"],"menu":"热门电影列表","menuJump":"列表","tableName":"remendianying"}],"menu":"热门电影模块"},{"child":[{"allButtons":["新增","查看","修改","删除","数据统计","名称","查看评论","首页总数","首页统计","生成数据","爬取数据"],"appFrontIcon":"cuIcon-skin","buttons":["查看","查看评论"],"menu":"电影信息","menuJump":"列表","tableName":"dianyingxinxi"}],"menu":"电影信息模块"}],"hasBackLogin":"否","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"}],
			baseUrl: '',
			carouselList: [],
			menuList: [],
			form: {
				ask: '',
				userid: localStorage.getItem('frontUserid')
			},
			headportrait: localStorage.getItem('frontHeadportrait')?localStorage.getItem('frontHeadportrait'):'',
			Token: localStorage.getItem('frontToken'),
            username: localStorage.getItem('username'),
            notAdmin: localStorage.getItem('frontSessionTable')!='"users"',
			timer: '',
			// 时间
			times: '',
			// 天气
			weather: {},
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
		}
    },
    created() {
		this.$nextTick(() => {
			// 获取时间
			this.setTimes()
		})
		// 获取天气
		this.getWeather()
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
        if(localStorage.getItem('frontToken') && localStorage.getItem('frontToken')!=null) {
			this.getSession()
        }
    },
    mounted() {
        this.activeIndex = localStorage.getItem('keyPath') || '0';


		// banner
		setTimeout(()=>{
			let mySwiper22 = new Swiper(".mySwiper22", {"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"},"freeMode":true,"watchSlidesVisibility":true,"watchSlidesProgress":true,"loopedSlides":8,"slidesPerView":3,"spaceBetween":10})
			let option21 = {"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"},"loopedSlides":8,"autoplay":{"delay":2500,"disableOnInteraction":false},"spaceBetween":10}
			option21.thumbs = {
				swiper: mySwiper22
			}
			new Swiper(".mySwiper21", option21)
		}, 500)

    },
    computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
    },
    watch: {
        $route(newValue) {
            let that = this
            let url = window.location.href
            let arr = url.split('#')
            for (let x in this.menuList) {
                if (newValue.path == this.menuList[x].url) {
                    this.activeIndex = x
                }
            }
            this.Token = localStorage.getItem('frontToken')
            if(arr[1]!='/index/home'){
            	var element = document.getElementById('scrollView');
            	var distance = element.offsetTop;
            	window.scrollTo( 0, distance )
            }else{
            	window.scrollTo( 0, 0 )
            }
        },
		headportrait(){
			this.$forceUpdate()
		},
    },
    methods: {
		preHttp(str) {
			return str && str.substr(0,4)=='http';
		},
      search(tablename) {
        if (this.queryIndex == 0 && this.remendianyingdianyingmingcheng) {
          this.$router.push({path: '/index/' + tablename, query: {indexQueryCondition: this.remendianyingdianyingmingcheng}});
        }
      },
		// 获取当前时间
		setTimes() {
			setInterval(()=>{
				let d = new Date()
				this.times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
			},1000)
		},
		// 获取当前城市天气
		getWeather(){
			axios({
				method: 'get',
				url: 'http://v0.yiketianqi.com/free/day?appid=69475998&appsecret=rldbX1Zl'
			}).then(res => {
				this.weather = res.data
			})
		},

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, {emulateJSON: true}).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm',JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if(res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if(res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if(res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
        handleSelect(keyPath) {
            if (keyPath) {
                localStorage.setItem('keyPath', keyPath)
            }
        },
		toLogin() {
		  this.$router.push('/login');
		},
        logout() {
            localStorage.clear();
            Vue.http.headers.common['Token'] = "";
            this.$router.push('/index/home');
            this.activeIndex = '0'
            localStorage.setItem('keyPath', this.activeIndex)
            this.Token = ''
            this.$forceUpdate()
            this.$message({
                message: '登出成功',
                type: 'success',
                duration: 1000,
            });
        },
		getCarousel() {
			this.$http.get('config/list', {params: { page: 1, limit: 3 }}).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		// 轮播图跳转
		carouselClick(url) {
			if (url) {
				if (url.indexOf('https') != -1) {
					window.open(url)
				} else {
					this.$router.push(url)
				}
			}
		},
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.location.href = `${this.$config.baseUrl}admin/dist/index.html`
			
		},
		goMenu(path) {
            this.$router.push(path);
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.menu-preview {
	  .el-scrollbar {
	    height: 100%;
	  
	    & /deep/ .scrollbar-wrapper-vertical {
	      overflow-x: hidden;
	    }
	  
	    & /deep/ .scrollbar-wrapper-horizontal {
	      overflow-y: hidden;
	  
	      .el-scrollbar__view {
	        white-space: nowrap;
	      }
	    }
	  }
	}
	
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 88px;
				border-radius: 5px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 88px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home:hover {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home.is-active {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user {
				cursor: pointer;
				border: 0;
				padding: 0 10px;
				margin: 0 4px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 88px;
				border-radius: 5px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 88px;
				order: 2;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user:hover {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user.is-active {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service {
				cursor: pointer;
				border: 0;
				padding: 0 10px;
				margin: 0 4px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 88px;
				border-radius: 5px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 88px;
				order: 3;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service:hover {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service.is-active {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop {
				cursor: pointer;
				border: 0;
				padding: 0 10px;
				margin: 0 4px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 88px;
				border-radius: 5px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 88px;
				order: 4;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop:hover {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop.is-active {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back {
				cursor: pointer;
				border: 0;
				padding: 0 10px;
				margin: 0 4px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 88px;
				border-radius: 5px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 88px;
				order: 5;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back:hover {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back.is-active {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item {
				cursor: pointer;
				border: 0;
				padding: 0 10px;
				margin: 0 4px;
				color: #fff;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 88px;
				border-radius: 5px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 88px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item:hover {
				color: #fff;
				background: #FFC174;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item.is-active {
				color: #fff;
				background: #FFC174;
			}
	
	.banner-preview {
	  .el-carousel /deep/ .el-carousel__indicator button {
	    width: 0;
	    height: 0;
	    display: none;
	  }
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: red;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: red;
	}

	.banner-preview .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}

    .chat-content {
        padding-bottom: 20px;
        width: 100%;
        margin-bottom: 10px;
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #eeeeee;
        background: #fff;

        .left-content {
            float: left;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }

        .right-content {
            float: right;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }
    }

    .clear-float {
        clear: both;
    }

	.swiper21 .swiper-button-prev:after {
      display:none;
    }
    .swiper21 .swiper-button-next:after {
      display:none;
    }
    .swiper22 .swiper-button-prev:after {
      display:none;
    }
    .swiper22 .swiper-button-next:after {
      display:none;
    }
	
	.swiper22 .swiper-slide div {
				width: 100%;
				opacity: 0.4;
				height: auto;
			}
	
	.swiper22 .swiper-slide.swiper-slide-thumb-active div {
				opacity: 1;
			}

	
	// -------- search --------
	.main-containers .search .select /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 30px 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	
	.main-containers .search .input /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	// -------- search --------
	
	.main-containers .btn-service {
				border: 0;
				padding: 0 8px;
				margin: 0 0px;
				color: #fff;
				background: none;
				display: none;
				width: auto;
				font-size: 15px;
				line-height: 70px;
				height: 70px;
			}
	
	.main-containers .btn-service:hover {
				opacity: 0.5;
			}
	
	.main-containers .btn-shop {
				border: 0;
				padding: 0 8px;
				margin: 0 0px;
				color: #fff;
				background: none;
				display: none;
				width: auto;
				font-size: 15px;
				line-height: 70px;
				height: 70px;
			}
	
	.main-containers .btn-shop:hover {
				opacity: 0.5;
			}
</style>
