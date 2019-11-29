<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h1>List Materi</h1>
            </div>

            <div class="card-body">
                <b-form inline @submit.prevent="onsubmit">
                    <!-- <label class="mr-sm-2" for="inline-form-custom-select-pref">Preference</label>
                    <b-form-select
                    required
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="formdata.tingkat"
                    :options="['SD','SMP','SMA-IPA','SMA-IPS']"
                    id="inline-form-custom-select-pref"
                    >
                    <template v-slot:first>
                        <option :value="null">Pilih Tingkat</option>
                    </template>
                    </b-form-select>

                    <b-form-select                    
                    required
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="formdata.mapel"
                    :options="datamapel[formdata.tingkat]"
                    id="inline-form-custom-select-pref"
                    >
                    <template v-slot:first>
                        <option :value="null">Pilih Mapel</option>
                    </template>
                    </b-form-select>

                    <b-button type="submit" variant="info">Filter Data</b-button> -->
                    <div class="col-8"></div>
                    <router-link :to="{name:'Buatmateri'}" class="btn btn-primary">Buat materi baru</router-link>
                </b-form>
                
                <br/>
                <div v-if="listmateri.length>0">
                <b-table
                    id="table-transition-example"
                    :items="listmateri"
                    :fields="fields"
                    hover
                    striped
                    small
                    primary-key="key"
                >
                <template v-slot:cell(published)="pub">
                    <div v-if="pub.value===true" class="badge badge-success text-wrap" style="width: 6rem;">
                        sudah publish
                    </div>
                    <div v-else class="badge badge-danger text-wrap" style="width: 6rem;">
                        belum publish (draft)
                    </div>
                </template>
                <template v-slot:cell(key)="datar">
                    <router-link :to="{name:'Editmateri',params:{tingkat:datar.item.tingkat,mapel:datar.item.mapel,id:datar.value}}" class="btn btn-primary">Edit</router-link>
                </template>
                </b-table>
                </div>
                <div v-else>
                    <!-- data tidak ada, silahkan rubah menu <b>Preference</b> diatas lalu tekan tombol <b>get data</b>, atau silahkan <b>buat materi baru.</b> -->
                    <b-table
                    id="table-transition-example"
                    :items="superlistmateri"
                    :fields="fields"
                    striped
                    small
                    primary-key="key"
                    >
                    <template v-slot:cell(published)="pub">
                        <div v-if="pub.value===true" class="badge badge-success text-wrap" style="width: 6rem;">
                            sudah publish
                        </div>
                        <div v-else class="badge badge-danger text-wrap" style="width: 6rem;">
                            belum publish (draft)
                        </div>
                    </template>
                    <template v-slot:cell(key)="datar">
                        <router-link :to="{name:'Editmateri',params:{tingkat:datar.item.tingkat,mapel:datar.item.mapel,id:datar.value}}" class="btn btn-primary">Edit</router-link>
                    </template>
                    </b-table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { db } from '../database/db'
import datamapel from '../data/datamapel'
export default {
    data() {
        return {
            datamapel:datamapel,
            fields:[
                {key:'titel', sortable:true},
                {key:'tingkat', sortable:true},
                {key:'kelas', sortable:true},
                {key:'mapel', sortable:true},
                {key:'published',sortable:true,label:'Status'},
                
                {key:'key'}
            ],
            listmateri:[],
            superlistmateri:[],
            formdata:{
                tingkat:null,
                mapel:null,
            }
        }
    },
    created(){
        this.getsuperlistmateri()
    },
    methods:{
        getlistmateri(tingkat,mapel){
            db.ref('materi/'+tingkat+'/'+mapel).once('value',snapshot=>{
                // console.log(this.listmateri)
                let oke = snapshot.val()
                if (oke!==null){
                    let anu = Object.keys(oke).map((key)=>{
                            let mantab = oke[key]
                            mantab['key'] = key
                            return mantab 
                        })
                    this.listmateri = anu
                    // console.log(anu)
                }else{
                    this.listmateri = []
                }
                
            })
        },
        getsuperlistmateri(){
            db.ref('materi').once("value", snapshot =>{
                let objectsnapsut = snapshot.val()
                if (objectsnapsut!==null){
                    // console.log(objectsnapsut)
                    let araypertingkat = Object.keys(objectsnapsut).map((keytingkat)=>{
                        let objpertingkat = objectsnapsut[keytingkat]
                        let arraypermapel = Object.keys(objpertingkat).map((keymapel)=>{
                            let objpermapel = objpertingkat[keymapel]
                            let arraymateri = Object.keys(objpermapel).map((keymateri)=>{
                                let objmateri = objpermapel[keymateri]
                                objmateri['key'] = keymateri
                                return objmateri
                            })
                            return arraymateri
                        })
                        return arraypermapel.flat()
                    })
                    let sudahlah = araypertingkat.flat()
                    // console.log(sudahlah)
                    // return sudahlah
                    this.superlistmateri = sudahlah
                }
            })
        },

        onsubmit(){
            // console.log(this.formdata)
            this.getlistmateri(this.formdata.tingkat,this.formdata.mapel)
        }
    }
}
</script>
