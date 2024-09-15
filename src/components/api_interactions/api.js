// api.js or a similar file
import axios from 'axios';

export const MediaPost = async (backendResponse, flag) => {
  try {
    const data = {
      "procedure": backendResponse.procedure,
      "s_p": backendResponse.safetyProtocols,
      "l_a_r": backendResponse.lawsAndRegulations,
      "access": flag,
    }
    //http://tailings-treatment.westus2.cloudapp.azure.com/post/
    const response = await axios.post('http://tailings-treatment.westus2.cloudapp.azure.com/api/post/', data);
    console.log(response);
    alert("Data uploaded successful");
  }
  catch (error) {
    console.error("Error Uploading Data: ", error);
  }
}

export default MediaPost;