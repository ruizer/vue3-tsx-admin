/**
 * @description 路由信息
 * @param       {Object}  路由meta信息
 * @param       {String} meta.require 路由是否需要登录验证，值为false不需要
 * @param       {String} meta.title 路由名称
 * @param       {String} meta.nav 某个一级导航下路由，用来做高亮
 * @param       {String} meta.navLower 某个二级导航下路由，用来做高亮
 * @param       {String} meta.openKey 菜单展开关联路由name
 */

import { RouteRecordRaw } from 'vue-router'

// layout文件夹下路由
let layoutRoutes: Array<RouteRecordRaw> = []
const asyncLayoutFiles = require.context('./layout', false, /^((?!index).)*\.ts$/)

asyncLayoutFiles.keys().forEach((key) => {
  layoutRoutes = layoutRoutes.concat(asyncLayoutFiles(key).default)
})

// 当前目录下路由
let currentRoutes: Array<RouteRecordRaw> = []
const asyncCurrentFiles = require.context('./', false, /^((?!index).)*\.ts$/)

asyncCurrentFiles.keys().forEach((key) => {
  currentRoutes = currentRoutes.concat(asyncCurrentFiles(key).default)
})

export default [...layoutRoutes, ...currentRoutes]
