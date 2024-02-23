const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()
//this changes the threadpool size
process.env.UV_THREADPOOL_SIZE = 4;
fs.readFile('test-file.txt', ()=> {
  console.log('i/o finished')

  setTimeout(()=> console.log('Timer 1 finished'), 0);
  setTimeout(()=> console.log('Timer 2 finished'), 3000);

  //set immediate is solved once per loop fase
  setImmediate(()=> console.log('Imidiate 1 finished'));

  //nextTick will be solved before the next loop fase
  process.nextTick(()=> console.log('next-click'));
  
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=> {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=> {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=> {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=> {
    console.log(Date.now() - start, 'password encrypted')
  })
})

console.log('Hello')