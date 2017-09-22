<template>
	<div id = "Elements">
		<div class = "ui center aligned grid">
			<div class = "two wide column"></div>
			<div class = "twelve wide column">
				<div class="item">
    				<div class="ui icon input">
      					<input type="text" placeholder="No Filter for no filter" v-model = "word">
      					<button v-on:click = "search()">
      					<i class="search icon"> </i>
      					</button>
    				</div>
  				</div>
  				<br>
				<div class = "ui three cards">
					<div class = "ui card" v-for = "element in elements">
						<div class = "image">
							<img v-bind:src="element.image">
						</div>
						<div class = "content">
							<div class  ="header">
								{{element.nombre}}
							</div>
							<div class = "meta">
								<a>Peso: {{element.peso}}</a><br>
								<a>Energia: {{element.energia}}</a><br>
							</div>
							<div class = "description">
								Tipo: {{element.tipo}}<br>
								Detonada: {{element.detonada}}<br>
								Lugar: {{element.lugar}}<br>
							</div>
						</div>
						<div class = "extra content">
							<div class = "ui three buttons">
								<div class = "ui red basic button" v-on:click = "deleteE(element)">
									Eliminar
								</div>
								<div class = "ui blue basic button" v-on:click = "showModal(element)">
									Modificar
								</div>
								<div class = "ui green basic button" v-on:click = "showDetonar(element)">
									Detonar
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
      					<label>Nombre</label>
      						<input type="text" placeholder = "Nombre" v-model = "currentElement.nombre">
      					</div>
      					<div class = "field">
      					<label>Peso</label>
      						<input type="text" placeholder = "Peso" v-model = "currentElement.peso">
      					</div>
      					<div class = "field">
      					<label>Tipo</label>
      						<input type="text" placeholder = "Tipo" v-model = "currentElement.tipo">
      					</div>
      					<div class = "field">
      					<label>Detonada</label>
      						<input type="text" placeholder = "Detonada" v-model = "currentElement.detonada">
      					</div>
      					<div class = "field">
      					<label>Energia</label>
      						<input type="text" placeholder = "Energia" v-model = "currentElement.energia">
      					</div>
      				</div>
      				<div class = "ui blue button" v-on:click = "modifyE()">
      					Modificar
      				</div>
      			</div>
      		</div>
      	</div>
      	<div class = "ui modal" id = "detonacion">
      	<i class = "close icon"></i>
      		<div class = "header">
      			<div class ="ui form">
      				<div class = "field">
      					<label>Ingrese ciudad: </label>
      					<input type="text" v-model = "currentElement.lugar">
      				</div>
      			</div>
      			<div class ="ui basic red button" v-on:click = "detonar()">detonar</div>
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
				word: '',
				currentElement: {
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
			showModal(element){
				this.currentElement = element;
				$('#ModificarElemento').modal('show');
			},
			showDetonar(element){
				this.currentElement = element;
				if(this.currentElement.detonada === 'No'){
					$('#detonacion').modal('show');
				}else{
					alert('La bomba ya ha sido detonada');
				}
			},
			detonar(){
				this.currentElement.detonada = true;
				this.modifyE();
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
				if(this.currentElement.detonada === 'Si'){
					this.currentElement.detonada = true;
				}else if(this.currentElement.detonada === 'No'){
					this.currentElement.detonada = false;
				}
				elementService.updateElement(this.currentElement, this.currentElement.idElement).then(response => {
					elementService.getElements().then(response => {
						for(let i = 0; i < response.body.length; i++){
							if(response.body[i].detonada === true ){
								response.body[i].detonada = 'Si';
							}else{
								response.body[i].detonada = 'No';
							}
						}
						this.elements = response.body;
						$('#ModificarElemento').modal('hide');
					}, response => {
						alert('Error');
					});
					alert('Elemento modificado');
				}, respone => {
					alert('Error');
				})
			},
			search(){
				this.elements = [];
				elementService.getElements().then(response => {
					for(let i = 0; i < response.body.length; i++){
						if(response.body[i].nombre === this.word || response.body[i].peso === this.word || response.body[i].tipo === this.word || response.body[i].detonada+'' === this.word || response.body[i].lugar === this.word || response.body[i].energia+'' === this.word){
							this.elements.push(response.body[i]);
						}
					}
					if(this.elements.length === 0){
						alert('Not Found');
						this.elements = response.body;
					}
				}, response => {
					alert('Error');
				});
			}
		}, 
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('id')).then(response => {
				this.user = response.body[0];
			}, response => {
				alert('Error');
			});

			elementService.getElements().then(response => {
				for(let i = 0; i < response.body.length; i++){
					if(response.body[i].detonada === true){
						response.body[i].detonada = 'Si';
					}else{
						response.body[i].detonada = 'No';
					}
				}
				this.elements = response.body;
			}, response => {
				alert('Error');
			});
		}	
	}
</script>

<style scoped>
	
</style>