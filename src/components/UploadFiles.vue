<template>
  <div>
    <div v-if="currentFile">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-card v-if="loginSection">

    <v-row no-gutters justify="center space-around" align="center">
      <v-col cols="8">
        <v-text-field
          label="Etho Protocol Key"
          @change="setKey"
        ></v-text-field>
      </v-col>

    </v-row>

    <v-row no-gutters justify="center space-around" align="center">
      <v-col cols="4" class="pl-2" justify="center" align="center">
        <v-btn color="success" dark small @click="login">
          Login
          <v-icon light>mdi-cached</v-icon>
        </v-btn>
        <v-btn color="blue" dark small @click="logout">
          Logout
          <v-icon light>mdi-cached</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-card>

    <v-card v-if="userSection">

    <v-row no-gutters justify="center space-around" align="center">
      <v-col cols="8">
  
        <div class="font-weight-normal">
          <strong>Authentication successful</strong>
        </div>
      </v-col>

    </v-row>

    <v-row no-gutters justify="center space-around" align="center">

      <v-col cols="4" class="pl-2" justify="center" align="center">
        <v-btn color="blue" dark small @click="logout">
          Logout
          <v-icon light>mdi-cached</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-card>


    <v-card v-if="uploadSection && loggedIn">
    <v-row no-gutters justify="center space-around" align="center">
      <v-col cols="8">
        <v-text-field
          label="Upload Contract Name"
          @change="setContractName"
        ></v-text-field>
      </v-col>

    </v-row>

    <v-row no-gutters justify="center space-around" align="center">
      <v-col cols="8">
        <v-select
          label="Duration (Blocks)"
          v-model="defaultDuration"
          :items="durations"
          @change="setContractDuration"
        ></v-select>
      </v-col>

    </v-row>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="File input"
          @change="selectFile"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="4" class="pl-2" justify="center" align="center">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    </v-card>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>

    <v-card v-if="fileInfos.length > 0" class="mx-auto">
      <v-dialog
      v-model="extensionConfirm"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Confirmation
        </v-card-title>

        <v-card-text>
          Continue with contract extension?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="cancelExtension"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="confirmExtension"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="removalConfirm"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Confirmation
        </v-card-title>

        <v-card-text>
          Continue with contract removal?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="cancelRemoval"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="confirmRemoval"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-data-table :headers="headers" :items="fileInfos">
        <v-subheader>Upload Contracts</v-subheader>
        <template v-slot:item.contractName="{ item }">
          {{ getContractName(item.data) }}
        </template>
        <template v-slot:item.dataLink="{ item }">
          <v-btn :href="'//ipfs.io/ipfs/' + item.ipfsHash">View Data</v-btn>
        </template>
        <template v-slot:item.addressLink="{ item }">
          <v-btn :href="'//blocks.ether1.org/addr/' + item.address">View Contract</v-btn>
        </template>
        <template v-slot:item.contractActions="{ item }">
          <v-menu
            bottom
            offset-y
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              v-bind="attrs"
              v-on="on"
            >
              Extend Contract
            </v-btn>
          </template>
          <v-list>
            <v-list-item
            v-for="(duration, i) in durations"
            :key="i"
            @click="showConfirmExtension(item.address, duration)"
          >
          <v-list-item-title>{{ duration }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
          <v-btn @click="showConfirmRemoval(item.address)">Remove Contract</v-btn>
        </template>        
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import UploadService from "../services/UploadFilesService";

export default {
  name: "upload-files",
  data() {
    return {
      extensionConfirm: false,
      removalConfirm: false,
      uploadSection: false,
      loginSection: true,
      userSection: false,
      currentFile: undefined,
      ethoProtcolKey: undefined,
      contractName: undefined,
      contractAddress: undefined,
      contractDuration: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      defaultDuration: 100000,
      durations: [100000,200000,300000,400000,500000,600000,700000,800000,900000,1000000],
      headers: [
          {
            text: 'Contract Name',
            align: 'start',
            sortable: false,
            value: 'contractName',
          },
          { text: 'Data', value: 'dataLink' },
          { text: 'Contract Address', value: 'addressLink' },
          { text: 'Expiration (Block)', value: 'expirationBlock' },
          { text: '', value: 'contractActions' },
      ],
    };
  },
  methods: {
    showConfirmExtension(address, duration) {
      this.contractAddress = address;
      this.contractDuration = duration;
      this.extensionConfirm = true;
    },
    confirmExtension() {
      this.extensionConfirm = false;
      this.extend();
    },
    cancelExtension() {
      this.extensionConfirm = false;
      this.contractAddress = undefined;
      this.contractDuration = undefined;
    },
    showConfirmRemoval(address) {
      this.contractAddress = address;
      this.removalConfirm = true;
    },
    confirmRemoval() {
      this.removalConfirm = false;
      this.remove();
    },
    cancelRemoval() {
      this.removalConfirm = false;
      this.contractAddress = undefined;
    },
    setKey(key) {
      this.progress = 0;
      this.ethoProtocolKey = key;
    },
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    setContractName(name) {
      this.progress = 0;
      this.contractName = name;
    },
    setContractDuration(duration) {
      this.progress = 0;
      this.contractDuration = duration;
    },
    getContractName(data) {
      console.log(data);
      if(data) {
        if(this.checkJson(data)) {
          var json = JSON.parse(data);
          if(json.name) {
            return json.name;
          }
        } else {
          return data;
        }
      } else {
        return "Unknown Name";
      }  
    }, 
    checkJson(data) {
      try {
        return (JSON.parse(data) && !!data);
      } catch (e) {
        return false;
      }
    },
    logout() {
        this.loginSection = true;
        this.userSection = false;
        this.fileInfos = undefined;
        this.contractAddress = undefined;
        this.ethoProtocolKey = undefined;
        this.contractName = undefined;
        this.contractDuration = undefined;
        this.currentFile = undefined;

        this.message = "";

    },
    login() {
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key!";
        return;
      }

      this.message = "";

      UploadService.list(this.ethoProtocolKey).then(response => {
        this.loginSection = false;
        this.userSection = true;
        this.fileInfos = response.data;
      })


    },
    upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key!";
        return;
      }
      if (!this.contractName) {
        this.message = "Please enter upload contract name!";
        return;
      }
      if (!this.contractDuration) {
        this.message = "Please select upload contract duration!";
        return;
      }

      this.message = "";

      UploadService.upload(this.currentFile, this.ethoProtocolKey, this.contractName, this.contractDuration, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          UploadService.list(this.ethoProtocolKey).then(response => {
            this.fileInfos = response.data;
          });
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
          this.ethoProtocolKey = undefined;
          this.contractName = undefined;
          this.contractAddress = undefined;
          this.contractDuration = undefined;
        });
    },
    extend() {

      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key!";
        return;
      }
      if (!this.contractAddress) {
        this.message = "Please select a valid contract!";
        return;
      }
      if (!this.contractDuration) {
        this.message = "Please select upload contract extension duration!";
        return;
      }

      this.message = "";

      UploadService.extend(this.ethoProtocolKey, this.contractAddress, this.contractDuration, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          UploadService.list(this.ethoProtocolKey).then(response => {
            this.fileInfos = response.data;
            this.message = "Contract extension successful!";
            this.currentFile = undefined;
            this.contractName = undefined;
            this.contractAddress = undefined;
            this.contractDuration = undefined;
          });
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Contract extension failed!";
          this.currentFile = undefined;
          this.ethoProtocolKey = undefined;
          this.contractName = undefined;
          this.contractAddress = undefined;
          this.contractDuration = undefined;
        });
    },
    remove() {
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key!";
        return;
      }
      if (!this.contractAddress) {
        this.message = "Please select a valid contract!";
        return;
      }

      this.message = "";

      UploadService.remove(this.ethoProtocolKey, this.contractAddress, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          UploadService.list(this.ethoProtocolKey).then(response => {
            this.fileInfos = response.data;
            this.message = "Contract removal successful!";
            this.currentFile = undefined;
            this.contractName = undefined;
            this.contractAddress = undefined;
            this.contractDuration = undefined;
          });
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Contract removal failed!";
          this.currentFile = undefined;
          this.ethoProtocolKey = undefined;
          this.contractName = undefined;
          this.contractAddress = undefined;
          this.contractDuration = undefined;
        });
    },
  },
  mounted() {
  }
};
</script>
