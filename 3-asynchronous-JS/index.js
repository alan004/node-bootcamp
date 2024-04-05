// https://dog.ceo/api/breeds/image/random Fetch!
const superagent = require("superagent")
const fs = require("fs")

//callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed:' ${data}`)

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message)
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message)
//         console.log("Random dog image saved!")
//       })
//     }).catch(err =>{
//       console.log(err.message)
//     })
// })

//using promises to solve callback hell
// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) reject("Cant find file")
//       resolve(data)
//     })
//   })
// }

// const writeFilePro = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject("Cant not write file")
//       resolve("success")
//     })
//   })
// }

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed:' ${data}`)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//   })
//   .then((res) => {
//     console.log(res.body.message)
//     return writeFilePro("dog-img.txt",res.body.message)
//   })
//   .then(()=>{
//     console.log('Image saved')
//   })
//   //we need only one error handler
//   .catch((err) => {
//     console.log(err.message)
//   })

//using async await
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Cant find file")
      resolve(data)
    })
  })
}

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Cant not write file")
      resolve("success")
    })
  })
}

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`)
    console.log(`Breed:' ${data}`)

    const res1 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const imgs = [res1, res2, res3].map(e => e.body.message);
    console.log(imgs)
    await writeFilePro("dog-img.txt", imgs.join('\n'))
    console.log("Image saved")
  } catch (err) {
    return 'ERROR'
  }
  return '2READY'
}

(async() => {
   try{
    const x = await getDogPic()
    console.log(x)
   } catch(err){
      console.log('ERROR')
   }
})()


// //using then to get access to the value of return
// getDogPic().then(x => {
//   console.log(x)
// }).catch(err => {
//   console.log('ERROR')
// })

getDogPic()
