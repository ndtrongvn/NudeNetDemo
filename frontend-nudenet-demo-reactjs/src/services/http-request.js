import axios from "axios";

class HTTPReq {
  axiosReq = {};
  constructor() {
    this.axiosReq = axios.create({
      baseURL: "http://localhost:5000",
    });
  }

  uploadImage = (image) => {
    let formData = new FormData();
    formData.append("image", image);

    return this.axiosReq.post("/process", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  getTest() {
    return this.axiosReq.get("/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export default HTTPReq;
