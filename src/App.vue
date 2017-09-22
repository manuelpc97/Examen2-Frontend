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
	</div>

  <div class = "ui inverted large menu" v-show = "logged">
    <router-link to = "/createElement">
     <div class = "item">
       <a>Crear Bomba</a>
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
  			image: 'http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png',
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
      this.newPerson = {
        name: '',
        age: '',
        email: '',
        address: '',
        phone: '', 
        image: 'http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png',
        username: '',
        password: ''
      };
      $('#Registro').modal('hide');
		}, response => {
			alert('Error registering');
		});

	},
	logIn(){
    personService.getPeople().then(response => {
      var exist = false;
      for(let i = 0; i < response.body.length; i++){
        if(response.body[i].username === this.user.username){
          if(response.body[i].password === this.user.password){
            exist = true;
          }
        }
      }
      


      if(exist){
        authService.logIn(this.user).then(response => {
          console.log(response.body);
          this.$router.push({path: '/createElement'});
          localStorage.setItem('isLogged',true);
          this.logged = true;
          localStorage.setItem('id', response.body.idPerson);
          this.user.username = '';
          this.user.password = '';
        }, response => {
          alert('Error logging');
        });
      }else{
        alert('Malas Credenciales');
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
