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
const server = http.createServer((req, res) => {
  const pathName = req.url;
  (pathName === '/overview' || pathName === '/' 
  ? (res.end('This is the overview')) 
  : (pathName === '/product') 
  ? (res.end('This is the Product')) 
  : (res.writeHead(404, {
    'Content-type': 'text/html',
  }),
  res.end('<h1>Not Found</h1>')))
});
server.listen(8000, () => {
  console.log('Listening to requests on port 8000');
});