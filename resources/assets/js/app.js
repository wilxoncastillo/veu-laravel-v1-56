require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('tareas', require('./components/TareasComponent.vue'));

const app = new Vue({
    el: '#app'
});
