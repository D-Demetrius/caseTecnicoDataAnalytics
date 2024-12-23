const { readFile, writeFile } = require('fs');


// * Função: corrigir os erros
function corrigeNumero(valor) {
  let numString = Number(valor);
  return isNaN(numString) ? valor : numString;
}
function corrigeAtributo(atr) {
  let atrCorrigido = atr.toLowerCase(); //* deixar todas as letras minusculas para utilizar no relatório
  const correcoes = { "ø": "o", "æ": "a" };

  for (const [originC, novoC] of Object.entries(correcoes)) {
    atrCorrigido = atrCorrigido.replaceAll(originC, novoC);
  }

  return atrCorrigido;
}

// * Função: ler o arquivo 1
readFile('broken_database_1.json', 'utf8', (erro, jsonContent) => {
  if (erro) {
    console.log("Erro ao ler o arquivo:", erro)
    return;
  }
  // console.log('File data:', jsonContent);

  const jsonCorropido = JSON.parse(jsonContent);

  // * Funcão: percorrer o banco de dados corrompido e corrige os erros (caracteres e string para number)
  const jsonCorrigido = jsonCorropido.map(obj => {
    // Corrige strings para números e aplica substituições
    const objCorrigido = {};

    for (const [chave, valor] of Object.entries(obj)) {

      if (typeof valor === 'string') {
        // Substitui caracteres e tenta converter para número
        const valorCorrigido = corrigeAtributo(valor);
        objCorrigido[chave] = corrigeNumero(valorCorrigido);
      } else {
        // Mantém valores não string
        objCorrigido[chave] = valor;
      }

    }
    return objCorrigido;
  });

  // * Função: exportar o arquivo1.json corrigido
  writeFile('broken_database_1.json', JSON.stringify(jsonCorrigido, null, 2), err => {
    if (err) {
      console.error("Erro ao exportar o arquivo:", err);
    } else {
      console.log("Json exportado e corrigido 'broken_database_1.json'");
    }
  });
});



// * Função: ler o arquivo 2
readFile('broken_database_2.json', 'utf8', (erro, jsonContent) => {
  if (erro) {
    console.log("Erro ao ler o arquivo:", erro)
    return;
  }
  // console.log('File data:', jsonContent);

  const jsonCorropido2 = JSON.parse(jsonContent);

  // * Funcão: percorrer o banco de dados corrompido e corrige os erros
  const jsonCorrigido2 = jsonCorropido2.map(obj => {
    return {
      id_marca: obj.id_marca,
      marca: corrigeAtributo(obj.marca)
    };
  });

  // * Função: exportar o arquivo1.json corrigido
  writeFile('broken_database_2.json', JSON.stringify(jsonCorrigido2, null, 2), err => {
    if (err) {
      console.error("Erro ao exportar o arquivo:", err);
    } else {
      console.log("Json exportado e corrigido 'broken_database_2.json'");
    }
  });
});