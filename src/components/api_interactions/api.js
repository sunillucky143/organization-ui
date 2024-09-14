// api.js or a similar file
import axios from 'axios';

export const MediaPost = async (backendResponse, flag) => {
  try {
    const data = {};
    if(flag === "public"){
      const data = {
        "procedure": backendResponse.procedure,
        "s_p": backendResponse.safetyProtocols,
        "l_a_r": backendResponse.lawsAndRegulations,
        "access": "public",
      }
    }else{
      const data = {
        "procedure": backendResponse.procedure,
        "s_p": backendResponse.safetyProtocols,
        "l_a_r": backendResponse.lawsAndRegulations,
        "access": "private",
      }
    };
    const response = await axios.post('http://localhost:8000/post/', data);
    alert("Data Stored Successfully");
  }
  catch (error) {
    console.error("Error Uploading Data: ", error);
  }
}

export default MediaPost;