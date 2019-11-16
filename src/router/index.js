import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Address from "../views/address/Address";
import AddressEdit from "../views/addressEdit/AddressEdit";
import Collection from "../views/collection/Collection";
import Evaluation from "../views/evaluation/Evaluation";
import EvaluationOne from "../views/evaluationone/EvaluationOne";
import EvaluationDetails from "../views/evaluationdetails/EvaluationDetails";
import Goods from "../views/goods/Goods";
import Location from "../views/location/Location";
import LoginRegistration from "../views/loginregistration/LoginRegistration";
import My from "../views/my/My";
import Myorder from "../views/myorder/Myorder";
import Order from "../views/order/Order";
import OrderComplete from "../views/orderComplete/OrderComplete";
import Recently from "../views/recently/Recently";
import Shoppingcart from "../views/shoppingcart/Shoppingcart";
import Shoppingmall from "../views/shoppingmall/Shoppingmall";
import Sort from "../views/sort/Sort";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/shoppingmall"
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/address",
    name: "address",
    component: Address,
    meta: {
      title: "地址列表"
    }
  },
  {
    path: "/addressEdit",
    name: "addressEdit",
    component: AddressEdit,
    meta: {
      title: "地址编辑"
    }
  },
  {
    path: "/collection",
    name: "collection",
    component: Collection,
    meta: {
      title: "我的收藏"
    }
  },
  {
    path: "/evaluation",
    name: "evaluation",
    component: Evaluation,
    meta: {
      title: "评价中心"
    }
  },
  {
    path: "/goods",
    name: "goods",
    component: Goods,
    meta: {
      title: "商品详情"
    }
  },
  {
    path: "/location",
    name: "location",
    component: Location,
    meta: {
      title: "定位"
    }
  },
  {
    path: "/loginRegistration",
    name: "loginRegistration",
    component: LoginRegistration,
    meta: {
      title: "登录/注册"
    }
  },
  {
    path: "/my",
    component: Home,
    children: [
      {
        path: "",
        name: "my",
        component: My,
        meta: {
          title: "我的"
        }
      }
    ]
  },
  {
    path: "/myorder",
    name: "myorder",
    component: Myorder,
    meta: {
      title: "我的订单"
    }
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    meta: {
      title: "订单结算"
    }
  },
  {
    path: "/ordercomplete",
    name: "ordercomplete",
    component: OrderComplete,
    meta: {
      title: "已完成订单"
    }
  },
  {
    path: "/evaluationone",
    name: "evaluationone",
    component: EvaluationOne,
    meta: {
      title: "评价中心"
    }
  },
  {
    path: "/evaluationdetails",
    name: "evaluationdetails",
    component: EvaluationDetails,
    meta: {
      title: "评价详情"
    }
  },
  {
    path: "/recently",
    name: "recently",
    component: Recently,
    meta: {
      title: "最近浏览"
    }
  },
  {
    path: "/shoppingcart",
    component: Home,
    children: [
      {
        path: "",
        name: "shoppingcart",
        component: Shoppingcart,
        meta: {
          title: "购物车"
        }
      }
    ]
  },
  {
    path: "/shoppingmall",
    component: Home,
    children: [
      {
        path: "",
        name: "shoppingmall",
        component: Shoppingmall,
        meta: {
          title: "商城"
        }
      }
    ]
  },
  {
    path: "/sort",
    component: Home,
    children: [
      {
        path: "",
        name: "sort",
        component: Sort,
        meta: {
          title: "分类"
        }
      }
    ]
  },
  {
    path: "*",
    component: () => import("../views/Error.vue"),
    meta: {
      title: "错误"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
