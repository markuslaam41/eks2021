
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

//function that takes a method, url and data
const sendHttpRequest = (method,url,data) =>{
    //send fetch request
    return fetch (url,{
        method: method,
        //attatch body, converts the package to json data
        body:JSON.stringify(data),
        //add headers
        headers: data ? {'Content-Type':'application/json'} : {}
    })
    .then(response => {
        //
        if (response.status >= 400) {
            // !response.ok
            return response.json().then(errResData => {
              const error = new Error('Something went wrong!');
              error.data = errResData;
              throw error;
            });
          }
          return response.json();
        });
      };

const getData = () => {
    //fetch() is a modern addition to the browser
    //older browser does not support it
    //fetch already uses promises
    //GET data
    sendHttpRequest('GET','https://localhost3001/products')
    .then(responseData=>{
        console.log(responseData);
    });

};

const sendData = () => {
    sendHttpRequest('POST','https://localhost3001/user/signup',{
    //javascript data object
    email: 'eve.holt@reqres.in',
    password:'pistol'
    }).then(responseData=>{
        console.log(responseData);
    })
    .catch(err => {
        console.log(err);
    });
    

};



getBtn.addEventListener('click',getData);
postBtn.addEventListener('click',sendData);