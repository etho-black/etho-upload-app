<template>

    <v-card
      max-width="600"
      class="px-4 py-10"
    >
      <v-tabs
        background-color="#840032"
        center-active
        dark
        class="pb-3"
        >
        <v-tab @click="showLoginSection">Login</v-tab>
        <v-tab @click="showSignupSection">Signup</v-tab>
      </v-tabs>

      <v-card v-if="loginSection">

        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-text-field
              label="ETHO Pritvate Key"	type="password"
              @change="setKey"
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="success" dark small @click="login">
              Login
              <v-icon light>mdi-login</v-icon>
              
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="signupSection">

        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-text-field
              label="Account Name"
              @change="setAccountName"
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-text-field
              label="ETHO Private Key"	type="password"
              @change="setKey"
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="success" dark small @click="signup">
              Signup
              <v-icon light>mdi-account-plus</v-icon>
              
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="userSection">

        <v-row justify="center" align="center">
          <v-col cols="8" justify="center" align="center">
  
            <div class="font-weight-normal">
              <strong>Authentication successful</strong>
            </div>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">

          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="green" dark small @click="showUploadSection">
              Upload File
              <v-icon light>mdi-upload</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="green" dark small @click="showUploadDirectorySection">
              Upload Directory
              <v-icon light>mdi-upload</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="green" dark small @click="showViewDataSection">
              View Data
              <v-icon light>mdi-folder</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="black" dark small @click="logout">
              Logout
              <v-icon light>mdi-logout</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="uploadSection" class="mt-8">
        <v-row no-gutters justify="center" align="center">
          <v-col cols="8">
            <v-text-field
              label="Upload Contract Name"
              @change="setContractName"
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-select
              label="Duration (Blocks)"
              v-model="defaultDuration"
              :items="durations"
              @change="setContractDuration"
            ></v-select>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-file-input
              show-size
              label="File input"
              @change="selectFile"
            ></v-file-input>
          </v-col>
        </v-row>


        <v-card v-if="fileUploadCost>0" color="#840032" class="pb-1 pt-2 my-2 mx-6">
          <p class="white--text text-center">
            Upload Cost:  {{ fileUploadCost }}  ETHO
          </p>
        </v-card>


        <v-row justify="center" align="center">
          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="success" dark small @click="upload">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-card>

      <v-card v-if="uploadDirectorySection" class="mt-8">
        <v-row no-gutters justify="center" align="center">
          <v-col cols="8">
            <v-text-field
              label="Upload Contract Name"
              @change="setContractName"
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-select
              label="Duration (Blocks)"
              v-model="defaultDuration"
              :items="durations"
              @change="setContractDuration"
            ></v-select>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-file-input
              show-size
              multiple
              webkitdirectory
              COUNTER
              prepend-icon="mdi-folder"
              label="Directory input"
              @change="selectDirectory"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-card v-if="directoryUploadCost>0" color="#840032" class="pb-1 pt-2 my-2 mx-6">
          <p class="white--text text-center">
            Upload Cost:  {{ directoryUploadCost }}  ETHO
          </p>
        </v-card>

        <v-row justify="center" align="center">
          <v-col cols="4" class="pl-2" justify="center" align="center">
            <v-btn color="success" dark small @click="uploadDirectory">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-card>
      <v-card v-if="fileInfos.length > 0 && viewDataSection && !showProgress && !message" class="mt-8">
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
          <v-card >
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

        <v-data-table :headers="headers" :items="fileInfos" height="34vh">
          <v-subheader>Upload Contracts</v-subheader>
          <template v-slot:item.contractName="{ item }">
            {{ getContractName(item.data) }}
          </template>
          <template v-slot:item.dataLink="{ item }">
            <v-btn :href="'//data.ethoprotocol.com/ipfs/' + item.ipfsHash" x-small target="_blank">View</v-btn>
          </template>
          <template v-slot:item.addressLink="{ item }">
            <v-btn :href="'//explorer.ethoprotocol.com/address/' + item.address" x-small target="_blank">View</v-btn>
          </template>
          <template v-slot:item.contractActions="{ item }">
            <v-menu
              bottom
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  
                  v-bind="attrs"
                  v-on="on"
                  x-small
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
            <v-btn x-small @click="showConfirmRemoval(item.address)">Remove Contract</v-btn>
          </template>        
        </v-data-table>
      </v-card>

       <v-card v-if="showProgress" class="mt-4">
      <div>
        <div>
          <v-progress-linear
          :value="progress"
          color="light-blue"
          height="25"
          reactive
          >
          <strong>{{ progress }} %</strong>
          </v-progress-linear>
        </div>
      </div>
      </v-card>

      <v-alert v-if="message" border="left" color="blue-grey" dark class="mt-4">
        {{ message }}
      </v-alert>
    </v-card>
</template>

<script>
import UploadService from "../services/UploadFilesService";

export default {
  name: "upload-files",
  data() {
    return {
      fileUploadCost: 0,
      directoryUploadCost: 0,
      extensionConfirm: false,
      removalConfirm: false,
      uploadSection: false,
      uploadDirectorySection: false,
      loginSection: true,
      viewDataSection: true,
      signupSection: false,
      userSection: false,
      currentFile: undefined,
      currentDirectory: undefined,
      ethoProtocolKey: undefined,
      accountName: undefined,
      contractName: undefined,
      contractAddress: undefined,
      contractDuration: 100000,
      progress: 0,
      showProgress: false,
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
    async calculateFileUploadCost(size) {
      UploadService.calculateCost(size, this.contractDuration).then(response => {
        console.log(response);
        this.fileUploadCost = (Number(response.data.uploadCost) / 1000000000000000000).toFixed(8);
        return true;
      });
        
    },
    async calculateDirectoryUploadCost(size) {
      UploadService.calculateCost(size, this.contractDuration).then(response => {
        console.log(response);
        this.directoryUploadCost = (Number(response.data.uploadCost) / 1000000000000000000).toFixed(8);
        return true;
      });
        
    },
    showViewDataSection() {
      this.loginSection = false;
      this.signupSection = false;
      this.uploadSection = false;
      this.uploadDirectorySection = false;
      this.viewDataSection = true;
      this.userSection = true;
      this.contractAddress = undefined;
      this.accountName = undefined;
      this.contractName = undefined;
      this.contractDuration = 100000;
      this.currentFile = undefined;
      this.currentDirectory = undefined;

      this.message = "";
    },
    showUploadSection() {
      this.loginSection = false;
      this.signupSection = false;
      this.uploadSection = true;
      this.uploadDirectorySection = false;
      this.viewDataSection = false;
      this.userSection = true;
      this.contractAddress = undefined;
      this.accountName = undefined;
      this.contractName = undefined;
      this.contractDuration = 100000;
      this.currentFile = undefined;
      this.currentDirectory = undefined;

      this.message = "";
    },
    showUploadDirectorySection() {
      this.loginSection = false;
      this.signupSection = false;
      this.uploadDirectorySection = true;
      this.uploadSection = false;
      this.viewDataSection = false;
      this.userSection = true;
      this.contractAddress = undefined;
      this.accountName = undefined;
      this.contractName = undefined;
      this.contractDuration = 100000;
      this.currentFile = undefined;
      this.currentDirectory = undefined;

      this.message = "";
    },
    showLoginSection() {
      this.loginSection = true;
      this.signupSection = false;
      this.uploadSection = false;
      this.uploadDirectorySection = false;
      this.userSection = false;
      this.fileInfos= [];
      this.contractAddress = undefined;
      this.ethoProtocolKey = undefined;
      this.accountName = undefined;
      this.contractName = undefined;
      this.contractDuration = 100000;
      this.currentFile = undefined;
      this.currentDirectory = undefined;

      this.message = "";
    },
    showSignupSection() {
      this.loginSection = false;
      this.signupSection = true;
      this.uploadSection = false;
      this.uploadDirectorySection = false;
      this.userSection = false;
      this.fileInfos= [];
      this.contractAddress = undefined;
      this.ethoProtocolKey = undefined;
      this.accountName = undefined;
      this.contractName = undefined;
      this.contractDuration = 100000;
      this.currentFile = undefined;
      this.currentDirectory = undefined;

      this.message = "";
    },
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
      this.contractDuration = 100000;
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
    setAccountName(name) {
      this.progress = 0;
      this.accountName = name;
    },
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;

      this.fileSize = file.size;
      this.calculateFileUploadCost(file.size);
    },
    selectDirectory(directory) {
      console.log(directory);
      this.progress = 0;
      this.currentDirectory = directory;

      var size = 0;
      for (var i = 0; i <= directory.length - 1; i++) {
        size += directory[i].size;
        if(i == (directory.length - 1)) {
          this.directorySize = size;
          this.calculateDirectoryUploadCost(size);
        }
      }

    },
    setContractName(name) {
      this.progress = 0;
      this.contractName = name;
    },
    setContractDuration(duration) {
      this.progress = 0;
      this.contractDuration = duration;
      if(this.currentFile != undefined) {
        this.calculateFileUploadCost(this.fileSize);
      } else if(this.currentDirectory != undefined) {
        this.calculateDirectoryUploadCost(this.directorySize);
      }
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
    updateProgressBar(percent) {
      this.progress = Math.round((100 * percent) / 100);
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
        this.signupSection = false;
        this.userSection = false;
        this.uploadSection = false;
        this.uploadDirectorySection = false;
        this.fileInfos = [];
        this.contractAddress = undefined;
        this.ethoProtocolKey = undefined;
        this.accountName = undefined;
        this.contractName = undefined;
        this.contractDuration = 100000;
        this.currentFile = undefined;
        this.currentDirectory = undefined;

        this.message = "";

    },
    signup() {
      this.progress = 0;
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key";
        return;
      }
      if (!this.accountName) {
        this.message = "Please enter account name";
        return;
      }

      this.message = "";

      var loaded = 0;
      var self = this;
      var period = Math.random() * (1500 - 300) + 300;
      var progressInterval;
      
      UploadService.authenticate(this.ethoProtocolKey).then(response => {
        console.log(response);
        if(response.data.message === "true") {
          this.message = "User already registered, please login";
          return
        } else {
          this.message = "User registration in process";
          this.showProgress = true;
          progressInterval = setInterval(function(){
            if(loaded < 99) {
              loaded += Math.floor(Math.random() * 4);
              if(loaded < 99) {
                self.updateProgressBar(loaded);
              }
            } else {
              clearInterval(progressInterval);
            }
          }, period);

          UploadService.signup(this.ethoProtocolKey, this.accountName).then(response => {
            console.log(response);
            if(response.data.message === "false") {
              this.message = "User registration failed, please check wallet balance";
              this.showProgress = false;
              clearInterval(progressInterval);
              return
            } else {
              loaded = 100;
              this.updateProgressBar(loaded);
              this.showProgress = true;
              clearInterval(progressInterval);
              this.showProgress = false;
              this.message = "User registration successful";
              setTimeout(function(){ 
                self.message = "";
              }, 3000);
              this.login();
            }   
          })
        }  
      })
    },
    login() {
      this.signupSection = false;
      this.showProgress = false;
      this.progress = 0;
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key";
        return;
      }

      this.message = "";

      UploadService.authenticate(this.ethoProtocolKey).then(response => {
        console.log(response);
        if(response.data.message === "true") {
          this.loginSection = false;
          this.userSection = true;
          this.message = "Retrieving existing contracts";
          UploadService.list(this.ethoProtocolKey).then(response => {
            this.message = "";
            this.fileInfos = response.data;
          })
        } else {
          this.message = "Authentication failed - user not found";
        }

      })
    },
    upload() {
      this.progress = 0;
      if (!this.currentFile) {
        this.message = "Please select a file";
        return;
      }
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key";
        return;
      }
      if (!this.contractName) {
        this.message = "Please enter upload contract name";
        return;
      }
      if (!this.contractDuration) {
        this.message = "Please select upload contract duration";
        return;
      }

      this.showProgress = true;
      this.message = "";
      
      var self = this;
      var progressInterval; 
      var loaded = 0;
      
      UploadService.upload(this.currentFile, this.ethoProtocolKey, this.contractName, this.contractDuration, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
        if(this.progress == 100) {
          this.showProgress = false;
          this.progress = 0;
          this.message = "Waiting for transaction confirmation";
          var period = Math.random() * (1500 - 300) + 300;
          
          progressInterval = setInterval(function(){
            self.showProgress = true;
            if(loaded < 99) {
              loaded += Math.floor(Math.random() * 4);
              if(loaded < 99) {
                self.updateProgressBar(loaded);
              }
            } else {
              clearInterval(progressInterval);
            }
          }, period);

        } else {
          this.message = "Data upload in progress";
        }
      })
      .then((response) => {
        console.log(response);
        //this.message = response.data.message;
        loaded = 100;
        clearInterval(progressInterval);
        this.updateProgressBar(loaded);
        this.message = "Retrieving existing contracts";
        UploadService.list(this.ethoProtocolKey).then(response => {
          this.message = "";
          this.fileInfos = response.data;
          this.showProgress = false;
          this.showViewDataSection()
        });
      })
      .catch(() => {
        this.showProgress = false;
        this.progress = 0;
        this.message = "Could not upload the file";
        this.currentFile = undefined;
        this.currentDirectory = undefined;
        this.ethoProtocolKey = undefined;
        this.contractName = undefined;
        this.contractAddress = undefined;
        this.contractDuration = 100000;
        this.accountName = undefined;
      });
    },
    uploadDirectory() {
      this.showProgress = false;
      this.progress = 0;
      if (!this.currentDirectory) {
        this.message = "Please select a directory";
        return;
      }
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key";
        return;
      }
      if (!this.contractName) {
        this.message = "Please enter upload contract name";
        return;
      }
      if (!this.contractDuration) {
        this.message = "Please select upload contract duration";
        return;
      }

      this.showProgress = true;
      this.message = "";
      
      var self = this;
      var progressInterval; 
      var loaded = 0;
      
      UploadService.uploadDirectory(this.currentDirectory, this.ethoProtocolKey, this.contractName, this.contractDuration, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
        if(this.progress == 100) {
          this.showProgress = false;
          this.progress = 0;
          this.message = "Waiting for transaction confirmation";
          var period = Math.random() * (1500 - 300) + 300;
          
          progressInterval = setInterval(function(){
            self.showProgress = true;
            if(loaded < 99) {
              loaded += Math.floor(Math.random() * 4);
              if(loaded < 99) {
                self.updateProgressBar(loaded);
              }
            } else {
              clearInterval(progressInterval);
            }
          }, period);

        } else {
          this.message = "Data upload in progress";
        }
      })
      .then((response) => {
        console.log(response);
        //this.message = response.data.message;
        loaded = 100;
        clearInterval(progressInterval);
        this.updateProgressBar(loaded);
        this.message = "Retrieving existing contracts";
        UploadService.list(this.ethoProtocolKey).then(response => {
          this.message = "";
          this.fileInfos = response.data;
          this.showProgress = false;
          this.showViewDataSection()
        });
      })
      .catch(() => {
        this.showProgress = false;
        this.progress = 0;
        this.message = "Could not upload the file";
        this.currentFile = undefined;
        this.currentDirectory = undefined;
        this.ethoProtocolKey = undefined;
        this.contractName = undefined;
        this.contractAddress = undefined;
        this.contractDuration = 100000;
        this.accountName = undefined;
      });
    },
    extend() {
      this.progress = 0;
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key";
        return;
      }
      if (!this.contractAddress) {
        this.message = "Please select a valid contract";
        return;
      }
      if (!this.contractDuration) {
        this.message = "Please select upload contract extension duration!";
        return;
      }

      this.showProgress = true;
      this.message = "";
      var loaded = 0;
      var self = this;
      var period = Math.random() * (1500 - 300) + 300;
      var progressInterval = setInterval(function(){
        if(loaded < 99) {
          loaded += Math.floor(Math.random() * 4);
          if(loaded < 99) {
            self.updateProgressBar(loaded);
          }
        } else {
          clearInterval(progressInterval);
        }
      }, period);

      this.message = "Confirming contract extension";
      UploadService.extend(this.ethoProtocolKey, this.contractAddress, this.contractDuration).then((response) => {
          console.log(response);
          //this.message = response.data.message;
          this.message = "Retrieving existing contracts";
          UploadService.list(this.ethoProtocolKey).then(response => {

            loaded = 100;
            clearInterval(progressInterval);
            this.updateProgressBar(loaded);
            this.fileInfos = response.data;
            this.message = "Contract extension successful";
            setTimeout(function(){ 
              self.message = "";
            }, 3000);
            
            this.currentFile = undefined;
            this.currentDirectory = undefined;
            this.contractName = undefined;
            this.contractAddress = undefined;
            this.contractDuration = 100000;
            this.accountName = undefined;
            this.showProgress = false;
          });
        })
        .catch(() => {
          this.showProgress = false;
          this.progress = 0;
          this.message = "Contract extension failed";
          this.currentFile = undefined;
          this.currentDirectory = undefined;
          this.ethoProtocolKey = undefined;
          this.contractName = undefined;
          this.contractAddress = undefined;
          this.contractDuration = 100000;
          this.accountName = undefined;
        });
    },
    remove() {
      this.progress = 0;
      if (!this.ethoProtocolKey) {
        this.message = "Please enter Etho Protocol key!";
        return;
      }
      if (!this.contractAddress) {
        this.message = "Please select a valid contract!";
        return;
      }

      this.showProgress = true;
      this.message = "";
      var loaded = 0;
      var self = this;
      var period = Math.random() * (1500 - 300) + 300;
      var progressInterval = setInterval(function(){
        if(loaded < 99) {
          loaded += Math.floor(Math.random() * 4);
          if(loaded < 99) {
            self.updateProgressBar(loaded);
          }
        } else {
          clearInterval(progressInterval);
        }
      }, period);

      this.message = "Confirming contract removal";
      UploadService.remove(this.ethoProtocolKey, this.contractAddress).then((response) => {
          console.log(response);
          //this.message = response.data.message;
          this.message = "Retrieving existing contracts";
          UploadService.list(this.ethoProtocolKey).then(response => {
            loaded = 100;
            clearInterval(progressInterval);
            this.updateProgressBar(loaded);
            this.fileInfos = response.data;
            this.message = "Contract removal successful";
            setTimeout(function(){ 
              self.message = "";
            }, 3000);
            this.currentFile = undefined;
            this.currentDirectory = undefined;
            this.contractName = undefined;
            this.contractAddress = undefined;
            this.contractDuration = 100000;
            this.accountName = undefined;
            this.showProgress = false;
          });
        })
        .catch(() => {
          this.showProgress = false;
          this.progress = 0;
          this.message = "Contract removal failed";
          this.currentFile = undefined;
          this.currentDirectory = undefined;
          this.ethoProtocolKey = undefined;
          this.contractName = undefined;
          this.contractAddress = undefined;
          this.contractDuration = 100000;
          this.accountName = undefined;
        });
    },
  },
  mounted() {
  }
};
</script>
