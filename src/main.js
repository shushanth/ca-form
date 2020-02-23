import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: renderElement => renderElement(App),
}).$mount('#app');
