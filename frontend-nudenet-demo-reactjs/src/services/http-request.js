import axios from "axios";

class HTTPReq {
  axiosReq = {};
  constructor() {
    this.axiosReq = axios.create({
      baseURL: process.env.REACT_APP_DOMAIN,
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
  getHistories = () => {
    return this.axiosReq.get("/histories");
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
