import { TIMEOUT} from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};

export const getJson = async function(url) {
    try {
        const result = await Promise.race([fetch(url), timeout(TIMEOUT)]); 
        // console.log(result);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log('error ', error);
    }
}