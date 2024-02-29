import axios from "axios";
import { getContentType } from "./util"; 
const BASE_URL = "http://localhost:8080/filmarchive/webapi/films";
const fetchData = async (path, parameters) => {
    try {
      const url = path ? `${BASE_URL}/${path}` : BASE_URL;
      
      const response = await axios.get(url, {
        params: parameters,
        headers: getHeaders(),
      });
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

const postData = async (path, content) => {
  try {
    const url = path ? `${BASE_URL}/${path}` : BASE_URL;
    const response = await axios.post(url, content, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

const updateData = async (path, content) => {
  try {
    const url = path ? `${BASE_URL}/${path}` : BASE_URL;
    const response = await axios.put(url, content, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

const deleteData = async (id) => {
    try {
        const url = `${BASE_URL}/${id}`;
        const response = await axios.delete(url, {
            headers : getHeaders()
        } )
        return response;
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

const getHeaders = () => {
    const contentType = getContentType();
    return {
        'Content-Type': contentType,
        'Accept': contentType,       
    };
}


  export default fetchData;
  export { deleteData, postData, updateData };