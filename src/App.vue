<template>
  <div id="app">
  	<div class="ui inverted menu" v-show = "!logged">
  		<div class= "item">
  			<div class = "field">
  				<input type="text" placeholder = "username" v-model = "user.username">
  			</div>
  			<div class = "item">
  				<div class = "field">
  					<input type="password" placeholder = "password" v-model = "user.password">
  				</div>	
  			</div>
  		</div>
  		<div class="item">
    		<div class="ui primary button" v-on:click = "logIn()">Log-In</div>
  		</div>
  		<div class="item">
    			<div class="ui button" v-on:click = "showRegister()">Sign Up</div>
  		</div>
	</div>

  <div class = "ui inverted large menu" v-show = "logged">
    <router-link to = "/profile">
      <div class = "item">
        <a>Perfil</a>
      </div>
    </router-link>
    <router-link to = "/friends">
     <div class = "item">
       <a>Agregar Amigos</a>
     </div>
    </router-link>
    <router-link to = "/createElement">
     <div class = "item">
       <a>Create Element</a>
     </div>
    </router-link>
    <router-link to = "/elements">
     <div class = "item">
       <a>Administra Element</a>
     </div>
    </router-link>
    <router-link to = "/">
      <div class = "item" v-on:click = "logOut()">
        <a>LogOut</a>
      </div>
    </router-link>
  </div>
    <router-view></router-view>

    <div class="ui inverted vertical footer segment">
    	<div class="ui container">
          	<div class="ui stackable inverted divided equal height stackable grid">
            	<div class="three wide column">
              		<h4 class="ui inverted header">
                		About
              		</h4>
              		<div class="ui inverted link list">
                		<a class="item" href="homepage.html#"> Sitemap</a><a class="item" href="homepage.html#"> Contact Us</a>
              		</div>
            	</div>
            	<div class="three wide column">
              		<h4 class="ui inverted header">
                		Creador
              		</h4>
              		<div class="ui inverted link list">
                		<a class="item" href="homepage.html#">Manuel Padilla</a>
              		</div>
           	 	</div>
            	<div class="seven wide column">
              		
            	</div>
          	</div>
        </div>
      </div>

      <div class = "ui modal" id = "Registro">
      	<i class = "close icon"></i>
      	<div class = "header">Registrp</div>
      	<div class = "ui center aligned grid">
      		<!---<div class = "ui medium image" v-on:click = "uploadImg()">
				<img src="img/imageNo.jpg" id = "imageUsuario">
			</div>-->
      		<div class = "eight wide column">
      			<div class = "ui form">
					   <br>
      				<div class = "field">
      					<input type="text" placeholder = "Name" v-model = "newPerson.name">
      				</div>
      				<div class = "field">
      					<input type="text" placeholder = "username" v-model = "newPerson.username">
      				</div>
      				<div class = "field">
      					<input type="password" placeholder = "Password" v-model = "newPerson.password">
      				</div>
      				<div class = "ui three fields">
      					<div class = "field">
      						<input type="email" placeholder = "Email" v-model = "newPerson.email">
      					</div>
      					<div class="ui error message">
    						  <div class="header">Action Forbidden</div>
    						  <p>You can only sign up for an account once with a given e-mail address.</p>
  						  </div>
  						  <div class = "field">
  							 <input type="text" placeholder = "Phone" v-model = "newPerson.phone">
  						  </div>
  						  <div class = "field">
  							 <input type="text" placeholder="Age" v-model = "newPerson.age">
  						  </div>
      				</div>
              <div class = "field">
                <input type="text" placeholder = "Address" v-model = "newPerson.address">
              </div>
      			</div>
            <br>
      			<div class = "ui blue button" v-on:click = "register()">
      				Registrar
      			</div>
      		</div>
      	</div>
      </div>
  </div>
</template>

<script>
import personService from './services/personService.js'
import authService from './services/authService.js'
var input = '';
export default {
  name: 'app',
  data(){
  	return{
  		logged: JSON.parse(localStorage.getItem('isLogged')),
  		newPerson: {
  			name: '',
  			age: '',
  			email: '',
  			address: '',
  			phone: '', 
  			image: '',
  			username: '',
  			password: ''
  		},
  		user: {
  			username: '',
  			password: ''
  		}  
  	}
  },
  methods: {
  	showRegister(){
  		$('#Registro').modal('show');
  	},
  	uploadImg(){
		input = document.createElement("INPUT");
		input.setAttribute("type", "file");
		input.click();
		input.onchange = this.setImage
	},
	setImage(){
		input = input.value;
		input = input.substring(12, input.length);
		input = 'img/' + input;
		console.log('Input: ', input);
		this.newPerson.image = input;
		$("#imagenUsuario").attr("src", input);
	},
	register(){
		console.log(this.newPerson);
		personService.createPerson(this.newPerson).then(response => {
			alert('Exito');
      this.user.username = this.newPerson.username;
      this.user.password = this.newPerson.password;
      this.logIn();
		}, response => {
			alert('Error registering');
		});

	},
	logIn(){
    personService.getPeople().then(response => {
      var exist = false;
      for(let i = 0; i < response.body.length; i++){
        if(response.body[i].username === this.user.username){
          exist = true;
        }
      }

      if(exist){
        authService.logIn(this.user).then(response => {
          console.log(response.body);
          localStorage.setItem('isLogged',true);
          this.logged = true;
          localStorage.setItem('id', response.body.idPerson);
          this.$router.push({path: '/profile'});
        }, response => {
          alert('Error logging');
        });
      }else{
        alert('Usuario no existe');
      }
    }, response => {
      alert('Error');
    });
		
	},
  logOut(){
    localStorage.setItem('isLogged',false);
    this.logged = false;
    localStorage.setItem('id', 0);
  }
  },
  beforeCreate(){
  	if(localStorage.getItem('isLogged') === null){
  		this.logged = false;
  	}else{
  		this.logged = JSON.parse(localStorage.getItem('isLogged'));
  	}
  	console.log('Before: ' ,this.logged);
  }
}
</script>
