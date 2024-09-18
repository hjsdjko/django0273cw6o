<template>
<div class="forum-preview" :style='{"width":"100%","padding":"0 10%","margin":"10px auto","position":"relative","background":"none"}'>
    <div :style='{"width":"100%","margin":"0 auto","background":"#8E4033","height":"auto","order":"2"}'>
		<div :style='{"padding":"0 10px","color":"#FFC174","textAlign":"center","width":"100%","lineHeight":"120px","fontSize":"26px","fontWeight":"bold","height":"auto"}'>交流论坛</div>
	</div>
    <el-form :style='{"border":"0","padding":"20px","boxShadow":"none","margin":"0 auto 10px","alignItems":"center","display":"flex","justifyContent":"center","borderRadius":"40px","flexWrap":"wrap","background":"none","width":"80%","height":"auto","order":"1"}' :inline="true" :model="formSearch" class="list-form-pv">
		<el-form-item :style='{"margin":"0 0"}'>
			<el-input v-model="title" placeholder="标题"></el-input>
		</el-form-item>
		<div :style='{"display":"flex"}'>
			<el-button class="searchBtn" type="primary" @click="getForumList(1)">
				<span class="icon iconfont icon-shouye-zhihui" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}'></span>
				查询
			</el-button>
			<el-button class="pubBtn" type="primary" @click="toForumAdd">
				<span class="icon iconfont icon-shouye-zhihui" :style='{"color":"#FFC174","margin":"0 10px 0 0","fontSize":"14px"}'></span>
				发布帖子
			</el-button>
		</div>
    </el-form>
	<div class="z-box" :style='{"padding":"20px","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3)","margin":"0px auto 0","borderRadius":"30px","background":"#fff","width":"80%","position":"relative","order":"3","zIndex":"1"}'>
		<div class="section-content" v-for="item in forumList" :key="item.id" @click="toForumDetail(item)">
		  <div :style='{"width":"100%","margin":"0 0 10px","fontSize":"15px","color":"#000","fontWeight":"bold"}' class="item-style">{{item.title}}</div>
		  <div :style='{"color":"#909090","padding":"0 40px 0 0","fontSize":"13px"}' class="item-style">发布人：{{item.username}}</div>
		  <div :style='{"color":"#909090","fontSize":"13px"}' class="item-style">{{item.addtime}}</div>
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
	
</div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
		formSearch: {},
        title: '',
        layouts: '',
        forumList: [],
        total: 1,
        pageSize: 10,
        totalPage: 1
      }
    },
    created() {
      this.getForumList(1);
    },
    //方法集合
    methods: {
      getForumList(page) {
        let params = {page, limit: this.pageSize, isdone: '开放', sort: 'istop,toptime', order: 'desc,desc'};
        let searchWhere = {};
        if(this.title != '') searchWhere.title = '%' + this.title + '%';
        this.$http.get('forum/flist', {params: Object.assign(params, searchWhere)}).then(res => {
          if (res.data.code == 0) {
            this.forumList = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.totalPage = res.data.data.totalPage;
          }
        });
      },
      curChange(page) {
        this.getForumList(page);
      },
      prevClick(page) {
        this.getForumList(page);
      },
      nextClick(page) {
        this.getForumList(page);
      },
      toForumAdd() {
        this.$router.push('/index/forumAdd');
      },
      toForumDetail(item) {
        this.$router.push({path: '/index/forumDetail', query: {id: item.id}});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .section {
    width: 900px;
    margin: 0 auto;
  }

  .section-content {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .section-content:hover {
    background-color: #E4E7ED;
    color: #fff;
  }
  .item-style {
    color: #909399;
    font-weight: 400;
  }
  .section-btn {
    text-align: right;
    margin-bottom: 15px;
    padding-right: 10px;
  }
  
	.forum-preview .el-form-item /deep/ .el-form-item__content {
				display: flex;
				align-items: center;
			}
	
	.forum-preview .el-form-item .el-input /deep/ .el-input__inner {
				border: 4px solid #FFC174;
				border-radius: 30px;
				padding: 0 10px;
				margin: 0;
				outline: none;
				color: #000;
				background: linear-gradient(360deg, #F4D09B 0%, #FEFAF4 100%);
				width: 500px;
				font-size: 14px;
				line-height: 60px;
				height: 60px;
			}
	
	.forum-preview .searchBtn {
				cursor: pointer;
				border: 0;
				padding: 0px 15px;
				margin: 0 10px 0 -124px;
				z-index: 1;
				color: #fff;
				font-size: 14px;
				line-height: 50px;
				border-radius: 30px;
				outline: none;
				background: #8E4033;
				width: 120px;
				height: 50px;
			}
	
	.forum-preview .searchBtn:hover {
				opacity: 0.7;
			}
	
	.forum-preview .pubBtn {
				cursor: pointer;
				border: 0;
				border-radius: 30px;
				padding: 0px 15px;
				margin: 0 10px 0 0;
				outline: none;
				color: #FFC174;
				background: #0B4D49;
				width: 140px;
				font-size: 14px;
				line-height: 50px;
				height: 50px;
			}
	
	.forum-preview .pubBtn:hover {
				background: rgba(64, 158, 255, .5);
			}
	
	.forum-preview .z-box .section-content {
				cursor: pointer;
				padding: 20px;
				color: #333;
				background: #fff;
				display: flex;
				width: 100%;
				border-color: #D8D8D8;
				border-width: 0 0 1px 0;
				align-items: center;
				border-style: solid;
				flex-wrap: wrap;
			}
	
	.forum-preview .z-box .section-content:hover {
				color: #fff;
				background: #FFC17450;
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
</style>
