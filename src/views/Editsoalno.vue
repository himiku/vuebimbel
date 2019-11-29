<template>
<div class="container">
    <div v-if="this.$route.params.datax===null">

        <div class="row">
            <div class="col-8">
                <div class="card">
                    <div class="card-header">
                        <h1>Buat soal No. {{no}}</h1>
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="editsoalnonew">
                            <div class="form-group">
                                <label for="pertanyaan">Pertanyaan:</label>
                                <textarea rows="3" required name="pertanyaan" id="" class="form-control" v-model="formdatanew.pertanyaan"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="jawabana">Jawaban A:</label>
                                <input type="text" required name="jawabana" id="" class="form-control" v-model="formdatanew.jawaban.A">
                            </div>
                            <div class="form-group">
                                <label for="jawabanb">Jawaban B:</label>
                                <input type="text" required name="jawabanb" id="" class="form-control" v-model="formdatanew.jawaban.B">
                            </div>
                            <div class="form-group">
                                <label for="jawabanc">Jawaban C:</label>
                                <input type="text" required name="jawabanc" id="" class="form-control" v-model="formdatanew.jawaban.C">
                            </div>
                            <div class="form-group">
                                <label for="jawaband">Jawaban D:</label>
                                <input type="text" required name="jawaband" id="" class="form-control" v-model="formdatanew.jawaban.D">
                            </div>
                            <div class="form-group">
                                <label for="jawabanbenar">Jawaban Benar:   </label>
                                <select name="jawabanbenar" required v-model="formdatanew.jawabanbenar" class="form-control">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="pembahasan">Pembahasan:</label>
                                <input type="text" required name="pembahasan" id="" class="form-control" v-model="formdatanew.pembahasan">
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" value="simpan">
                            </div>
                         </form>
                    </div>
                </div>
            </div>

            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h2>preview</h2>
                    </div>
                    <div class="card-body">
                        <vue-mathjax :formula="formdatanew.pertanyaan" :safe="false"></vue-mathjax> <br/><br/>
                        <div class="row">
                            A. <vue-mathjax :formula="formdatanew.jawaban.A" :safe="false"></vue-mathjax>
                        </div>
                        <div class="row">
                            B. <vue-mathjax :formula="formdatanew.jawaban.B" :safe="false"></vue-mathjax>
                        </div>
                        <div class="row">
                            C. <vue-mathjax :formula="formdatanew.jawaban.C" :safe="false"></vue-mathjax>
                        </div>
                        <div class="row">
                            D. <vue-mathjax :formula="formdatanew.jawaban.D" :safe="false"></vue-mathjax>
                        </div> <br/>
                        <p>Jawaban Benar: {{formdatanew.jawabanbenar}}</p> <br/>
                        
                            Pembahasan: <vue-mathjax :formula="formdatanew.pembahasan" :safe="false"></vue-mathjax>
                        
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div v-else>

        <div class="row">
            <div class="col-8">
                <div class="card">
                    <div class="row card-header">
                        <h1 class="col-8">Edit soal No. {{no}}</h1>

                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="editsoalno">
                            <div class="form-group">
                                <label for="pertanyaan">Pertanyaan:</label>
                                <textarea rows="3" required name="pertanyaan" id="" class="form-control" v-model="formdata.pertanyaan"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="jawabana">Jawaban A:</label>
                                <input type="text" required name="jawabana" id="" class="form-control" v-model="formdata.jawaban.A">
                            </div>
                            <div class="form-group">
                                <label for="jawabanb">Jawaban B:</label>
                                <input type="text" required name="jawabanb" id="" class="form-control" v-model="formdata.jawaban.B">
                            </div>
                            <div class="form-group">
                                <label for="jawabanc">Jawaban C:</label>
                                <input type="text" required name="jawabanc" id="" class="form-control" v-model="formdata.jawaban.C">
                            </div>
                            <div class="form-group">
                                <label for="jawaband">Jawaban D:</label>
                                <input type="text" required name="jawaband" id="" class="form-control" v-model="formdata.jawaban.D">
                            </div>
                            <div class="form-group">
                                <label for="jawabanbenar">Jawaban Benar:   </label>
                                <select name="jawabanbenar" required v-model="formdata.jawabanbenar" class="form-control">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="pembahasan">Pembahasan:</label>
                                <input type="text" required name="pembahasan" id="" class="form-control" v-model="formdata.pembahasan">
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" value="update">
                            </div>
                         </form>
                    </div>
                </div>
            </div>

            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h2>preview</h2>
                    </div>
                    <div class="card-body">
                        <vue-mathjax :formula="formdata.pertanyaan" :safe="false"></vue-mathjax> <br/><br/>
                        <div class="row">
                            A.&nbsp; <vue-mathjax :formula="formdata.jawaban.A" :safe="false"></vue-mathjax>
                        </div>
                        <div class="row">
                            B. <vue-mathjax :formula="formdata.jawaban.B" :safe="false"></vue-mathjax>
                        </div>
                        <div class="row">
                            C. <vue-mathjax :formula="formdata.jawaban.C" :safe="false"></vue-mathjax>
                        </div>
                        <div class="row">
                            D. <vue-mathjax :formula="formdata.jawaban.D" :safe="false"></vue-mathjax>
                        </div> <br/>
                        <p>Jawaban Benar {{formdata.jawabanbenar}}</p> <br/>
                        
                            Pembahasan: <vue-mathjax :formula="formdata.pembahasan" :safe="false"></vue-mathjax>
                        
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import { db } from '../database/db'
export default {
    name:'Editsoalno',
    data(){
        return{
            id:this.$route.params.id,
            no:this.$route.params.no,
            // datax:this.$route.params.datax,
            formdata:{},
            formdatanew:{
                pertanyaan:'',
                jawaban: {
                    A: '',
                    B: '',
                    C: '',
                    D: '',
                },
                jawabanbenar: null,
                pembahasan: ''
            }
        }
    },
    created(){
        if (this.$route.datax !== null){
            this.formdata = {
                pertanyaan:this.$route.params.datax.pertanyaan.length>0 ? atob(this.$route.params.datax.pertanyaan):'',
                jawaban: {
                    A: this.$route.params.datax.jawaban.A.length > 1? atob(this.$route.params.datax.jawaban.A):'',
                    B: this.$route.params.datax.jawaban.B.length > 1? atob(this.$route.params.datax.jawaban.B):'',
                    C: this.$route.params.datax.jawaban.C.length > 1? atob(this.$route.params.datax.jawaban.C):'',
                    D: this.$route.params.datax.jawaban.D.length > 1? atob(this.$route.params.datax.jawaban.D):''
                },
                jawabanbenar: this.$route.params.datax.jawabanbenar,
                pembahasan: this.$route.params.datax.pembahasan.length >0 ?atob(this.$route.params.datax.pembahasan):''
            }
        }
        
        // this.formdata.jawabanbenar = 
        // console.log(this.$route.params.datax.jawabanbenar)
        // console.log(this.$route.params.datax.pembahasan)
    },
    methods:{
        decodeFrom(data){
            let oke = atob(data)
            return oke
        },
        editsoalno(){
            db.ref('banksoal/'+this.id+'/soalnye/'+this.no).set({
                pertanyaan:btoa(this.formdata.pertanyaan),
                jawaban:{
                    A: btoa(this.formdata.jawaban.A),
                    B: btoa(this.formdata.jawaban.B),
                    C: btoa(this.formdata.jawaban.C),
                    D: btoa(this.formdata.jawaban.D)
                },
                jawabanbenar:this.formdata.jawabanbenar,
                pembahasan:btoa(this.formdata.pembahasan)

            }).then(()=>{
                this.$router.go(-1)
                // this.$router.push({name:'Detilsoal', params:{id:this.id}})
            })
        },
        editsoalnonew(){
            db.ref('banksoal/'+this.id+'/soalnye/'+this.no).set({
                pertanyaan:btoa(this.formdatanew.pertanyaan),
                jawaban:{
                    A: btoa(this.formdatanew.jawaban.A),
                    B: btoa(this.formdatanew.jawaban.B),
                    C: btoa(this.formdatanew.jawaban.C),
                    D: btoa(this.formdatanew.jawaban.D)
                },
                jawabanbenar:this.formdatanew.jawabanbenar,
                pembahasan:btoa(this.formdatanew.pembahasan)

            }).then(()=>{
                this.$router.go(-1)
                //this.$router.push({name:'Detilsoal', params:{id:this.id}})
            })
        },
        deletesoalno(dialog){
            db.ref('banksoal/'+this.id+'/soalnye/'+this.no).remove().then(()=>{
                dialog.loaging(false)
                dialog.close()
                this.$router.go(-1)
            })
        },
        doNothing(){}

    }
}
</script>