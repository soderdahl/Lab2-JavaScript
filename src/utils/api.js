import { getQueryString } from './helpers'

export const url = 'https://www.forverkliga.se/JavaScript/api/crud.php'

export function addBook({title, author}, cb){
  const key = localStorage.getItem('apiKey')

   title = document.getElementById('title').value

   author = document.getElementById('author').value  

  
  getApiKey (function(key) {
    request(request(`key=${key}&op=insert&title=${title}&author=${author}`, function(
    data){
      if(cb) {
        cb(data)
      }
    }))
  })
}

/* export function fetchBooks(cb) {
  const key = localStorage.getItem('apiKey')
  getApi(function(key) {
    request('key${key}&op=select', function(data) {
      if(cb) {
        cb(data)
      }
    })
  })
} */

export function fetchBooks(e) {

  const key = localStorage.getItem('apiKey')

  if (key) {

    request(`key=${key}&op=select`, function(data) {

        console.log(data)

      })

  } else {

    getApiKey(function(key) {

      request(`key=${key}&op=select`, function(data) {

        console.log(data)

      })

    })

  }

}




// Funktion för att göra ett request mot apiet

// Tar emot en sträng (qs) som används som querystring för requesten

// Tar emot en callback (funktion) som körs när svaret från servern kommit (cb)

// Tar emot ett nummer som parameter som indikerar en gräns på hur många försöka som får göras (limit)

function request(qs, cb, limit = 10) { 

  fetch(`${url}${qs}`)

    .then(function(response) {

      // Konverta svaret till JavaScript-objekt

      return response.json()

    })

    .then(function(data) {

      // Kolla hur svaret ser ut från apiet

      // Om operationen lyckades så kör funktionen cb

      if (data.status === 'success') {

        if (cb) {

          cb(data)

        }


      } else if (limit > 0) {

        request(qs, cb, limit - 1)
      

      } else {

        console.log(data.message, 'tries:', limit)

      }

    })

    .catch(function(error) {

      console.log(error)

    })

}





function getApiKey(callback) {

  request('requestKey', function(data) {
    

    localStorage.setItem('apiKey', data.key)   

   

    if (callback) {

      callback(data.key)

    }

  })

}




