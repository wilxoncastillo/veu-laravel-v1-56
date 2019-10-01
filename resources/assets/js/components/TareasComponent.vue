<template>
	<div>
		<form @submit.prevent="editarNota(nota)" v-if="modoEditar">
			<h4>Editar Notas</h4>
			<input type="text" class="form-control mb-2" placeholder="Nombre de la nota" v-model="nota.nombre">
			<input type="text" class="form-control mb-2" placeholder="Descripción de la nota" v-model="nota.descripcion">
			<button class="btn btn-success" type="submit">Actualizar</button>
			<button class="btn btn-primary"  @click='cancelarNota'>Cancelar</button>
		</form>

		<form @submit.prevent="agregar" v-else>
			<h4>Agregar Notas</h4>
			<input type="text" class="form-control mb-2" placeholder="Nombre de la nota" v-model="nota.nombre">
			<input type="text" class="form-control mb-2" placeholder="Descripción de la nota" v-model="nota.descripcion">
			<button class="btn btn-primary" type="submit">Agregar</button>
		</form>
		<hr>
		<h3>Lista de notas:</h3>
		<ul class="list-group">
			<li class="list-group-item" v-for="(item, index) in notas" :key="index" >
				<span class="badge badge-primary float-right">
					{{item.updated_at}}
				</span>
				<p>{{item.nombre}}</p>
				<p>{{item.descripcion}}</p>
				<p>
					<button class="btn btn-warning btn-sm" @click="editarFormulario(item)">Editar</button>
					<button class="btn btn-danger btn-sm float-right"  @click="eliminarNota(item, index)">Eliminar</button>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				notas: [],
				nota: {id: '', nombre: '', descripcion: ''},
				modoEditar: false
			}
		},

		created() {
			axios.get('/notas')
				.then(res => {
					this.notas = res.data;
				})
		},

		methods: {
			agregar() {
				if(this.nota.nombre.trim() === '' || this.nota.descripcion.trim() === ''){
		        	alert('Debes completar todos los campos antes de guardar');
		        	return;
		      	}

				const params = {
					nombre: this.nota.nombre, 
					descripcion: this.nota.descripcion
				}

				this.nota.nombre = '';
				this.nota.descripcion = '';

				axios.post('/notas', params)
					.then(res => {
		          		this.notas.push(res.data);
		        	})
			},
		
			editarFormulario(item) {
				this.modoEditar = true;
				this.nota.id = item.id;
				this.nota.nombre = item.nombre;
				this.nota.descripcion = item.descripcion;
			},

			cancelarNota() {
				this.modoEditar = false;
				this.nota.nombre = '';
				this.nota.descripcion = '';
			},

			editarNota(item) {
				if(this.nota.nombre.trim() === '' || this.nota.descripcion.trim() === ''){
		        	alert('Debes completar todos los campos antes de guardar');
		        	return;
		      	}

				const params = {
					nombre: this.nota.nombre, 
					descripcion: this.nota.descripcion
				}

				this.nota.nombre = '';
				this.nota.descripcion = '';

				axios.put(`/notas/${item.id}`, params)
					.then(res => {
		          		this.modoEditar = false;
          				const index = this.notas.findIndex(buscarId => buscarId.id === item.id);
          				this.notas[index] = res.data;
		        	})
			},

			eliminarNota(item, index){
		      const confirmacion = confirm(`Eliminar nota ${item.nombre}`);
		      if(confirmacion){
		        axios.delete(`/notas/${item.id}`)
		          .then(()=>{
		            this.notas.splice(index, 1);
		          })
		      }
		    }
		}

	}
</script>
