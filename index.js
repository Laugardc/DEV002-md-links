
import { pathExists, findMDFiles, findDirectory, findLinksFileContent, getAbsolutePath, validateLinks, getStats } from './functions.js';

//inputs path , options
//output array de links
//descripcion 
if (process.argv[2]) {
  console.log('la usuaria si paso parametro');
  mdLinks(process.argv[2], process.argv[3]);
} else {
  console.log('porfavor pase una ruta');
};
export function mdLinks(path, options) {
  // identificar si la ruta existe
  if (pathExists(path) === false) {
    console.log('No es valida la ruta');
    return;
  } else {
    console.log('ruta SI es valida');
    // asegurar que mi ruta sea absoluta
    let absPath = getAbsolutePath(path);
    console.log("la ruta si es absoluta");
    //entras y buscas
    //buscar archivos MD
    if (findDirectory(absPath)) {
      let arrayMd = findMDFiles(absPath);
      console.log('arrayMd', arrayMd);
      if (arrayMd.length > 0) {
        let links = [];
        arrayMd.forEach(fileMd => {
          let actualArray = findLinksFileContent(fileMd);
          links = links.concat(actualArray);
        });
        console.log('links', links);
        // console.log(process.argv[3]);
        // console.log(options);
        if (options === '--stats') {
          getStats(links);
        }
        if (options === '--validate') {
          validateLinks(links)
            .then(
              // resp => resp.map(res => console.log(res.href, res.status))
              // responses => responses.map(res => console.log('All res', res))
              responses => {
                // console.log('All res', responses);
                responses.map(response => {
                  //si la solicitud se cumple
                  if (response.status === 'fulfilled') {
                    // console.log(response);
                    //imprime la ruta (tendria que mostrar la ruta relativa?), el link, estado de la respuesta y el host de solicitud
                    console.log(`${absPath} ${response.value.config.url} ok ${response.value.status} link a ${response.value.request.host}`);
                  }
                  //si la solicitud se rechaza
                  else if (response.status === 'rejected') {
                    // if(response.reason.response) {
                    //   console.log('tengo response');
                    //   if (response.reason.response.status) {
                    //     console.log('y tengo status');
                    //   }
                    //   else {
                    //     console.log('y NO tengo status');
                    //   }
                    // }
                    // else {
                    //   console.log('NO tengo response');
                    //   console.log('Solo tengo: ', Object.keys(response.reason));
                    //   console.log('Solo tengo: ', response.reason);
                    // }
                    // if(response.reason.res) {
                    //   console.log('tengo res');
                    // }
                    // console.log(response.reason.response);
                    //imprime la ruta, el link, el estado de respuesta - si no hay response o status imprime error500 -, host
                    console.log(`${absPath} ${response.reason.config.url} fail ${response.reason.response?.status || 500} link a ${response.reason.request.host}`);
                  }

                })
              }
              //si hay error en el proceso de validacion
            ).catch(
              // err => console.error(err.response.status)
              err => {
                console.log('All err', err);
              }
            );
        }

      }
    }
  }
}




