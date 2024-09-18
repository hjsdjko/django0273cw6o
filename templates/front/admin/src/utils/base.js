const base = {
    get() {
        return {
            url : "http://localhost:8080/django0273cw6o/",
            name: "django0273cw6o",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于协同过滤算法的电影个性化推荐系统"
        } 
    }
}
export default base
