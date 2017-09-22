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
							<label>Name</label>
							<input type="text" v-model = "newElement.name">
						</div>
						<div class = "field">
							<label>Description</label>
							<input type="text" v-model = "newElement.description">
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
					name: '',
					image: 'img/imageNo.jpg', 
					description: ''
				}
			}
		},
		methods: {
			createElement(){
				elementService.createElement(this.newElement).then(response => {
					this.newElement = {
					name: '',
					image: 'img/imageNo.jpg', 
					description: ''
				};
				}, response => {
					alert('Error creating element');
				});
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