var postDescription = "";
var postDetails = "";
var arr = [];
document.getElementById("addPostBtn").addEventListener("click", () => {
    var userNameP = document.getElementById("userId").value;
    var postName = document.getElementById("postName").value;
    var description = document.getElementById("description").value;
    console.log(userNameP + " " + postName + " " + description);
    if (userNameP.trim() != "" && postName.trim() != "" && description.trim() != "") {
        var arrLike = JSON.parse(localStorage.arr);
        var flag = false;
        var flagValue = 0;
        for (var index = 0; index < arrLike.length; index++) {
            if (arrLike[index].userName.toLowerCase() == userNameP.toLowerCase()) {
                flag = true;
                flagValue = index;
                break;
            }
        }
        var id = arrLike.length + 1;

        var newPost = {
            "id": id,
            "userName": userNameP,
            "postsTitleBody": []
        };
        var postTitleBody = {
            "title": postName,
            "body": description,
            "like": "Like",
            "comments": []
        };
        newPost.postsTitleBody.push(postTitleBody);
        if (flag) {
            arrLike[index].postsTitleBody.push(postTitleBody);
        }
        else {
            arrLike.push(newPost);
        }
        localStorage.arr = JSON.stringify(arrLike);
    }
    else {
        alert("Enter all the fields.");

    }
});
document.getElementById("getData").addEventListener("click", () => {
    if (!localStorage.users) {
        Promise.all([getUsers(), getPosts(), getComments()]).then((data) => {
            localStorage.users = JSON.stringify(data[0]);
            localStorage.posts = JSON.stringify(data[1]);
            localStorage.comments = JSON.stringify(data[2]);
        });
    }
    var index = 0;
    if (postDescription == "") {
        var parsedUsers = JSON.parse(localStorage.users);
        console.log(parsedUsers.length);
        if (!localStorage.arr) {
            for (var outerIndex = 0; outerIndex < parsedUsers.length; outerIndex++) {
                var newPost = {
                    "id": parsedUsers[outerIndex].id,
                    "userName": parsedUsers[outerIndex].username,
                    "postsTitleBody": []
                }
                var parsedPosts = JSON.parse(localStorage.posts);
                var parsedComments = JSON.parse(localStorage.comments);
                for (var index = 0; index < parsedPosts.length; index++) {
                    if (parsedPosts[index].userId == newPost.id) {
                        var postTitleBody = {
                            "title": parsedPosts[index].title,
                            "body": parsedPosts[index].body,
                            "like": "Like",
                            "comments": []
                        }
                        for (var counter = 0; counter < parsedComments.length; counter++) {
                            if (parsedComments[counter].postId == parsedPosts[index].id) {
                                var comments = {
                                    "comment": parsedComments[counter].body,
                                    "like": "Like"
                                }
                                postTitleBody.comments.push(comments)
                            }
                        }

                        newPost.postsTitleBody.push(postTitleBody);

                    }
                }
                arr.push(newPost);
            }
            localStorage.arr = JSON.stringify(arr);
        }
        else {
            arr = JSON.parse(localStorage.arr);
        }
        for (var index = 0; index < arr.length; index++) {
            for (var innerIndex = 0; innerIndex < arr[index].postsTitleBody.length; innerIndex++) {

                postDetails += `<div id = post_${index + "_" + innerIndex}><article>
                <header>
                <h1>UserName : </h1> <p>${arr[index].userName}</p>
                <h1>Title: </h1> <p>${arr[index].postsTitleBody[innerIndex].title}</p>
                <h1>Description: </h1> <p>${arr[index].postsTitleBody[innerIndex].body}</p>
                </header>
                </article><br/>
                <input type = ${"submit"} id = ${"like_" + index + "_" + innerIndex} value = ${arr[index].postsTitleBody[innerIndex].like} />
                <input type = ${"submit"} id = ${"comment_" + index + "_" + innerIndex} value = "Comments"/> 
                <input type = ${"submit"} id = ${"delete_" + index + "_" + innerIndex} value = "delete post"/></div>`
            }

        }
    }
    document.getElementById("getData").insertAdjacentHTML("afterend", postDetails);
});
var flag = false;
jQuery(document).on('click', '[id^="comment_"]', function (e) {
    var arrLike = JSON.parse(localStorage.arr);
    var values = e.target.id.split('_');
    var comments = "";
    comments += `<div id = comments_${values[1]}_${values[2]}><br/>`;
    comments += `<input type= ${"text"} id = newComment_${values[1]}_${values[2]} /> <input type = submit id = addComment_${values[1]}_${values[2]} value = AddComment>`;
    for (var index = 0; index < arrLike[values[1]].postsTitleBody[values[2]].comments.length; index++) {
        comments += `<div id=comment_${values[1]}_${values[2]}_${index}>
     <p>${index}. ${arrLike[values[1]].postsTitleBody[values[2]].comments[index].comment}</p><input type = ${"submit"} 
     id= commentLike_${values[1]}_${values[2]}_${index} value = ${arrLike[values[1]].postsTitleBody[values[2]].comments[index].like} ></input>
     <input type= ${"submit"} id = deleteComment_${values[1]}_${values[2]}_${index} value=${"Delete Comment"}>
     </div><br/>`;
    }
    comments += `</div>`;
    if (!flag) {
        flag = true;
        document.getElementById(`post_${values[1] + "_" + values[2]}`).insertAdjacentHTML("afterend", comments);
    }
    else {
        flag = false;
        if(document.getElementById(`comments_${values[1]}_${values[2]}`)){
            document.getElementById(`comments_${values[1]}_${values[2]}`).remove();
        }
        else{
            flag = true;
        }
        
    }
});
jQuery(document).on('click', '[id^="delete_"]', function (e) {
    var arrLike = JSON.parse(localStorage.arr);
    var innerId = e.target.id.split('_');
    console.log(arrLike[innerId[1]].postsTitleBody.splice(innerId[2], 1));
    document.getElementById(e.target.id.replace("delete", "post")).remove();
    if (document.getElementById(e.target.id.replace("delete", "comments"))) {
        document.getElementById(e.target.id.replace("delete", "comments")).remove();
    }

    localStorage.arr = JSON.stringify(arrLike);

});
jQuery(document).on('click', '[id^="like_"]', function (e) {
    var arrLike = JSON.parse(localStorage.arr);
    var innerId = e.target.id.split('_');
    document.getElementById(e.target.id).value = "Liked";
    arrLike[innerId[1]].postsTitleBody[innerId[2]].like = "Liked";
    console.log(arrLike[innerId[1]].postsTitleBody[innerId[2]].like);
    localStorage.arr = JSON.stringify(arrLike);
});

jQuery(document).on('click', '[id^="addComment_"]', function (e) {
    var arrLike = JSON.parse(localStorage.arr);
    var innerId = e.target.id.split('_');
    var commentData = document.getElementById(e.target.id.replace('addComment', 'newComment')).value;
    document.getElementById(e.target.id.replace('addComment', 'newComment')).value = "";
    var commentAndLike = {
        "comment": commentData,
        "like": "Like"
    };

    arrLike[innerId[1]].postsTitleBody[innerId[2]].comments.push(commentAndLike);
    localStorage.arr = JSON.stringify(arrLike);
});


// jQuery(document).on('click','',function(){

// });

// jQuery(document).on('click','',function(){

// });

jQuery(document).on('click', '[id^="commentLike_"]', function (e) {
    var arrLike = JSON.parse(localStorage.arr);
    var innerId = e.target.id.split('_');
    arrLike[innerId[1]].postsTitleBody[innerId[2]].comments[innerId[3]].like = "Liked";
    document.getElementById(e.target.id).value = "Liked"
    console.log(arrLike[innerId[1]].postsTitleBody[innerId[2]].comments[innerId[3]].like);
    localStorage.arr = JSON.stringify(arrLike);
    var arrLike = JSON.parse(localStorage.arr);
    console.log(arrLike[innerId[1]].postsTitleBody[innerId[2]].comments[innerId[3]].like);


});

jQuery(document).on('click', '[id^="deleteComment_"]', function (e) {
    var arrLike = JSON.parse(localStorage.arr);
    var innerId = e.target.id.split('_');
    //console.log("comment_"+innerId[1]+"_"+innerId[2]+"_"+innerId[3]);
    document.getElementById("comment_" + innerId[1] + "_" + innerId[2] + "_" + innerId[3]).remove();
    //console.log(arrLike[innerId[1]].postsTitleBody[innerId[2]].comments[innerId[3]].comment);
    console.log(arrLike[innerId[1]].postsTitleBody[innerId[2]].comments.splice(innerId[3], 1));
    //localStorage.arr = JSON.stringify(arrLike);
    // delete arrLike[innerId[1]].postsTitleBody[innerId[2]].comments[innerId[3]].comment;
    // delete arrLike[innerId[1]].postsTitleBody[innerId[2]].comments[innerId[3]].like;

    localStorage.arr = JSON.stringify(arrLike);
});

function getPosts() {
    var posts = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/posts", success: function (data) {
                return data;
            }
        }));
    });
    return posts;
}

function getComments() {
    var comments = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/comments", success: function (data) {
                return data;
            }
        }));
    });
    return comments;
}

function getUsers() {
    var users;
    var users = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/users", success: function (data) {
                return data;
            }
        }));
    });
    return users;
}