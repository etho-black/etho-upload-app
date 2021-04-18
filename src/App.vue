

<template>

<v-app>
  
  <!-- Preloader -->
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
  <!-- Preloader end -->

  <nav-bar></nav-bar>
  <vue-progress-bar></vue-progress-bar>
<div id="main_div">
  <v-container fluid style="width: 1200px">

    <div class="h-full" style="padding: 30px; height:600px;">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="home-contain" style="height: calc(100vh - 74px);">
            <div class="w-full p-2">
              <h4>#Freedom Of Data</h4>
              <h1 style="font-size: 40px;" class="wrap">
                <span class="f-bold f-color">The</span>
                <span class="d-none d-md-inline f-bold"> ETHO </span>
                <div class="d-md-none f-bold pt-2 pb-2"> ETHO </div>
                <span class="f-bold f-color">Protocol</span>
              </h1>
            </div>
          </div>
        </div>
        <div class="col-1 d-none d-md-block" />
        <div class="col-12 col-md-5 d-md-block">
          <div class="home-contain p-2">
            <div>
              <!-- Tile js start -->
              <div class="d-none d-md-block justify-content-center ">
                <img :src='"./assets/images/etho/logo-only.svg"' style="width: 50%; object-fit: contain;" />
              </div>
              <!-- Tile js end -->

              <h1 style="font-size: 24px;">
                <span class="f-bold f-color">Immutable, Decentralized and Zero Censorship</span>
              </h1>
                <v-btn
                  color="primary"
                  dark
                  @click="showUploadApplication"
                >
                  Launch Upload App
                </v-btn>
              <h6>Decentralized Data Upload Application <a href="https://ethoprotocol.com" style="color:#971B45;">#Decentralize Everything</a></h6>
              <h6></h6>
              
            </div>
          </div>
        </div>
      </div>
    </div>


    <v-row justify="center">
    <v-dialog
      v-model="uploadApplication"
      persistent
      max-width="600"
      
    >
      
      <v-card max-height="80vh"> 
        <v-card-title class="headline">
          Etho Protocol Upload
        </v-card-title>
        <v-card-text> <upload-files></upload-files> </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="uploadApplication = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

      <node-map></node-map>

  
</v-container>
<Map></Map>
<Footer></Footer>
<js></js>
</div>
</v-app>
</template>

<script>
import UploadFiles from "./components/UploadFiles";
import NodeMap from "./components/NodeMap";
import Map from "./components/map";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import js from '@/components/js';

export default {
  name: "App",
  components: {
    UploadFiles,
    NodeMap,
    NavBar,
    Footer,
    Map,
    js,
  },
  data() {
    return {
      uploadApplication: false,
    };
  },
  methods: {
    showUploadApplication() {
      this.uploadApplication = true;
    },
    hideUploadApplication() {
      this.uploadApplication = false;
    },
  },
};
</script>

