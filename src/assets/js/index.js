
export default [
  {
    id: 1,
    authName: "首页配置",
    icon: 'iconfont icon-setting',
    path: null,
    children: [
      {
        id: 101,
        authName: "轮播图配置",
        path: "/swiper",
      },
      {
        id: 102,
        authName: "热销商品配置",
        path: "/hot",
      },
      {
        id: 103,
        authName: "新品上线配置",
        path: "/new",
      },
      {
        id: 104,
        authName: "为你推荐配置",
        path: "/recommend",
      },
    ],
  },
  {
    id: 2,
    authName: "模块管理",
    icon: 'iconfont icon-mokuaiguanli',
    path: null,
    children: [
      {
        id: 201,
        authName: "分类管理",
        path: "/category",
      },
      {
        id: 202,
        authName: "会员管理",
        path: "/guest",
      },
      {
        id: 203,
        authName: "订单管理",
        path: "/order",
      },
      {
        id: 204,
        authName: "商品管理",
        path: "/good",
      },
      {
        id: 205,
        authName: "添加商品",
        path: "/add",
      },
    ],
  },
  {
    id: 3,
    authName: "系统管理",
    icon: 'iconfont icon-xitong',
    path: null,
    children: [
      {
        id: 301,
        authName: "修改密码",
        path: "/account",
      },
    ],
  },
];
