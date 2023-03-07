import { existsSync } from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';

//Verificar si existe ruta
export function pathExists(route) {
    const result = existsSync(route) ? true : false;
    return result;
}
//Si la ruta es absoluta, mantenla, si es relativa conviertela
export function getAbsolutePath(route) {

    const result = path.isAbsolute(route);

    if (result) {
        return route;
    }
    else {
        return path.resolve(route);
    }
}

// Es un directorio?
export function findDirectory(route) {
    const result = fs.lstatSync(route).isDirectory()
    return result;
}

// Contiene archivos .md?
export function findMDFiles(route) {
    const arrayMd = []

    let files = fs.readdirSync(route, (error, files) => {
        if (error) console.log(error)
    })
    files.forEach(file => {
        if (file.endsWith('.md')) {
            let fullFilePath = path.join(route, file);
            arrayMd.push(fullFilePath);
        }
    })
    return arrayMd;
}

//Funcion que retorna los link del contenido de un archivo .md
export function findLinksFileContent(route) {
    const linkFileMd = [];
    const textContentMarkdown = fs.readFileSync(route, { encoding: 'utf8' });
    const myRe = /\[([^\]]*)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm;
    if (textContentMarkdown) {
        textContentMarkdown.match(myRe).forEach((element) => {
            const text = element.split("](")[0].slice(1);
            const link = element.split("](")[1].slice(0, -1);
            linkFileMd.push({
                href: link,
                text: text,
                path: route,
            });
        });
    } else {
        linkFileMd.push();
    }
    return linkFileMd;
};
//total de links y total de links unicos
export function getStats(links) {
    let copyLinks = [...links];
    let hash = {};
    copyLinks = copyLinks.filter((current) => {
        let exists = !hash[current.href];
        hash[current.href] = true;
        return exists;
    });
    console.log('Total:', links.length, 'Unique:', copyLinks.length);
    return
}
// usando Axios, hacemos peticiones HTTP, axios.get que incluye el status code
//devuelve una promesa, que se resuelve con arreglo de objetos validando cada url
export function validateLinks(urls) {
    let promises = [];
    urls.forEach((link) => {
        promises.push(axios
            .get(link.href));
    });
    // console.log('promises: ', promises);
    //allSettled espera a que se resuelvan todas las promesas y devuelve ya sea resuelta o rechazada
    return Promise.allSettled(promises);
}
//links rotos
export function getTotalBroken(arrayPath) {
    const broken = arrayPath.filter(el => el.ok === 'fail')
    console.log ('Broken:',broken.length ? broken.length : 0);
    return
}
