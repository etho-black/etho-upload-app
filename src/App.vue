<template>
  <v-app>
    <v-container fluid style="width: 600px">
      <div class="mb-5" justify="center" align="center">
        <h1>Etho Protocol</h1>
        <h2>Upload Contract Management</h2>
      </div>

      <upload-files></upload-files>
    </v-container>
  </v-app>
</template>

<script>
import UploadFiles from "./components/UploadFiles";

export default {
  name: "App",
  components: {
    UploadFiles,
  },
};
</script>

