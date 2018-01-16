/**
 * Created by QiHan Wang on 2017/12/25.
 * E-Mail: whenhan@foxmail.com
 * File Name: nav
 */
import React from 'react';
//import dynamic from 'dva/dynamic';

import Loadable from 'react-loadable';


// wrapper of dynamic
/*const dynamicWrapper = (app, models, component) => dynamic({
  app,
  //models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});*/

const Loading = () => <div>Loading...</div>;
const dynamicWrapper = (app, models, component) => Loadable({
  loader: component,
  loading: Loading
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '分析页',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../views/Dashboard/App')),
          },
        ],
      },
      {
        name: '表单页',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: '富文本编辑',
            path: 'rich-text-editor',
            component: dynamicWrapper(app, ['form'], () => import('../views/Forms/RichTextEditor')),
          },
          {
            name: '富文本编辑-LZ',
            path: 'lz-rich-text-editor',
            component: dynamicWrapper(app, ['form'], () => import('../views/Forms/LzRichTextEditor')),
          },
          {
            name: '基础表单',
            path: 'basic-form',
            component: dynamicWrapper(app, ['form'], () => import('../views/Forms/BasicForm')),
          },
          {
            name: '自定义测试',
            path: 'test-rich-text-editor',
            component: dynamicWrapper(app, ['form'], () => import('../views/Forms/TestRichTextEditor')),
          },
          {
            name: '富文本编辑-Quill',
            path: 'quill-rich-text-editor',
            component: dynamicWrapper(app, ['form'], () => import('../views/Forms/QuillRichTextEditor')),
          },
          /*{
            name: '分步表单',
            path: 'step-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
            children: [
              {
                path: 'confirm',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
              },
              {
                path: 'result',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
              },
            ],
          },*/

        ],
      },
      {
        name: '结果',
        path: 'result',
        icon: 'check-circle-o',
        children: [
          {
            name: '成功',
            path: 'success',
            component: dynamicWrapper(app, [], () => <div>Success</div>),
          },
     /*     {
            name: '失败',
            path: 'fail',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
          },*/
        ],
      },
      {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: dynamicWrapper(app, [], () => import('../views/Exception/403')),
          },
          {
            name: '404',
            path: '404',
            component: dynamicWrapper(app, [], () => import('../views/Exception/404')),
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper(app, [], () => import('../views/Exception/500')),
          },
        ],
      },
    ],
  },
 /* {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => <div>login</div>),
          },
   /!*       {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
          },*!/
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BlankLayout')),
    layout: 'BlankLayout',
    children: {
      name: '使用文档',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },*/
];
