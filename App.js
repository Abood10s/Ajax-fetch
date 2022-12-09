let container = document.getElementById("container");
const create = document.getElementById("create");
const confirm = document.getElementById("yes");
const cancel = document.getElementById("no");
const form = document.getElementById("form");
const form_title = document.getElementById("form-title");
const form_body = document.getElementById("form-body");
const error = document.getElementById("error");

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
let theTitle = "";
let theComplete = "";
form_title.addEventListener("input", (e) => {
  theTitle = e.target.value;
  mydata.title = theTitle;
});
form_body.addEventListener("input", (e) => {
  theComplete = e.target.value;
  mydata.body = theComplete;
});
const mydata = {
  title: theTitle,
  body: theComplete,
};

create.addEventListener("click", () => {
  error.style.display = "none";

  form.style.display = "flex";

  window.scrollTo(0, document.body.scrollHeight);
});
confirm.addEventListener("click", () => {
  if (theTitle === "" && theComplete === "") {
    form.style.display = "none";
    error.style.display = "block";
  } else {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mydata),
    })
      .then((response) => response.json())
      .then((data) => {
        container.innerHTML += `<div class="card"><p class="card-title">${data.title}</p>
                 <p class="text">${data.body}</p>
                 </div>`;
      });

    form.style.display = "none";
  }
});
cancel.addEventListener("click", () => {
  form.style.display = "none";
});
