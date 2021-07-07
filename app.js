// const commentButton = document.querySelector('.comment-button');
let dataArray;

let apiUrl = "https://jsonplaceholder.typicode.com/posts";
let commentUrl = "https://jsonplaceholder.typicode.com/comments";
let userUrl = "https://jsonplaceholder.typicode.com/users"

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  fetchApi(apiUrl);
});

function fetchApi(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((jsonArr) => {
      dataArray = jsonArr;
    //  console.log(jsonArr);

      const markup = jsonArr.map((element) => {
        return `
      <div class="post">
            <h3 class="post-title">${element.title}</h3>
            <div class="post-body">${element.body}</div>
            <button class="comment-button" data-postid="${element.id}">Read comments</button>
            <button class="author-button" data-userid="${element.userId}">Author info</button>
            <ul class="comments"></ul>
        </div>
        `;
      });

      document.querySelector(".posts").innerHTML = markup;
    });
}

document.body.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.className === "comment-button"){

  loadComment(commentUrl, dataArray)

  }
});

function loadComment(url, arr) {
  fetch(url)
    .then((response) => response.json())
    .then((commentArr) => {
     // let filteredArray = arr.filter(value => jsonArr.includes(value));
     //let result = arr.filter((o1) => !jsonArr.some((o2) => o1.id === o2.id));

   for (let index = 0; index < commentArr.length; index++) {
     let element = commentArr[index];
     // if (element)console.log(element)
    
      console.log(arr)

        arr.forEach(elem => {
      
          if (elem.id === element.postId) {
           console.log(elem.postId + " and " + element.postId)
           
          
           
         const commentMarkup = commentArr.map((elem) => {
           return `
           <ul class="comments">
           <li class="comment">
             <div>${commentArr.email}</div>
             <div>${commentArr.body}</div>
           </li>
         </ul>
        
           `;
         });
         //console.log(commentMarkup);
         
         document.querySelector(".comments").innerHTML=  commentMarkup;
          }
        })
        
      

     
   }
    });
}


/*
  
  
   <ul class="comments">
              <li class="comment">
                <div>Eliseo@gardner.biz</div>
                <div>laudantium enim quasi est</div>
              </li>
            </ul>

*/
