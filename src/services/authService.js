import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

var url = 'https://examen2ux.herokuapp.com/ux/';

export default{
	logIn(user){
		return Vue.http.post(url + 'login', user);
	},
	logOut(){
		return Vue.http.get(url + 'logout');
	}
}