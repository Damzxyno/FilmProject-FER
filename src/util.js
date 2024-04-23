import { APPLICATION_JSON, APPLICATION_XML, PLAIN_TEXT } from "./default-request-types";
import xml2js from 'xml2js';

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();
async function parseResponse(body) {
    const contentType = getContentType();
    if (contentType === APPLICATION_JSON) {
        return body;
    }

    if (contentType === APPLICATION_XML) {
        try {
            const parsedObject = await parser.parseStringPromise(body.data);
            if (parsedObject.Film){
                return {
                    data: parsedObject.Film
                }
            }
            return {
                data: parsedObject.PaginatedFilmsDTO
            }
        } catch (ex) {
            console.error(ex);
            throw ex; 
        }
    }
    if (contentType === PLAIN_TEXT){
        return {
            data: parsePlainTextData(body.data)
        }
    }
}
async function serializeToXML(data) {
    try {
        return builder.buildObject(data);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}
async function parseRequest(body){
    const contentType = getContentType();
    if (contentType === APPLICATION_JSON) {
        return body;
    }
    if (contentType == PLAIN_TEXT){
        let plainText = "[";
        if (body.id){
            plainText += `<id>[${body.id}]`;
        }
        plainText += `<director>[${body.id}]`;
        plainText += `<title>[${body.title}]`;
        plainText += `<year>[${body.year}]`;
        plainText += `<stars>[${body.stars}]`;
        plainText += `<review>[${body.review}]`;
        return plainText + "]";
    }
    if (contentType === APPLICATION_XML){
        const  value = {
            'Film' : body
        }
        return await serializeToXML(value)
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

  const toFilm = (plainText) => {
    var filmDTO = {};
    var sbKey = '';
    var sbValue = '';
    var keyLevel = 0;

    for (var i = 0; i < plainText.length; i++) {
        var item = plainText[i];
        if (item === '<' && keyLevel === 0) {
            keyLevel = 1;
            continue;
        }
        if (item === '>' && keyLevel === 1) {
            keyLevel = 2;
            continue;
        }
        if (keyLevel === 1) {
            sbKey += item;
        }
        if (item === '[' && keyLevel === 2) {
            keyLevel = 3;
            continue;
        }
        if (item === ']' && keyLevel === 3) {
            keyLevel = 0;
            filmDTO[sbKey] = sbValue;
            sbKey = '';
            sbValue = '';
        }
        if (keyLevel === 3) {
            sbValue += item;
        }
    }
  }

  function parsePlainTextData(plainText) {
    var filmDTO = {};
    var sbKey = '';
    var sbValue = '';
    var keyLevel = 0;

    for (var i = 0; i < plainText.length; i++) {
        var item = plainText[i];
        if (item === '<' && keyLevel === 0) {
            keyLevel = 1;
            continue;
        }
        if (item === '>' && keyLevel === 1) {
            keyLevel = 2;
            continue;
        }
        if (keyLevel === 1) {
            sbKey += item;
        }
        if (item === '[' && plainText[i+1] === '|' && keyLevel === 2) {
            const arr = parsePlainTextDataArray(plainText, i+2);
            i = arr.i + 1;
            keyLevel = 0;
            filmDTO[toCamel(sbKey)] = arr.objs;
            sbKey = '';
            sbValue = '';
        }
        if (item === '[' && keyLevel === 2) {
            keyLevel = 3;
            continue;
        }
        if (item === ']' && keyLevel === 3) {
            keyLevel = 0;
            filmDTO[toCamel(sbKey)] = sbValue;
            sbKey = '';
            sbValue = '';
        }
        if (keyLevel === 3) {
            sbValue += item;
        }
    }
    return filmDTO;
  }

  function parsePlainTextDataArray(plainText, i){
    let words = "";
    for(i; i < plainText.length; i++){
        if(plainText[i] === '|' && plainText [i+1] == ']'){
            break;
        }
        words += plainText[i];
    }
    const arr = words.split('|');
    const objs = arr.map(x => parsePlainTextData(x));
    return {
        i : i,
        objs : objs
    }
  }

  const toCamel = (name) => {
    let camelName;
    const nameArr = name.split("-");
    camelName = nameArr[0].toLowerCase();
    for (let i = 1; i < nameArr.length; i++){
        const currPart = nameArr[i];
        camelName += currPart[0].toUpperCase() + currPart.substring(1).toLowerCase();
    }
    return camelName;
  }
export default parseResponse;
export { getContentType, setContentType, parseRequest };