var postDescription = "";
document.getElementById("getData").addEventListener("click", () => {
    if(!localStorage.users){
    Promise.all([getUsers(),getPosts(),getComments()]).then((data)=>{
        localStorage.users = JSON.stringify(data[0]);
        localStorage.posts = JSON.stringify(data[1]);
        localStorage.comments = JSON.stringify(data[2]);
});
}

var index = 0;
if(postDescription == ""){
JSON.parse(localStorage.posts).forEach(element => {
    
        postDescription += `<div id = post_${index}><article>
        <header>
          <h1>UserName : </h1> <p>${JSON.parse(localStorage.users)[parseInt(element.userId) - 1].username }</p>
          <h1>Title: </h1> <p>${element.title}</p>
          <h1>Description: </h1> <p>${element.body}</p>
        </header>
      </article><br/></div>
      <input type = ${"submit"} id = ${"like_"+ element.id} value = "Like"/>
      <input type = ${"submit"} id = ${"comment_"+ element.id} value = "Comments"/> 
      <input type = ${"submit"} id = ${"delete_" + index} value = "delete post"/>`;
    
    
});
}
document.getElementById("getData").insertAdjacentHTML("afterend",postDescription);
});

jQuery(document).on('click', '[id^="comment_"]', function(e) {

});
jQuery(document).on('click', '[id^="delete_"]', function(e) {

});
jQuery(document).on('click', '[id^="like_"]', function(e) {

});

function attachLikeEvent(){

}
function attachDeleteEvent(){

}
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