
import { absolutePath, pathExists, findMDFiles } from './functions.js';

//inputs path , options
//output array de links
//descripcion 
if (process.argv[2]) {
  console.log('la usuaria si paso parametro');
  mdLinks(process.argv[2]);
} else {
  console.log('porfavor pase una ruta');
};
export function mdLinks(path, options = {}) {
  // identificar si la ruta existe
  if (pathExists(path) === false) {
    console.log('No es valida la ruta');
    return;
  } else {
    console.log('ruta SI es valida');
    if (absolutePath(path)) {
      console.log("la ruta si es absoluta");
      //entras y buscas
      //buscar archivos MD
      let arrayMDFiles = findMDFiles(path);

      // if(isFile(path)){
      //   console.log ('si existe archivo');
      //   if(isFileMd(path)){
      //     console.log('es un archivo md');
      //   }else{
      //     console.log('no es md');
      //   }
      // }else{
      //   console.log('no hay archivo');
      // }
    }
    else {
      console.log('no es absoluta');
      //convertir

    }
  }
}




// mdLinks('/.', {}).then(res => {
//   console.log(res);
// }).catch(error => {
//   console.error(error);
// });


// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });