// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import vueRouter from 'vue-router'
import App from './App.vue'
import Landing from './components/Landing.vue'
import Profile from './components/Profile.vue'

Vue.use(vueRouter);
const router = new vueRouter({
	routes: [
		{
			path: '/',
			name: 'landing', 
			component: Landing
		},
		{
			path: '/profile', 
			name: 'profile', 
			component: Profile
		}
	]
});

new Vue({ // eslint-disable-line no-new
  render: (h) => h(App),
  router
}).$mount('#app');
