<template>
	<div id = "Elements">
		<div class = "ui center aligned grid">
			<div class = "two wide column"></div>
			<div class = "twelve wide column">
				<div class = "ui three cards">
					<div class = "ui card" v-for = "element in elements">
						<div class = "image">
							<img v-bind:src="element.image">
						</div>
						<div class = "content">
							<div class  ="header">
								{{element.name}}
							</div>
							<div class = "description">
								{{element.description}}
							</div>
						</div>
						<div class = "extra content">
							<div class = "ui two buttons">
								<div class = "ui red basic button" v-on:click = "deleteE(element)">
									Eliminar
								</div>
								<div class = "ui blue basic button" v-on:click = "showModal(element)">
									Modificar
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class = "two wide column"></div>
		</div>
		<div class = "ui modal" id = "ModificarElemento">
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
      						<input type="text" placeholder = "Name" v-model = "currentElement.name">
      					</div>
      					<div class = "field">
      						<input type="text" placeholder = "description" v-model = "currentElement.description">
      					</div>
      				</div>
      				<div class = "ui blue button" v-on:click = "modifyE()">
      					Modificar
      				</div>
      			</div>
      		</div>
      	</div>
	</div>
</template>

<script>
	import personService from './../services/personService'
	import elementService from './../services/elementService'

	export default{
		name: 'Elements',
		data(){
			return{
				user: {}, 
				elements: [],
				currentElement: {
					name: '', 
					description: '', 
					image: 'img/imageNo.jpg'
				}
			}
		},
		methods: {
			showModal(element){
				this.currentElement = element;
				$('#ModificarElemento').modal('show');
			},
			deleteE(element){
				elementService.deleteElement(element.idElement).then(response => {
					elementService.getElements().then(response => {
						this.elements = response.body;
					}, response => {
						alert('Error');
					});
					alert('Elemento Borrado')
				}, response => {
					alert('Error');
				});
			},
			modifyE(){
				elementService.updateElement(this.currentElement, this.currentElement.idElement).then(response => {
					elementService.getElements().then(response => {
						this.elements = response.body;
					}, response => {
						alert('Error');
					});
					alert('Elemento modificado');
				}, respone => {
					alert('Error');
				})
			}
		}, 
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('id')).then(response => {
				this.user = response.body[0];
			}, response => {
				alert('Error');
			});

			elementService.getElements().then(response => {
				this.elements = response.body;
			}, response => {
				alert('Error');
			});
		}	
	}
</script>

<style scoped>
	
</style>