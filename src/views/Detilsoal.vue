<template>
    <div>
        <div class="row">
            <h1 class="col-6">Detil Soal</h1>
            <button v-if="!detil.published" class="col-2 btn btn-success" @click="publishnow">publish now</button>
            <button v-else class="col-2 btn btn-warning" @click="batalpublish">batalkan publish</button>
            <div class="col-2"></div>
            <button class="btn btn-danger" v-confirm="{
                loader: true,
                ok: dialog => dialogDelete(dialog),
                cancel: doNothing(),
                message: 'Yakin Hapus Paket Soal ? semua data soal dan jawaban serta nilai user yang sudah mengerjakan soal ini akan dihapus Selamanya... dan mereka tak kan pernah kembali lagi.'
            }">*Delete ! ! !</button>
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
                <tbody v-if="soalnya!==null">
                    <tr v-for="(item,index) in soalnya" :key="`item-${index}`">
                       <td v-if="index!==0">{{index}}</td>
                       <td v-if="index!==0">{{decodeFrom(item.pertanyaan)}}</td>
                       <td v-if="index!==0">
                           <router-link class="btn btn-primary" :to="{name:'Editsoalno',params:{id:$route.params.id,no:index,datax:item}}">Edit</router-link> |
                           <button v-if="index===soalnya.length-1" class="btn btn-danger" v-confirm="{
                                loader: true,
                                ok: dialog => deletesoalno(dialog,id,index),
                                cancel: doNothing(),
                                message: 'hapus soal yg kelebihan ? setelah dihapus, dia tak kan pernah kembali lagi.'
                            }">hapus</button>
                       </td>
                    </tr>
                </tbody>
                
            </table>
        </div>
        <div v-if="soalnya!==null" class="row">
            <h3 class="col-8">Total soal: {{soalnya.length-1}}</h3>
            <router-link class="btn btn-info" :to="{name:'Editsoalno',params:{id:$route.params.id,no:soalnya.length,datax:null}}">Tambah soal no: {{soalnya.length}}</router-link>
        </div>
        <div v-else class="row">
            <h3 class="col-8">Total soal: 0</h3>
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
                // console.log(snapshot.val())
                // console.log(this.soalnya.length)
                console.log('get data coeggggg')
            })
        // console.log(this.soalnya)
        },
        decodeFrom(data){
            let oke = atob(data)
            return oke
        },
        showdialog(){
            this.$dialog
            .confirm('Please confirm to continue')
            .then(function() {
                console.log('Clicked on proceed');
            })
            .catch(function() {
                console.log('Clicked on cancel');
            })
        },
        publishnow(){
            db.ref('banksoal/'+this.$route.params.id+'/published').set(true);
            db.ref('carisoal/'+this.detil.kelas+'/'+this.detil.mapel+'/'+this.$route.params.id+'/published').set(true);
            db.ref('listbanksoal/'+this.$route.params.id+'/published').set(true);
            this.getdatacoeg()
            
            
        },
        batalpublish(){
            db.ref('banksoal/'+this.$route.params.id+'/published').set(false);
            db.ref('carisoal/'+this.detil.kelas+'/'+this.detil.mapel+'/'+this.$route.params.id+'/published').set(false)
            db.ref('listbanksoal/'+this.$route.params.id+'/published').set(false)
            this.getdatacoeg()
        },
        dialogDelete(dialog){
            db.ref('banksoal/'+this.$route.params.id).remove();
            db.ref('carisoal/'+this.detil.kelas+'/'+this.detil.mapel+'/'+this.$route.params.id).remove()
            db.ref('listbanksoal/'+this.$route.params.id).remove().then(()=>{
                dialog.close()
                this.$router.go(-1)
            })
        },
        deletesoalno(dialog,id,no){
            db.ref('banksoal/'+id+'/soalnye/'+no).remove().then(()=>{
                dialog.loading(false)
                dialog.close()
                this.getdatacoeg()
            })
        },
        doNothing(){}
    }

}
</script>