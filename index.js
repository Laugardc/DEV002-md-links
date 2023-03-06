
import { absolutePath, pathExists, findMDFiles, findDirectory, findLinksFileContent, relativeToAbsolutePath, getAbsolutePath } from './functions.js';

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
    // asegurar que mi ruta sea absoluta
    let absPath = getAbsolutePath(path);
    console.log("la ruta si es absoluta");
    //entras y buscas
    //buscar archivos MD
    if (findDirectory(absPath)) {
      let arrayMd = findMDFiles(absPath);
      console.log('arrayMd', arrayMd);
      if (arrayMd.length > 0) {
        let firstMdFile = arrayMd[0];
        let links = findLinksFileContent(firstMdFile);
        console.log('array links', links);
      }
    }
  }
}




