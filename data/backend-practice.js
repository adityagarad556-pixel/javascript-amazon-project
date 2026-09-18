const xhr = new XMLHttpRequest();//build in js class to send the request to backend data

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});

xhr.open('GET','https://supersimplebackend.dev');
//GET is for , get some information from the backend
// URL for where to send the massage
xhr.send();
xhr.response

/*types of requests:
GET = get something from backend
POST = create something
PUT = update something
*/