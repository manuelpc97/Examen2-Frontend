import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

var url = 'https://examen2ux.herokuapp.com/ux/';

export default{
	createElement(element){
		return Vue.http.post(url + 'Element', element);
	}, 
	updateElement(element, id){
		return Vue.http.put(url+'Element/'+id, element);
	}, 
	deleteElement(id){
		return Vue.http.delete(url + 'Element/' + id);
	},
	getElements(){
		return Vue.http.get(url + 'Elements');
	}
}