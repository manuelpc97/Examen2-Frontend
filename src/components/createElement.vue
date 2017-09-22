<template>
	<div id = "createElement">
		<div class = "ui center algined grid">
			<div class = "four wide column"></div>
				<div class = "eight wide column">
					<div class = "ui big message">
						Creacion de elementos
					</div>
					<br>
					<div class = "ui form">
						<div class = "field">
							<label>Nombre</label>
							<input type="text" v-model = "newElement.nombre">
						</div>
						<div class = "field">
							<label>Peso</label>
							<input type="text" v-model = "newElement.peso">
						</div>
						<div class = "field">
							<label>Tipo</label>
							<input type="text" v-model = "newElement.tipo">
						</div>
						<div class = "field">
							<label>Detonada</label>
							<input type="text" v-model = "newElement.detonada">
						</div>
						<div class = "field">
							<label>Energia</label>
							<input type="text" v-model = "newElement.energia">
						</div>
					</div>
					<br>
					<div class = "ui blue basic button" v-on:click = "createElement()">
						Crear
					</div>
				</div>
			<div class = "four wide column"></div>
		</div>
	</div>
</template>

<script>
	import personService from './../services/personService'
	import elementService from './../services/elementService'

	export default{
		name: 'createElement',
		data(){
			return{
				user: {},
				newElement: {
					nombre: '',
					tipo: '',
					peso: '',
					detonada: '',
					lugar: '',
					energia: ''
				}
			}
		},
		methods: {
			createElement(){
				if(this.verifyTipo() && this.verifyDetonada()){
					console.log('Entro');
					elementService.createElement(this.newElement).then(response => {
						this.newElement = {
							nombre: '',
							tipo: '',
							peso: '',
							detonada: '',
							lugar: '',
							energia: ''
						};
						alert('Exito');
				}, response => {
					alert('Error creating element');
				});
				}else{
					alert('Campos erroneos');
				}
				
			},
			verifyTipo(){
				if(this.newElement.tipo === 'fusion' || this.newElement.tipo === 'fision'){
					return true;
				}
				return false;
			},
			verifyDetonada(){
				if(this.newElement.detonada === 'true' || this.newElement.detonada === 'false'){
					if(this.newElement.detonada === 'true'){
						this.newElement.detonada === true;
					}else{
						 this.newElement.detonada === false;
					}
					return true;
				}
				return false;
			}
		}, 
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('id')).then(response => {
				this.user = response.body[0];
			}, response => {
				alert('Error');
			});
		}
	}
</script>

<style scoped>
	
</style>