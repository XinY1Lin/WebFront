<template>
    <div>
      <mavon-editor v-model="content" ref="md" @change="change" style="height:300px;width: 400px;" />
   

    </div>
  </template>
   
  <script>

  // 导入组件 及 组件样式
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import marked from 'marked'
import hljs from 'highlight.js'
//获取md文件




  export default {
    

    components: {
      mavonEditor
    },
    // content:输入的markdown
    // html：及时转的html
    data () {
      return {
        content: '',
        html: ''
      }
    },
    methods: {
//         this.$axios({
//     method: 'post',
//     url: '/test/articles',
//     data: {
//         id: self.$route.query.id
//     }
// }).then((res) => {
//     console.log(res)
//     //建一个空的id为markdown的div,将收到的数据解析并放入div中
//     document.getElementById('markdown').innerHTML = marked(res.data)  
//     //渲染文档中代码部分
//     hljs.initHighlighting()
//     //我这里代码高亮未生效，自己手动绑定hljs类
//     this.$("code").addClass('hljs')
// }),
// //marked的配置
// marked.setOptions({
//         renderer: new marked.Renderer(),
//         gfm: true,
//         tables: true,
//         breaks: false,
//         pedantic: false,
//         sanitize: false,
//         smartLists: true,
//         smartypants: false,
//         highlight: function (code) {
//             return hljs.highlightAuto(code).value
//         }
//       }),

      // 所有操作都会被解析重新渲染
      change (value, render) {
        // render 为 markdown 解析后的结果[html]
        this.html = render
      },
      // 提交
      submit () {
        console.log(this.content)
        console.log(this.html)
      }
    },
    mounted () {
   
    }
  }
  </script>