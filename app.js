let postUrl = "https://jsonplaceholder.typicode.com/posts";
let commentUrl = "https://jsonplaceholder.typicode.com/comments";
let userUrl = "https://jsonplaceholder.typicode.com/users";

let dataArray = [];

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  loadData().then((data) => {
    data.forEach((value) => {
      dataArray.push(value);
    });
    // dataArray = [posts, commensts, users] from api
    uploadPosts(dataArray[0]);

    document.body.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.className === "comment-button") {
        const buttonId = event.target.getAttribute("data-postid");
        const filteredComments = dataArray[1].filter(
          (comment) => comment.postId == buttonId
        );
  
        const markup = uploadComments(filteredComments, buttonId);

       var commentUl = document.querySelector(
          "[data-postid='ul-" + buttonId + "']"
        )
        
        
   

     if (commentUl.innerHTML === "") {
      commentUl.innerHTML = markup;
       
     } else{
      commentUl.innerHTML = "";
     }

      } else if (event.target.className === "author-button") {
        const userButtonId = event.target.getAttribute("data-userid");
        const filteredUser = dataArray[2].filter(
          (user) => user.id == userButtonId
        );

        const markup = uploadUser(filteredUser);
        document.querySelector(".user-container").innerHTML = markup;
      }
    });
  });
});

const loadData = async () => {
  try {
    const results = await Promise.all([
      fetch(postUrl),
      fetch(commentUrl),
      fetch(userUrl),
    ]);
    results.forEach((result) => {
      if (!result.ok) {
        console.log(error);
      }
    });

    const dataPromises = results.map((result) => result.json());
    finalData = await Promise.all(dataPromises);
    return finalData;
  } catch (err) {
    console.log(err);
  }
};

function uploadComments(filteredComments) {
  const markup = filteredComments.map((element) => {
    return `
          <li class="comment">
          <div>${element.email}</div>
          <div>${element.body}</div>
        </li>
      
          `;
  });
  return markup;
}

function uploadUser(user) {
  console.log(user[0].company.name);

  return `         
<div class="user">
<h2>Author</h2>
<div>${user[0].name}</div>
<div>${user[0].email}</div>
<div>Phone:${user[0].phone}</div>
<br>
<div>Company: ${user[0].company.name}</div>
</div>
      `;
}

function uploadPosts(posts) {
  const markup = posts.map((element) => {
    return `
      <div class="post" id = "${element.id}">
            <h3 class="post-title">${element.title}</h3>
            <div class="post-body">${element.body}</div>
            <button class="comment-button" data-postid="${element.id}" id = "${element.id}">Read comments</button>
            <button class="author-button" data-userid="${element.userId}">Author info</button>
            <ul data-postid="ul-${element.id}"></ul>
           
        </div>
        `;
  });

  document.querySelector(".posts").innerHTML = markup;
}
