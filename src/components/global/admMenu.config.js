module.exports = [
  {
    name: '用户管理',
    id: '1',
    sub: [{
      name: '注册用户',
      componentName: 'Adm1_4'
    }]
  }
  ,
  {
    name: '学生档案',
    id: '2',
    sub: [{
      name: '基本信息',
      componentName: 'Adm1_1'
    }, {
      name: '社会实践',
      componentName: 'Adm5_1'
    },{
        name: '课外活动',
        componentName: 'Adm5_2'
    },{
      name: '成果奖励',
      componentName: 'Adm5_3'
  },{
    name: '互评管理',
    componentName: 'Adm5_4'
    
}
  ]
  }, {
    name: '教师档案',
    id: '3',
    sub: [{
      name: '基本信息',
      componentName: 'Adm1_2'
    }]
  }, {
    name: '课程档案',
    id: '4',
    sub: [{
      name: '课程开设',
      componentName: 'Adm1_3'
    }]
  }
  ,{
    name: '个人中心',
    id: '5',
    sub: [{
      name: '修改密码',
      componentName: 'Adm3_1'
    },  {
        name: '换绑邮箱',
        componentName: 'Adm3_3'
    }]
}]