import login from '../pages/login.vue'
import layout from '../layout/layout.vue'
// 分模块
import panel from './panel'
import data from './data'
import enter from './enter'
import getOut from './get-out'
import depository from "./depository";
import statistics from "./statistics";
import role from "./role";
import setting from "./setting";
export default [
  panel,
  data,
  enter,
  getOut,
  depository,
  statistics,
  role,
  setting,
  {
    path: '/login',
    component: login
  }
]
