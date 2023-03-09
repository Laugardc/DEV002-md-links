
import {
  pathExists, findMDFiles,
  findDirectory, findLinksFileContent, getAbsolutePath,
  validateLinks, getStats, getTotalBroken
} from './functions.js';

//inputs path , options
//output Objeto {stats, validate, links}
//descripcion 

export function mdLinks(path, options = {}) {
  return new Promise((resolve, reject) => {
    // identificar si la ruta existe
  if (pathExists(path) === false) {
    reject('No es valida la ruta');
    return;
  } else {
    // console.log('ruta SI es valida');
    // asegurar que mi ruta sea absoluta
    let absPath = getAbsolutePath(path);
    // console.log("la ruta si es absoluta");
    //entras y buscas
    //buscar archivos MD
    if (findDirectory(absPath)) {

      let arrayMd = findMDFiles(absPath);
      // console.log('arrayMd', arrayMd);
      if (arrayMd.length > 0) {
        let links = [];
        arrayMd.forEach(fileMd => {
          //por cada documento que recorre trae un arreglo con los links de ese documento
          let linksByFile = findLinksFileContent(fileMd);
          //aqui los concatenamos para traer en 'links' todos los links encontrados de todos los documentos
          links = links.concat(linksByFile);
        });
        if(links.length === 0){
          reject('No se encontraron links en los archivos .md');
        }
        // console.log('links', links);
        if (options.stats && !options.validate) {
          resolve({stats: getStats(links), validate: null, links: links});
        }
        else if (options.validate && !options.stats) {
          validateLinks(links)
            .then(
              //trae un arreglo de objetos, que resultaron del resolve de las promesas
              responses => {
                let result = [];
                //httpResponse es un objeto que resulta de la llamada de axios.get
                responses.map(httpResponse => {
                  //si la solicitud se cumple
                  if (httpResponse.status === 'fulfilled') {
                    //imprime la ruta , el link, estado de la respuesta y el host de solicitud
                   result.push(`${absPath} ${httpResponse.value.config.url} ok ${httpResponse.value.status} link a ${httpResponse.value.request.host}`);
                  }
                  //si la solicitud se rechaza
                  else if (httpResponse.status === 'rejected') {
                    //imprime la ruta, el link, el estado de respuesta - si no hay response o status imprime error500 -, host
                    result.push(`${absPath} ${httpResponse.reason.config.url} fail ${httpResponse.reason.response?.status || 500} link a ${httpResponse.reason.request.host}`);
                  }
                });
                resolve({stats: null, validate: result, links: links});
              }
              //si hay error en el proceso de validacion
            ).catch(
              err => {
                reject(err);
              }
            );
        }
        else if (options.stats && options.validate) {
          let stats =  getStats(links);
          getTotalBroken(links)
          .then(totalBroken => {
            stats.totalbroken = totalBroken;
            resolve({stats: stats, validate: null, links: links});
          })
          .catch(err =>{
            reject(err);
          });
          
        }
        else {
          let result = links.map(element => `${element.path} ${element.href} ${element.text}`);
          resolve(result);
          
        }
      }
      else {
        reject('No hay archivos .md en el directorio.');
        return;
      }
    }
    else {
      reject('La ruta no es un directorio.');
      return;
    }
    
  }

  })
}