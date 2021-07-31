// ======================== Show and hide new post modal ==================
const postBtn = document.querySelector(".postBtn");
const newPost = document.querySelector(".newPostModal");
const closePost = document.querySelector("#closePost");

function showPost() {
  newPost.classList.add("display");
}

function hidePost() {
  newPost.classList.remove("display");
}

postBtn.addEventListener("click", showPost);
closePost.addEventListener("click", hidePost);

// ======================= submit new post ========================
const submitPost = document.querySelector("#post-submit");

const addPost = async (event) => {
  event.preventDefault();

  let title = document.querySelector("#postTitle").value.trim();
  let blog = document.querySelector("#postContent").value.trim();

  if (title && blog) {
    try {
      const response = await fetch("/newpost", {
        method: "POST",
        body: JSON.stringify({ title, blog }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("response ok");
        document.location.replace(`/dashboard`);
      } else {
        alert("failed to add Post");
      }
    } catch (err) {
      console.error(err.message);
    }
  }
};

submitPost.addEventListener("click", addPost);

//==========================show/hide update modal =======================
const updateBtn = document.querySelectorAll(".updateBtn");
const updateModal = document.querySelectorAll(".updateModal");
const closeUpdate = document.querySelectorAll(".closeUpdate");
console.log("this is closeUpdate", closeUpdate)
function showUpdate(buttonID) {
  let modal = document.querySelector(`#modal${buttonID}`)
  modal.classList.add('display')
}


function hideUpdate() {
  let modal = document.querySelector('.display')
  console.log(modal)
  modal.classList.remove("display");
}

updateBtn.forEach(button => {
  let buttonID = button.getAttribute('id')
  button.addEventListener('click', function(){
    showUpdate(buttonID)
  })
})

closeUpdate.forEach(button => {
  button.addEventListener('click', hideUpdate)
})


// ========================= update post ===========================
submitUpdate = document.querySelectorAll(".update-submit");

const updatePost = async (event) => {
  event.preventDefault();
  let title = document.querySelector(".updateTitle").value.trim();
  let blog = document.querySelector(".updateContent").value.trim();
  let id = document.querySelector(".updateTitle").getAttribute('id')
  console.log(title, blog, id)
  if (title && blog && id) {
    
    try {
      const response = await fetch("/updatepost", {
        method: "PUT",
        body: JSON.stringify({ title, blog, id }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("the post has been edited", title);
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
          alert("failed to update Post");
        }
    } catch (err) {
      console.error(err.message);
    }
  }
};

submitUpdate.forEach((button) => {
  button.addEventListener("click", updatePost);
});
