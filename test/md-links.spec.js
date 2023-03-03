// const mdLinks = require('../index.js');
import { mdLinks } from '../index'


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Deberia devolver una promesa', () => {
  //   expect(mdLinks).toBe(typeof Promise);
  // });
  it('Debe debe rechazar cuando el path no existe', () => {
    return mdLinks('/laura/curso/noexiste.md').catch((error) => {
      expect(error).toBe("la ruta no existe");
    })
  })
});
