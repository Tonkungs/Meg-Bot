function to(promise) {
    return promise.then(data => {
       return {
         error: null,
         result: data
       }
    })
    .catch(err => {
      return {
        error: err
      }
    })
 }

 export default to

// demo
//  async function main () {
//     let result, error, finalResult = []
//     { result, error } = await to(axios.get(`${url}/getA`))
//     if (error) {
//         console.log(error)
//         return
//     }
//     finalResult = [...finalResult, ...result]
//     { result, error } = await to(axios.get(`${url}/getB`))
//     if (!result) {
//       result = [{ name: 'admin' }]
//     }
//     finalResult = [...finalResult, ...result]
// }

// stories.sellsuki.co.th/js-201-กับดักอันตราย-promise-async-await-เขียนแล้วพัง-แทนที่จะปัง-6e26a1af1bd1