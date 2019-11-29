<template>
  <div id="app" class="container">
    <nav v-if="islogin===true" class="navbar navbar-expand-sm bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{name:'home'}" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'Listsoal'}" class="nav-link">List soal</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'Listmateri'}" class="nav-link">List materi</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'Listuser'}" class="nav-link">List user</router-link>
        </li>
      </ul>
    </nav>
<br/>
    <div v-if="islogin===false">
      <br><br><br><br><br>
      <b-card
        title=" >>-------- Login ! -------->"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 mx-auto"
      >
      
      <b-card-text>
        <b-form @submit.prevent="login">
          <label for="feedback-user">User ID</label>
          <b-input required v-model="formdata.id" :state="validation" id="feedback-user"></b-input>
          <b-form-invalid-feedback :state="validation">
            lebih dari 2 huruf & tidak boleh ada spasi
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
            Looks Good.
          </b-form-valid-feedback>

          <label for="text-password">Password</label>
          <b-input required type="password" id="text-password" aria-describedby="password-help-block" v-model="formdata.pass"></b-input>
          <b-form-text id="password-help-block">
          please keep your id & password secured. 
          </b-form-text>
          <br>
          
          <b-button type="submit" variant="primary">Masukin</b-button>
        </b-form>
      </b-card-text>
      </b-card>
    </div>
    <div v-else class="gap">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { db } from './database/db'
export default {
  data() {
    return {
      islogin:Boolean,
      formdata:{
        id:'',
        pass:''
      }
    }
  },
  created(){
    this.islogin = false
  },
  computed: {
      validation() {
        return !this.formdata.id.includes(' ') && this.formdata.id.length>2
      }
  },
  methods:{
    login(){
      db.ref('admin/'+this.formdata.id).once('value', snapsut=>{
        let ok = snapsut.val()
        if (ok!==null){
        if(this.formdata.id === ok.id && this.formdata.pass === ok.pass){
        this.islogin = true
        console.log(this.islogin)
        console.log('okesip')
        }else{
          this.$dialog.alert(`Id atau Password salah,`).then(function() {
            console.log('Closed');
          });
        }
        }else{
           this.$dialog.alert(`Id atau Password salah,`).then(function() {
            console.log('Closed');
          });
        }
      })
      
    }
  }
}
</script>

<!--<style lang="css">
   @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>-->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
