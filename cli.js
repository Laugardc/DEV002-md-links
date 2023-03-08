#!/usr/bin/env node
import { mdLinks } from "./index.js";

const route = process.argv[2];
if (!route) {
    console.log('porfavor pase una ruta');
}
else {
    // console.log('process', process.argv);
    const options = {
        validate: process.argv.includes('--validate'),
        stats: process.argv.includes('--stats')
    };

    mdLinks(route, options).then((res) => {console.log(res)}).catch((error) => {console.log(error)})

}

