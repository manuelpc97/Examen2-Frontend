<template>
	<div class = "Profile">
		<div class = "ui center aligned grid">
			<div class = "five wide column"></div>
			<div class = "six wide column">
			<div class = "ui big message">
				Mi Perfil
			</div>
				<div class = "ui fluid card">
					<div class = "small image">
						<img src="img/imageNo.jpg">
					</div>
					<div class = "content">
						<div class = "header">
							{{user.name}}
						</div>
						<div class = "description">
							<a>Email: {{user.email}}</a><br>
							<a>Phone: {{user.phone}}</a><br>
							<a>Address: {{user.address}}</a><br>
							<a>Age: {{user.age}}</a><br>
						</div>
					</div>
					<div class = "extra content">
						<div class = "ui basic blue button" v-on:click = "showModifyModal()">
							Modificar
						</div>
					</div>
				</div>
			</div>
			<div class = "five wide column"></div>
		</div>

		<div class = "ui modal" id = "Modificar">
			<i class = "close icon"></i>
      	<div class = "header">Modificar</div>
      	<div class = "ui center aligned grid">
      		<!---<div class = "ui medium image" v-on:click = "uploadImg()">
				<img src="img/imageNo.jpg" id = "imageUsuario">
			</div>-->
      		<div class = "eight wide column">
      			<div class = "ui form">
					   <br>
      				<div class = "field">
      					<input type="text" placeholder = "Name" v-model = "user.name">
      				</div>
      				<div class = "field">
      					<input type="text" placeholder = "username" v-model = "user.username">
      				</div>
      				<div class = "field">
      					<input type="password" placeholder = "Password" v-model = "user.password">
      				</div>
      				<div class = "ui three fields">
      					<div class = "field">
      						<input type="email" placeholder = "Email" v-model = "user.email">
      					</div>
      					<div class="ui error message">
    						  <div class="header">Action Forbidden</div>
    						  <p>You can only sign up for an account once with a given e-mail address.</p>
  						  </div>
  						  <div class = "field">
  							 <input type="text" placeholder = "Phone" v-model = "user.phone">
  						  </div>
  						  <div class = "field">
  							 <input type="text" placeholder="Age" v-model = "user.age">
  						  </div>
      				</div>
              <div class = "field">
                <input type="text" placeholder = "Address" v-model = "user.address">
              </div>
      			</div>
      			<br>
      			<div class = "ui blue button" v-on:click = "modify()">
      				Modificar
      			</div>
      		</div>
      	</div>
		</div>
	</div>
</template>

<script >
	import personService from './../services/personService.js'
	export default{
		name: 'Profile',
		data(){
			return {
				user: {}
			}
		},
		methods: {
			showModifyModal(){
				$('#Modificar').modal('show');
			},
			modify(){
				personService.updatePerson(this.user, this.user.idPerson). then(response => {
					alert('Updated')
				}, response => {
					alert('Error updating');
				});
			}
		},
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('id')).then(response => {
				this.user = response.body[0];
				console.log('user: ', this.user);
			}, response => {
				alert('Error');
			})
		}
	}
</script>

<style scoped>
	
</style>