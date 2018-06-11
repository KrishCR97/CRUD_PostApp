document.getElementById("getData").addEventListener("click", () => {
    if(!localStorage.users){
    Promise.all([getUsers(),getPosts(),getComments()]).then((data)=>{
        localStorage.users = JSON.stringify(data[0]);
        localStorage.posts = JSON.stringify(data[1]);
        localStorage.comments = JSON.stringify(data[2]);
});
}
var postDescription = "";
JSON.parse(localStorage.posts).forEach(element => {
    postDescription += `<article>
    <header>
      <h1>UserName : </h1> <p>${element.id}</p>
      <h1>Title: </h1> <p>${element.title}</p>
      <h1>Description: </h1> <p>${element.body}</p>
    </header>
    <p>WWF's mission is to stop the degradation of our planet's natural environment,
    and build a future in which humans live in harmony with nature.</p>
  </article><br/>`;
});
console.log(postDescription);
//document.getElementById("getData").insertAdjacentElement("afterend",)
});

function getPosts() {
    var posts = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/posts", success: function (data) {
                return data;
            }}));
    });
    return posts;
}

function getComments() {
    var comments = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/comments", success: function (data) {
                return data;
            }}));
    });
    return comments;
}

function getUsers() {
    var users;
    var users = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/users", success: function (data) {
                return data;
            }}));
    });
    return users;
}