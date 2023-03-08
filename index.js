
import {
  pathExists, findMDFiles,
  findDirectory, findLinksFileContent, getAbsolutePath,
  validateLinks, getStats, getTotalBroken
} from './functions.js';

//inputs path , options
//output array de links
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
          let actualArray = findLinksFileContent(fileMd);
          links = links.concat(actualArray);
        });
        // console.log('links', links);
        if (options.stats && !options.validate) {
          getStats(links);
        }
        else if (options.validate && !options.stats) {
          validateLinks(links)
            .then(
              responses => {
                // console.log('All res', responses);
                responses.map(response => {
                  //si la solicitud se cumple
                  if (response.status === 'fulfilled') {
                    //imprime la ruta (tendria que mostrar la ruta relativa?), el link, estado de la respuesta y el host de solicitud
                   console.log(`${absPath} ${response.value.config.url} ok ${response.value.status} link a ${response.value.request.host}`);
                  }
                  //si la solicitud se rechaza
                  else if (response.status === 'rejected') {
                    //imprime la ruta, el link, el estado de respuesta - si no hay response o status imprime error500 -, host
                    console.log(`${absPath} ${response.reason.config.url} fail ${response.reason.response?.status || 500} link a ${response.reason.request.host}`);
                  }

                })
              }
              //si hay error en el proceso de validacion
            ).catch(
              err => {
                reject('All err', err);
              }
            );
        }
        else if (options.stats && options.validate) {
          getStats(links);
          getTotalBroken(links);
          
        }
        else {
          console.log('ni validate ni stats');
          links.map(element => console.log(`${element.path} ${element.href} ${element.text}`));
        }
      }
    }
  }

  })
}