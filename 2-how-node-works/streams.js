const fs = require('fs')
const server = require('http').createServer();

server.on('request', (req, res)=> {
  //solution 1 - node will actually read the whole file before sending the res
  //the problem happens when the file is big and there a lot of requests
  // fs.readFile('test-file.txt', (err, data) =>{
  //   if (err) console.log(err)
  //   res.end(data)
  // });

  //Solution 2 - 
  //create a readable stream to be consumed piece by piece
  // const readable = fs.createReadStream('test-file.txt')
  // readable.on('data', piece=> {
  //   res.write(piece)
  // })
  // readable.on('end', () => {
  //   res.end();
  // })
  // readable.on('error', err => {
  //   console.log(err)
  //   res.statusCode = 500
  //   res.end('File not found')
  // })

  //Solution 3
  //fix backpressure handling the speed of the data coming in and the data coming out
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writableDetination)
})

server.listen(8000, () => {
  console.log('server running')
})