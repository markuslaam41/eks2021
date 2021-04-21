var form = document.getElementById("form");

form.addEventListener('submit',function(e){
    e.preventDefault()

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var country = document.getElementById("country").value;
    var birthday = document.getElementById("birthday").value;
    var gender = document.getElementById("gender").value;

    fetch("http://localhost:3001/signup_login.html", {
        method:'POST',
        body: JSON.stringify({
            name:name,
            email:email,
            country:country,
            birthday:birthday,
            gender:gender
        }),
        headers:{
            "Content-Type":"application/json; charset-UTF-8"
        }
    })

    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})


    
/*
var form_edit= document.getElementById("form_edit");
form_edit.addEventListener('submit',function(e){
 e.preventDefault()
 var name_edit = document.getElementById("name_edit").value;
 var email_edit = document.getElementById("email_edit").value;
 var country_edit = document.getElementById("country_edit").value;
 var birthday_edit = document.getElementById("birthday_edit").value;
 var gender_edit = document.getElementById("gender_edit").value;

 fetch("http://localhost:7071/api/user", {
     method:'PUT',
     body: JSON.stringify({
         name_edit:name_edit,
         email_edit:email_edit,
         country_edit:country_edit,
         birthday_edit:birthday_edit,
         gender_edit:gender_edit
     }),
     headers:{
         "Content-Type":"application/json; charset-UTF-8"
     }
 })

 .then((response)=>{
     return response.json()
 })
 .then((data)=>{
     console.log(data)
 })
 .catch((err)=>{
     console.log(err)
 })
})
*/
