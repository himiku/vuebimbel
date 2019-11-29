<template>
    <div class="col-8 center">
        <div class="card">
            <div class="card-header">
                <h1>Buat soal</h1>
            </div>

            <div class="card-body">
                <form v-on:submit.prevent="buatsoal">
                    <div class="form-group">
                        <label for="tingkat">pilih tingkat:</label>
                        <select name="tingkat" required v-model="formdata.tingkat" class="form-control">
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA-IPA">SMA-IPA</option>
                            <option value="SMA-IPS">SMA-IPS</option>
                        </select>
                    </div>
                    <div v-if="formdata.tingkat!==null" class="form-group">
                        <label for="kelas">pilih Kelas:</label>
                        <select name="kelas" required v-model="formdata.kelas" class="form-control">
                            <option v-for="item of datakelas[formdata.tingkat]" :key="item" :value="item">{{item}}</option>
                            
                        </select>
                    </div>
                    <div v-if="formdata.tingkat!==null" class="form-group">
                        <label for="mapel">pilih Mapel:</label>
                        <select name="mapel" required v-model="formdata.mapel" class="form-control">
                            <option v-for="item of datamapel[formdata.tingkat]" :key="item" :value="item">{{item}}</option>
                        </select>
                    </div>
                    <div v-if="formdata.tingkat!==null" class="form-group">
                        <label for="jenis">pilih Jenis:</label>
                        <select name="jenis" required v-model="formdata.jenis" class="form-control">
                            <option v-for="item of datajenis" :key="item" :value="item">{{item}}</option>
                        </select>
                    </div>
                    <div v-if="formdata.tingkat!==null" class="form-group">
                        <label for="titel">Judul Soal:</label>
                        <input type="text" required name="titel" class="form-control" v-model="formdata.titel">
                    </div>

                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="simpan">
                    </div>

                </form>
            </div>

        </div>
    </div>
</template>

<script>
import datakelas from '../data/datakelas'
import datamapel from '../data/datamapel'
import datajenis from '../data/datajenis'
import { db } from '../database/db'

export default {
    data() {
        return {
            formdata:{
                tingkat:null,
                kelas:null,
                mapel:null,
                jenis:null,
                titel:''
            },
            datakelas:datakelas,
            datamapel:datamapel,
            datajenis:datajenis
        }
    },
    methods:{
        buatsoal(){
            console.log(this.formdata)
            let generatedid = db.ref('listbanksoal').push().getKey()
            let builddata = {
                idsoal:generatedid,
                createat: new Date().toISOString(),
                tingkat: this.formdata.tingkat,
                kelas:this.formdata.kelas,
                mapel:this.formdata.mapel,
                jenis:this.formdata.jenis,
                titel:this.formdata.titel,
                published:false
            }
            console.log(builddata)
            db.ref('banksoal/'+generatedid).set(builddata);
            db.ref('carisoal/'+this.formdata.kelas+'/'+this.formdata.mapel+'/'+generatedid).set(builddata);
            db.ref('listbanksoal/'+generatedid).set(builddata)
            this.$router.go(-1)
        }
    }
}
</script>
