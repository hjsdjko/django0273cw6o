<template>
<div>
	<div :style='{"border":"5px solid #FFC174","width":"80%","padding":"25px 30px","margin":"10px auto","borderRadius":"30px","background":"linear-gradient(180deg, #10615F 0%, #0A4742 100%)"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'Ξ'" :style='{"fontSize":"14px","lineHeight":"1"}'>
			<el-breadcrumb-item class="item1" to="/"><a>首页</a></el-breadcrumb-item>
			<el-breadcrumb-item class="item2" v-for="(item, index) in breadcrumbItem" :key="index"><a>{{item.name}}</a></el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<div class="news-preview-pv" :style='{"width":"100%","padding":"0 10%","margin":"10px auto","position":"relative","background":"none"}'>
		<el-form :inline="true" :model="formSearch" class="list-form-pv" :style='{"border":"5px solid #FFC174","padding":"10px","alignItems":"center","borderRadius":"90px","flexWrap":"wrap","background":"linear-gradient(360deg, #F4D09B 0%, #FEFAF4 100%)","display":"flex","width":"calc(100% - 250px)","justifyContent":"center","height":"auto"}'>
			<el-form-item :style='{"margin":"0 10px"}'>
				<el-input v-model="title" placeholder="标题"></el-input>
			</el-form-item>
			<el-button type="primary" @click="getNewsList(1)" :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"40px","background":"#8E4033","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}'>
				<span class="icon iconfont icon-chakan14" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}'></span>
				搜索
			</el-button>
		</el-form>
		
		<!-- category -->
		<div class="category" :style='{"border":"5px solid #FFC174","padding":"10px","margin":"20px 0 0","borderRadius":"10px","background":"#0D5451","display":"flex","width":"calc(100% - 250px)","height":"auto"}'>
		  <div class="item" @click="categoryClick(0)" :class="categoryIndex == 0 ? 'active' : ''">全部</div>
		  <div v-for="(item,index) in categoryList" @click="categoryClick(index+1)" :key="index" class="item" :class="categoryIndex == index+1 ? 'active' : ''">{{item.typename}}</div>
		</div>
	
				
				<!-- 样式二 -->
		<div class="list2 index-pv1" :style='{"border":"5px solid #FFC174","padding":"0 10px","borderRadius":"10px","flexWrap":"wrap","background":"#fff","display":"flex","width":"calc(100% - 250px)","justifyContent":"space-between","height":"auto"}'>
			<div :style='{"border":"5px solid #FFC174","padding":"10px","margin":"10px","borderRadius":"10px","color":"#000","background":"#fff","display":"flex","width":"45%","fontSize":"0","position":"relative","height":"auto"}' v-for="item in newsList" :key="item.id" @click="toNewsDetail(item)" class="list-item animation-box">
				<el-image :style='{"width":"220px","objectFit":"cover","borderRadius":"30px","display":"inline-block","height":"180px"}' :src="baseUrl + item.picture" :fit="fill"></el-image>
				<div class="item-info" :style='{"width":"280px","padding":"10px","overflow":"hidden","flexWrap":"wrap","display":"flex","height":"auto"}'>
					<div :style='{"whiteSpace":"nowrap","overflow":"hidden","color":"inherit","width":"100%","lineHeight":"32px","fontSize":"16px","textOverflow":"ellipsis","fontWeight":"bold","order":"1"}' class="title ">{{item.title}}</div>
					<div :style='{"whiteSpace":"nowrap","overflow":"hidden","color":"inherit","width":"100%","lineHeight":"1.5","fontSize":"15px","textOverflow":"ellipsis","order":"2"}' class="introduction ">{{item.introduction}}</div>
					<div :style='{"padding":"0","order":"7"}'>
					  <span class="icon iconfont icon-shijian21" :style='{"margin":"0 5px 0 0","lineHeight":"1.5","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"1.5","fontSize":"14px"}'>{{item.addtime}}</span>
					</div>
					<div :style='{"width":"100%","padding":"0","order":"6"}'>
					  <span class="icon iconfont icon-geren16" :style='{"margin":"0 5px 0 0","lineHeight":"1.5","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"1.5","fontSize":"14px"}'>{{item.name}}</span>
					</div>
					<div :style='{"padding":"0 10px 0 0","order":"3"}'>
					  <span class="icon iconfont icon-zan10" :style='{"margin":"0 5px 0 0","lineHeight":"1.5","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"1.5","fontSize":"14px"}'>{{item.thumbsupnum}}</span>
					</div>
					<div :style='{"padding":"0 10px 0 0","order":"4"}'>
					  <span class="icon iconfont icon-shoucang10" :style='{"margin":"0 5px 0 0","lineHeight":"1.5","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"1.5","fontSize":"14px"}'>{{item.storeupnum}}</span>
					</div>
					<div :style='{"padding":"0","order":"5"}'>
					  <span class="icon iconfont icon-chakan9" :style='{"margin":"0 5px 0 0","lineHeight":"1.5","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"1.5","fontSize":"14px"}'>{{item.clicknum}}</span>
					</div>
				</div>
			</div>
		</div>
				
				
				
				
				
				
				
				
		<el-pagination
		  background
		  id="pagination" class="pagination"
		  :pager-count="7"
		  :page-size="pageSize"
		  prev-text="上一页"
		  next-text="下一页"
		  :hide-on-single-page="true"
		  :layout='["prev","pager","next"].join()'
		  :total="total"
		  :style='{"width":"1200px","padding":"0","margin":"10px auto","whiteSpace":"nowrap","color":"#333","fontWeight":"500"}'
		  @current-change="curChange"
		  @prev-click="prevClick"
		  @next-click="nextClick"
		></el-pagination>

		<!-- 热门信息 -->
		<div class="hot" :style='{"boxShadow":"none","top":"0","background":"#fff","width":"240px","position":"absolute","right":"10%","height":"auto"}'>
		  <div :style='{"border":"5px solid #FFC174","color":"#fff","borderRadius":"10px","textAlign":"center","background":"#0D5451","width":"100%","lineHeight":"60px","fontSize":"14px"}'>热门信息</div>
		  <div :style='{"border":"5px solid #FFC174","width":"100%","padding":"5px","borderRadius":"10px","background":"#fff","height":"auto"}'>
		    <div v-for="item in hotList" :key="item.id" :style='{"border":"5px solid #FFC174","padding":"5px","margin":"0 0 10px","borderRadius":"30px","background":"#20454E","width":"100%","height":"auto"}' @click="toNewsDetail(item)">
		      <img :style='{"width":"100%","objectFit":"cover","borderRadius":"30px","display":"block","height":"120px"}' :src="baseUrl + item.picture" alt="">
		      <div :style='{"padding":"4px 5px 0","lineHeight":"2","fontSize":"14px","color":"#fff"}'>{{ item.title }}</div>
		      <div :style='{"padding":"0 5px","lineHeight":"2","fontSize":"12px","color":"#fff","textAlign":"right"}'>{{item.addtime}}</div>
		    </div>
		  </div>
		</div>
		<!-- 最新动态 -->
		<div class="news" :style='{"width":"calc(100% - 250px)","margin":"30px 0 0","background":"#fff","height":"auto"}'>
		  <div :style='{"border":"5px solid #FFC174","padding":"0 20px","color":"#FFC174","borderRadius":"10px","textAlign":"center","background":"#0D5451","width":"100%","lineHeight":"60px","fontSize":"18px","fontWeight":"bold"}'>最新动态</div>
		  <div :style='{"border":"5px solid #FFC174","padding":"20px","borderRadius":"10px","background":"#fff","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
		    <div v-for="item in recommendList" :key="item.id" :style='{"border":"5px solid #FFC174","padding":"10px","borderRadius":"30px","color":"#000","background":"#fff","width":"23%","height":"auto"}' @click="toNewsDetail(item)">
		      <img :style='{"width":"100%","objectFit":"cover","borderRadius":"30px","display":"block","height":"150px"}' :src="baseUrl + item.picture" alt="">
		      <div :style='{"padding":"0 10px","lineHeight":"32px","fontSize":"16px","color":"inherit","textAlign":"center","fontWeight":"bold"}'>{{ item.title }}</div>
		      <div :style='{"padding":"0 10px","lineHeight":"12px","fontSize":"14px","color":"inherit","textAlign":"center"}'>{{item.addtime}}</div>
		    </div>
		  </div>
		</div>
	</div>
</div>
</template>

<script>
	export default {
		//数据集合
		data() {
			return {
				baseUrl: this.$config.baseUrl,
				breadcrumbItem: [
				  {
					name: '电影资讯'
				  }
				],
				newsList: [],
				total: 1,
				pageSize: 10,
				totalPage: 1,
				layouts: '',
				title: '',
				categoryIndex: 0,
				categoryList: [],
				hotList: [],
				recommendList: [],
			}
		},
		created() {
			this.getCategoryList()
			this.getNewsList(1);
			this.getHotList()
			this.getRecommendList()
		},
		//方法集合
		methods: {
			getCategoryList(){
				this.$http.get('newstype/list', {}).then(res => {
					if (res.data.code == 0) {
						this.categoryList = res.data.data.list
					}
				});
			},
			categoryClick(index) {
				this.categoryIndex = index
				this.getNewsList()
			},
			getNewsList(page) {
				let params = {page, limit: this.pageSize,sort:'addtime',order:'desc'};
				let searchWhere = {};
				if(this.title != '') searchWhere.title = '%' + this.title + '%';
				if(this.categoryIndex!=0){
					searchWhere.typename = this.categoryList[this.categoryIndex - 1].typename
				}
				this.$http.get('news/list', {params: Object.assign(params, searchWhere)}).then(res => {
					if (res.data.code == 0) {
						this.newsList = res.data.data.list;
						this.total = res.data.data.total;
						this.pageSize = Number(res.data.data.pageSize);
						this.totalPage = res.data.data.totalPage;
					}
				});
			},
			getHotList(){
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get('news/autoSort', {params: params}).then(res => {
					if (res.data.code == 0) {
						this.hotList = res.data.data.list;
					}
				});
			},
			getRecommendList(){
				let url = 'news/autoSort'
				if(localStorage.getItem('frontToken')){
					url = 'news/autoSort2'
				}
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get(url, {params: params}).then(res => {
					if (res.data.code == 0) {
						this.recommendList = res.data.data.list;
					}
				});
			},
			curChange(page) {
				this.getNewsList(page);
			},
			prevClick(page) {
				this.getNewsList(page);
			},
			nextClick(page) {
				this.getNewsList(page);
			},
			toNewsDetail(item) {
				this.$router.push({path: '/index/newsDetail', query: {id: item.id}});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 15px;
		color: #FFC174;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb .item1 /deep/ .el-breadcrumb__inner a {
		color: #FFC174;
		display: inline-block;
	}
	
	.breadcrumb-preview .el-breadcrumb .item2 /deep/ .el-breadcrumb__inner a {
		color: #FFC174;
		display: inline-block;
	}
	
	.news-wrap {
	  width: 1000px;
	  margin: 0 auto;
	}
	.news-item {
	  height: 200px;
	  width: auto;
	  margin-bottom: 30px;
	  cursor: pointer;
	}
	.news-item-text {
	  width: calc(100% - 215px);
	  display: inline-block;
	  vertical-align: top;
	  margin-left: 15px;
	}
	.news-item-text-title {
	  font-size: 16px;
	  margin-bottom: 15px;
	}
	.news-item-text-intro {
	  font-size: 14px;
	  color: #666;
	}
	
	.hide1 {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.hide2 {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.hide3 {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	
	.index-pv1 .animation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		z-index: initial;
	}
	
	.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				color: #fff !important;
				background: #20454E !important;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
	}
	
	.index-pv1 .animation-box img {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
	}
	
	.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
		
	#pagination.el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0 10px;
				margin: 0 5px;
				color: #fff;
				background: #0D5451;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0 10px;
				margin: 0 5px;
				color: #fff;
				background: #FFC174;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0 10px;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0 10px;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}
	
	#pagination.el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #000;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #CBCBCB;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #FFC174;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #FFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #FFC174;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #606266;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #606266;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 14px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	#pagination.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 14px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.news-preview-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #000;
				border-radius: 40px;
				padding: 0 10px;
				margin: 0;
				outline: none;
				color: #000;
				background: none;
				width: 400px;
				font-size: 14px;
				line-height: 42px;
				height: 42px;
			}
	
	.news-preview-pv .category .item {
				cursor: pointer;
				border-radius: 4px;
				margin: 0 10px 0 0;
				color: #fff;
				background: none;
				width: 72px;
				font-size: 15px;
				line-height: 36px;
				text-align: center;
			}
	
	.news-preview-pv .category .item:hover {
				color: #FFC174;
				background: none;
				font-weight: bold;
			}
	
	.news-preview-pv .category .item.active {
				color: #FFC174;
				background: none;
				font-weight: bold;
			}
	
	.news-preview-pv .list9 .item .image {
				object-fit: cover;
				display: block;
				width: 100%;
				transition: 0.3s;
				height: 100%;
			}
	
	.news-preview-pv .list9 .item:hover .image {
				transform: scale(1.1);
			}
	
	.news-preview-pv .list9 .item .info {
				padding: 10px;
				left: 0;
				bottom: -100%;
				background: rgba(0,0,0,.5);
				width: 100%;
				position: absolute;
				transition: 0.3s;
				height: 100%;
			}
	
	.news-preview-pv .list9 .item:hover .info {
				bottom: 0;
			}
</style>
