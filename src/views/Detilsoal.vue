<template>
    <div>
        <div class="row">
            <h1 class="col-8">Detil Soal</h1>
            <button v-if="!detil.published" class="btn btn-success">publish now</button>
            <button v-else class="btn btn-danger">batalkan publish</button>
        </div>
        <h3>Judul soal: {{detil.titel}} | jenis soal: {{detil.jenis}}</h3>
        <h3>Mapel: {{detil.mapel}} | Tingkat: {{detil.tingkat}}, {{detil.kelas}} | Published?: {{detil.published}}</h3>
        <div class="card">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>pertanyaan</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in soalnya" :key="`item-${index}`">
                       <td v-if="index!==0">{{index}}</td>
                       <td v-if="index!==0">{{decodeFrom(item.pertanyaan)}}</td>
                       <td v-if="index!==0">
                           <router-link class="btn btn-primary" :to="{name:'Editsoalno',params:{id:$route.params.id,no:index,datax:item}}">Edit</router-link>
                       </td>
                    </tr>
                </tbody>
                
            </table>
        </div>
        <div v-if="soalnya.length>0" class="row">
            <h3 class="col-8">Total soal: {{soalnya.length-1}}</h3>
            <router-link class="btn btn-info" :to="{name:'Editsoalno',params:{id:$route.params.id,no:soalnya.length,datax:null}}">Tambah soal no: {{soalnya.length}}</router-link>
        </div>
        <div v-else class="row">
            <h3 class="col-8">Total soal: {{soalnya.length}}</h3>
            <router-link class="btn btn-info" :to="{name:'Editsoalno',params:{id:$route.params.id,no:1,datax:null}}">Tambah soal no: 1</router-link>
        </div>
    </div>
</template>

<script>
import { db } from '../database/db'
export default {
    name:'Detilsoal',
    data(){
        return{
            id:this.$route.params.id,
            detil:{},
            soalnya:[]
        }
    },
    created(){
        
        this.getdatacoeg()
        
        // console.log(this.detil)
        // console.log(this.$route.params.id)
    },
    methods:{
        getdatacoeg(){
            db.ref('listbanksoal/'+this.$route.params.id).once('value', snapshot=>{
                this.detil = snapshot.val()
            })
            
            db.ref('banksoal/'+this.$route.params.id+'/soalnye').once('value',snapshot=>{
                let okesip =snapshot.val()
                this.soalnya = okesip
                console.log(snapshot.val())
                console.log(this.soalnya.length)
            })
        console.log(this.soalnya)
        },
        decodeFrom(data){
            let oke = atob(data)
            return oke
        },
        publishnow(){

        },
        batalpublish(){

        }
    }

}
</script>