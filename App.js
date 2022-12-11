let container = document.getElementById("container");
const create = document.getElementById("create");
const confirm = document.getElementById("yes");
const cancel = document.getElementById("no");
const form = document.getElementById("form");
const form_title = document.getElementById("form-title");
const form_body = document.getElementById("form-body");
const error = document.getElementById("error");
const plus = document.getElementById("plus");
const notification = document.getElementById("notification");

/*
Getting the response using Ajax
*/

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const Posts = JSON.parse(xhr.responseText);
    Posts.map((todo, index) => {
      return (container.innerHTML += `<div class="card"><p class="card-title">${
        Posts[index].title.length > 35
          ? Posts[index].title.slice(0, 27) + "..."
          : Posts[index].title
      }</p>
        <p class="text">completed : ${
          Posts[index].body.length > 120
            ? Posts[index].body.slice(0, 110) + "..."
            : Posts[index].body
        } </p>
        </div>`);
    });
  }
};
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
xhr.send();

// event listeners
let postTitle = "";
let postBody = "";
form_title.addEventListener("input", (e) => {
  postTitle = e.target.value;
  newPost.title = postTitle;
});
form_body.addEventListener("input", (e) => {
  postBody = e.target.value;
  newPost.body = postBody;
});
const newPost = {
  title: postTitle,
  body: postBody,
};
create.addEventListener("click", () => {
  form.style.display = "flex";
  error.style.display = "none";
  window.scrollTo(0, document.body.scrollHeight);
});
confirm.addEventListener("click", () => {
  if (postTitle === "" && postBody === "") {
    form.style.display = "none";
    error.style.display = "block";
  } else {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        container.innerHTML += `<div class="card"><p class="card-title">${data.title}</p>
                 <p class="text">${data.body}</p>
                 </div>`;
      });
    form.style.display = "none";

    setTimeout(() => (notification.style.right = "0"), 1000);
    setTimeout(() => (notification.style.right = "-400px"), 3000);
    plus.style.transform = "rotate(0deg)";
  }
});
cancel.addEventListener("click", () => {
  form.style.display = "none";
});
