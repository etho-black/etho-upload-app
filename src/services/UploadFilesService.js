import http from "../http-common";

class UploadFilesService {
  upload(file, key, name, duration, onUploadProgress) {
    let formData = new FormData();

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

  list(key) {
    let formData = new FormData();

    formData.append("key", key);

     return http.post("/list", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
}

export default new UploadFilesService();
