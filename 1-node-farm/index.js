const fs = require('fs');
const http = require('http');
const url = require('url');

/* Files: */
//Blocking example:
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn)
// const textOut = `That's what is written in the file: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File written!')

//Non-blocking example:,
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('Error!!!')
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) =>{
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written');
//       })
//     })
//   })
// })
// console.log('Will read the file');

/* Server routing */

//a variavel dirname representa o diretorio de onde estamos executando agr
//é um blocking code MAS só é executado quando a aplicação inicia e nao a cada requisição.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); //array
const dataProducts = JSON.parse(data); // json.parse transforma nossa json(que é tudo string) em um objeto

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  return output;
}

//ler os templates antes de ter as requisições
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8'); 
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8'); 
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8'); 


//função chamada quando é recebida a requisição
const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true)

    //OVERVIEW 
      if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataProducts.map(e => replaceTemplate(templateCard, e)).join('')
        const output = templateOverview.replace('{%PRODUCT_CARD%}', cardsHtml)
        res.end(output)
        // API
      } else if (pathname === '/api' && req.method === 'GET') {
        res.writeHead(200, {'Content-type': 'application/json'}),
        res.end(data)
        // PRODUCT
      } else if  (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product =  dataProducts[query.id];
        const output = replaceTemplate(templateProduct, product)
        res.end(output)
        // 404 PAGE
      } else {
        res.writeHead(404, {
          'Content-type': 'text/html',
        }),
        res.end('<h1>Not found page</h1>')
      }
})

server.listen(8000, () => {
  console.log('Listening to requests on port 8000');
})