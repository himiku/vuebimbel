<template>
<div>
    <div class="contaier">
        <div class="row">
        <div class="col-10">
            <h1>List Soal</h1>
        </div>
        <div class="col-2">
            <router-link :to="{name:'Buatsoal'}" class="btn btn-primary">buat paket soal baru</router-link>
        </div>
        
    </div>
    </div>
    

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Titel</th>
                <th>Jenis</th>
                <th>Tingkat</th>
                <th>Kelas</th>
                <th>Mapel</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item of datalistbanksoal" :key="item['.key']">
                <td>{{item.titel}}</td>
                <td>{{item.jenis}}</td>
                <td>{{item.tingkat}}</td>
                <td>{{item.kelas}}</td>
                <td>{{item.mapel}}</td>
                <td v-if="item.published">
                    <div class="badge badge-primary text-wrap" style="width: 6rem;">
                        sudah publish
                    </div>
                </td>
                <td v-else>
                    <div class="badge badge-danger text-wrap" style="width: 6rem;">
                        belum publish (draft)
                    </div>
                </td>
                <td>
                    <router-link :to="{name: 'Detilsoal',params:{id:item.idsoal}}" class="btn btn-warning">Edit</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {db} from '../database/db'
export default {
    name:'Listsoal',
    components:{
        // name:'Listsoal'
    },
    data(){
        return {
            datalistbanksoal:[]
        }
    },
    created(){
        db.ref('listbanksoal').once('value', snapshot=>{
            this.datalistbanksoal = snapshot.val()
            // console.log(snapshot.toJSON)
            // console.log(this.datalistbanksoal)
        })
        
    }
}
</script>