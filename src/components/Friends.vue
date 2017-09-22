<template>
	<div class = "Friends">
		<div class = "ui center aligned grid">
			<div class  ="one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">
					Usuarios

				</div>
				<div class="item">
    				<div class="ui icon input">
      					<input type="text" placeholder="No Filter for no filter" v-model = "filter">
      					<button v-on:click = "searchByName()">
      					<i class="search icon"> </i>
      					</button>
    				</div>
  				</div>
  				<br>
				<div class = "ui two cards" style="overflow-y:scroll;max-height: 400px;">
					<div class = "ui fluid card" v-for = "element in users">
						<div class="ui black ribbon label">{{element.name}}</div>
						<div class="image">
      						<img src=  "http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png">
    					</div>
    					<div class="content">
      						
      						<div class="meta">
        						<a>{{element.email}}</a>
      						</div>
      						<div class="description">
      							{{element.phone}}<br>
      							{{element.address}}<br>
      						</div>
    					</div>
    					<div class="extra content" >
      						<div class = "ui basic blue button" v-on:click = "addFriend(element)">
      							Agregar
      						</div>
    					</div>
					</div>
				</div>
			</div>
			<div class  ="one wide column">
				<div class = "ui vertical divider"></div>
			</div>
			<div class = "seven wide column">
				<div class = "ui big message">
					Mis amigos
				</div>

				<div class = "ui two cards" style="overflow-y:scroll;max-height: 400px;">
					<div class = "ui fluid card" v-for = "friend in friends">
						<div class="ui black ribbon label">{{friend.name}}</div>
						<div class="image">
      						<img src=  "http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png">
    					</div>
    					<div class="content">
      						
      						<div class="meta">
        						<a>{{friend.email}}</a>
      						</div>
      						<div class="description">
      							{{friend.phone}}<br>
      							{{friend.address}}<br>
      						</div>
    					</div>
    					<div class="extra content" >
      						<div class = "ui basic red button" v-on:click = "deleteFriend(friend)">
      							Eliminar
      						</div>
    					</div>
					</div>
				</div>
			</div>
			<div class  ="one wide column"></div>
		</div>	
	</div>
</template>

<script >
	import personService from './../services/personService.js'

	export default {
		name: 'Friends',
		data(){
			return{
				user: {},
				friends: [],
				users: [],
				filter: 'No Filter'	
			}
		},
		methods: {
			searchByName(){
				console.log('Funcion');
				if(!(this.filter === 'No Filter')){
					console.log('Entro');
					personService.getPersonByName(this.filter).then(response => {
						if(response.body.length === 0){
							alert('Usuario no existe');
							this.filter = 'No Filter';
							this.searchByName();
						}else{
						this.users = response.body;
						console.log(response.body);	
						}
					}, reply => {
						alert('Error searching');
					});	
				}else{
					this.users = [];
					personService.getPeople().then(response => {
						for(let i = 0; i < response.body.length; i++){
							if(!(response.body[i].idPerson === JSON.parse(localStorage.getItem('id')))){
								this.users.push(response.body[i]);
							}
						}
					}, response => {
						alert('Error getting users');
					});
				}
				
			},
			addFriend(element){
				var alreadyFriends = false;

				for(let i = 0; i < this.user.friends.length; i++){
					if(element.idPerson === this.user.friends[i]){
						alreadyFriends = true;
					}
				}
				if(alreadyFriends){
					alert('Ya son amigos');
				}else{
					this.friends = [];
					personService.addFriend({friend: element.idPerson}, this.user.idPerson).then(response => {
						personService.addFriend({friend: this.user.idPerson}, element.idPerson).then(response => {

						}, response => {
							alert('Error adding');
						});
						personService.getPersonById(localStorage.getItem('id')).then(response => {
							this.user = response.body[0];

							for(let i = 0; i < this.user.friends.length; i++){
								personService.getPersonById(this.user.friends[i]).then(response => {
									this.friends.push(response.body[0]);
								}, response => {
									alert('Error');
								});
							}
						}, response => {
							alert('Error getting user');
						});
					}, response => {
						alert('Error adding friend');
					});	
				}
				
			},
			deleteFriend(element){
				this.friends = [];

				personService.deleteFriend({friend: element.idPerson}, this.user.idPerson).then(response => {
					personService.deleteFriend({friend: this.user.idPerson}, element.idPerson).then(response => {
					}, response => {
						alert('Error deleting');
					});

					personService.getPersonById(localStorage.getItem('id')).then(response => {
						this.user = response.body[0];

						for(let i = 0; i < this.user.friends.length; i++){
							personService.getPersonById(this.user.friends[i]).then(response => {
								this.friends.push(response.body[0]);
							}, response => {
								alert('Error');
							});
						}
					}, response => {
						alert('Error getting user');
					});
				}, response => {
					alert('Error deleting friend');
				});
			}
		},

		beforeCreate(){
			personService.getPeople().then(response => {
				for(let i = 0; i < response.body.length; i++){
					if(!(response.body[i].idPerson === JSON.parse(localStorage.getItem('id')))){
						this.users.push(response.body[i]);
					}
				}
			}, response => {
				alert('Error getting users');
			});

			personService.getPersonById(localStorage.getItem('id')).then(response => {
				this.user = response.body[0];

				for(let i = 0; i < this.user.friends.length; i++){
					personService.getPersonById(this.user.friends[i]).then(response => {
						this.friends.push(response.body[0]);
					}, response => {
						alert('Error');
					});
				}
			}, response => {
				alert('Error getting user');
			});
		}
	}
</script>

<style scoped>
	#Friends{
		height: 7000px;
	}
</style>