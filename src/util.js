import { APPLICATION_JSON, APPLICATION_XML } from "./default-request-types";
import xml2js from 'xml2js';

const parser = new xml2js.Parser();
async function parseResponse(body) {
    const contentType = getContentType();
    if (contentType === APPLICATION_JSON) {
        return body;
    }

    if (contentType === APPLICATION_XML) {
        try {
            const parsedObject = await parser.parseStringPromise(body);
            return parsedObject;
        } catch (ex) {
            console.error(ex);
            throw ex; 
        }
    }
}


const getContentType = () =>{
    const storedFormat = sessionStorage.getItem('selectedFormat');
    if (storedFormat){
       return storedFormat; 
    }
    return APPLICATION_JSON;
  }

  const setContentType = (contentType) => {
    sessionStorage.setItem('selectedFormat', contentType);
  }

export default parseResponse;
export { getContentType, setContentType };