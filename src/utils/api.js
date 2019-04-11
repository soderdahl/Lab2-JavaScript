

export const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?'

export function addBook(book, cb){
  const key = localStorage.getItem('apiKey')   

  if(key){
    request(`key=${key}&op=insert&title=${book.title}&author=${book.author}`, function(
      data){
  
          cb(data)
        console.log(data)
    })
  } else{
   
  getApiKey (function(key) {
    request(`key=${key}&op=insert&title=${book.title}&author=${book.author}`, function(
    data){
     
        cb(data)
      console.log(data)
    })
  })
}
}

export function fetchBooks(book, cb) {
//const key = localStoreItem('apiKey)
  getApiKey(function(key) {
    request(`key=${key}&op=insert&title=${book.title}&author=${book.author}`, function(data) {
      if(cb) {
        cb(data)
      }
    })
  })
}



/* export function fetchBooks(e) {

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

} */




// Funktion för att göra ett request mot apiet

// Tar emot en sträng (qs) som används som querystring för requesten

// Tar emot en callback (funktion) som körs när svaret från servern kommit (cb)

// Tar emot ett nummer som parameter som indikerar en gräns på hur många försöka som får göras (limit)

export function request(qs, cb, limit = 10) { 

  fetch(`${url}${qs}`)

    .then(function(response) {

         return response.json()

    })

    .then(function(data) {

      if (data.status === 'success') {

        if (cb) {

          cb(data)

        }


      } else if (limit > 0) {

        request(qs, cb, limit - 1)
      

      } else {

        console.log(data.message)

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




