import http from "../http-common";

class UploadFilesService {
  upload(file, key, name, duration, onUploadProgress) {
    let formData = new FormData();
    console.log(file);
    formData.append("file", file);
    formData.append("key", key);
    formData.append("name", name);
    formData.append("duration", duration);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  async uploadDirectory(directory, key, name, duration, onUploadProgress) {
    let formData = new FormData();
    //console.log(directory);
    directory.forEach(function(file, index, array){
      formData.append("files", file);
      //console.log(file);
      if(index === (array.length-1)) {
        formData.append("key", key);
        formData.append("name", name);
        formData.append("duration", duration);
        console.log("finished");
        console.log(formData);
        return http.post("/uploaddirectory", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress
        });
      }
    })

    /*formData.append("files", directory[0]);
    formData.append("key", key);
    formData.append("name", name);
    formData.append("duration", duration);

    return http.post("/uploaddirectory", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });*/

  }

  extend(key, address, duration, onUploadProgress) {
    let formData = new FormData();

    formData.append("key", key);
    formData.append("address", address);
    formData.append("duration", duration);

    return http.post("/extend", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  remove(key, address, onUploadProgress) {
    let formData = new FormData();

    formData.append("key", key);
    formData.append("address", address);

    return http.post("/remove", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  signup(key, name, onUploadProgress) {
    let formData = new FormData();

    formData.append("key", key);
    formData.append("name", name);

    return http.post("/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  list(key) {
    let formData = new FormData();

    formData.append("key", key);

     return http.post("/list", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }

  authenticate(key) {
    let formData = new FormData();

    formData.append("key", key);

     return http.post("/authenticate", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
}

export default new UploadFilesService();
