var postDescription = "";
var postDetails = "";
var arr = [];
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

        for (var outerIndex = 0; outerIndex < parsedUsers.length; outerIndex++) {
            var newPost = {
                "id": parsedUsers[outerIndex].id,
                "userName": parsedUsers[outerIndex].username,
                "postsTitleBody": []
            }
            // console.log(parsedUsers[outerIndex].id);
            // console.log(parsedUsers[outerIndex].username);
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
                                "comment": parsedComments[counter].body
                            }
                            //newPost.comments.push(comment);
                            postTitleBody.comments.push(comments)
                        }
                    }

                    newPost.postsTitleBody.push(postTitleBody);

                }
            }
            arr.push(newPost);
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
        // console.log(JSON.stringify(arr));
    }
    document.getElementById("getData").insertAdjacentHTML("afterend", postDetails);
});
var flag = false;
jQuery(document).on('click', '[id^="comment_"]', function (e) {

    var values = e.target.id.split('_');
    console.log(values[1] + "" + values[2]);
    console.log(arr[values[1]].postsTitleBody[values[2]].comments);
    var comments = "";
    comments += `<div id = comments_${values[1]}_${values[2]}>`;
    for (var index = 0; index < arr[values[1]].postsTitleBody[values[2]].comments.length; index++) {
        comments += `<div id=comment_${values[1]}_${values[2]}_${index}>
     <p>${index}. ${arr[values[1]].postsTitleBody[values[2]].comments[index].comment}</p><input type = ${"submit"} value = ${"Like"} ></input>
     </div><br/>`;
    }
    comments += `</div>`;
    if (!flag) {
        flag = true;
        document.getElementById(`post_${values[1] + "_" + values[2]}`).insertAdjacentHTML("afterend", comments);
    }
    else {
        flag = false;
        document.getElementById(`comments_${values[1]}_${values[2]}`).remove();
    }
});
jQuery(document).on('click', '[id^="delete_"]', function (e) {
    console.log();
    console.log(e.target.id.replace("delete", "post"));
    document.getElementById(e.target.id.replace("delete", "post")).remove();

});
jQuery(document).on('click', '[id^="like_"]', function (e) {
    document.getElementById(e.target.id).value = "You liked this post";
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