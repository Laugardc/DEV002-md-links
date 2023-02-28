const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // identificar si la ruta existe
    if (FileSystem.existsSync(path)){
      //checar o convertir a una ruta absoluta
      //probar si esa ruta absoluta es un archivo o un directorio
      //si es un directorio filtrar los archivos md
    }else{
      //si no existe la ruta se rechaza la promesa
      reject("la ruta no eciste");
    }
  });
}
module.exports = () => {
  mdLinks
};
