const EventEmitter = require('events');
const http = require('http')

class Sales extends EventEmitter {
  constructor(){
    super();
  }
}


const myEmitter = new Sales();

//the .emit its like clicking on the button
myEmitter.on('newSale' , ()=> {
  console.log('there was a sale!')
})
myEmitter.on('newSale' , ()=> {
  console.log('there costumer name is: Alan')
})

myEmitter.on('newSale', stock => {
  console.log(`There are now ${stock} items on stock`)
})

myEmitter.emit('newSale', 9);

///////////////
const server = http.createServer();
server.on('request', (req, res) => {
  console.log('Request received')
  res.end('Request received')
})

server.on('request', (req, res) => {
  console.log('Request received👍')
})

server.on('close', ()=>{
  console.log('Server closed')
})

server.listen(8000, ()=> {
  console.log('waiting for requests...')
})