// //conectarnos al servidor
// window.fetch(url).
// // procesar la respuesta y convertirla en JSON
// then(respuesta => {respuesta.json()})
// // pasar el JSON a información a renderizar
// .then(responseJson => {
//   responseJson.data.forEach( (item) => {
//     // crear una imagen, un título y el precio del elemento
//     const image = document.createElement('img')
//     const title = document.createElement('h2')
//     const price = document.createElement('div')

//   })
// })


const BASE_URL = "https://platzi-avo.vercel.app"
const container = document.querySelector('.contenido')
const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat('en-EN', { 
    style: 'currency', 
    currency: 'USD'
  }).format(price)
  return newPrice
}

function renderProduct (image, title, price, description){
  const itemBox = `
    <div class="item-container flex bg-white shadow-lg rounded-lg overflow-hidden">
      <img class="w-1/3" src="${BASE_URL}${image}">     
      <div class="text-gray-900 text-2xl">
        <p class="description mt-2 text-gray-600 text-sm">${description}</p>
        <h2 class="title">${title}</h2>
        <div class="price flex item-center justify-between mt-3">
          <p class="mt-2 text-gray-600 text-sm">${formatPrice(price)}</p>
          <button class="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
            Añadir al Carrito
          </button>        
        </div>
      </div>
    </div>
  `
  return itemBox
}

async function obtenerData(){
  let contenido = ''
  const respuesta = await fetch(`${BASE_URL}/api/avo`)
  const responseJson = await respuesta.json()
  responseJson.data.forEach( (item) => { 
    contenido += renderProduct(item.image, item.name, item.price, item.attributes.description) 
  })
  container.innerHTML = contenido
}

obtenerData()