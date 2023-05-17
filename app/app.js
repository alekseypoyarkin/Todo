import Vue from 'nativescript-vue'

import Home from './components/Home'
import Add from './components/Add'

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
