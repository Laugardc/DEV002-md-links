import { existsSync } from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';

//Verificar si existe ruta
export function pathExists(route) {
    const result = existsSync(route) ? true : false;
    return result;
}
//Verificar si la ruta es absoluta, si es la mantiene, si es relativa la convierte
export function absolutePath(route) {
    const result = path.isAbsolute(route);
    return result;
}

// Es un directorio?, recorre los archivos
export function findDirectory(path) {
    const result = fs.lstatSync(path).isDirectory()
    return result;
}

export function findMDFiles(path) {
    const arrayMd = []
    
    let files= fs.readdirSync(path, (error, files) => {
        if (error) console.log(error)   
    })
    files.forEach(file => {
        if (file.endsWith('.md')) {
            arrayMd.push(file)
        } 
    })
    return arrayMd;
    // console.log(arrayMd);
    // if(arrayMd.length===0){
    //     return 'la ruta no tiene archivos MD'
    // }else  {return arrayMd};
}

//Funcion que retorna los link del contenido de un archivo .md
function findLinksFileContent(route) {
    const linkFileMd = []
    const textContentMarkdown = fs.readFileSync(route, { encoding: 'utf8' });
    const myRe = /\[([^\]]*)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm;
    if (textContentMarkdown) {
        textContentMarkdown.match(myRe).forEach((element) => {
            const text = element.split("](")[0].slice(1)
            const link = element.split("](")[1].slice(0, -1)
            linkFileMd.push({
                href: link,
                text: text,
                path: route,
            });
        });
    } else {
        linkFileMd.push()
    }
    return linkFileMd
};
