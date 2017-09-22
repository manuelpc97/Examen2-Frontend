import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

var url = 'https://examen2ux.herokuapp.com/ux/';

export default{
	createPerson(person){
		return Vue.http.post(url + 'Person', person);
	},
	updatePerson(person, idPerson){
		return Vue.http.put(url + 'Person/' + idPerson, person);
	}, 
	deletePerson(idPerson){
		return Vue.http.delete(url + 'Person/' +idPerson);
	}, 
	getPeople(){
		return Vue.http.get(url + 'People');
	},
	getPersonById(idPerson){
		return Vue.http.get(url + 'PersonById/' + idPerson);
	}, 
	getPersonByName(name){
		return Vue.http.get(url + 'PersonByName/' + name);
	},
	addFriend(friend,idPerson){
		return Vue.http.put(url + 'addFriend/' + idPerson, friend);
	},
	deleteFriend(friend,idPerson){
		return Vue.http.put(url + 'deleteFriend/' + idPerson, friend);
	}
}