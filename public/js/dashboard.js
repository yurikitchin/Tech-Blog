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

function showUpdate(buttonID) {
  let modal = document.querySelector(`#modal${buttonID}`)
  modal.classList.add('display')
}


function hideUpdate() {
  let modal = document.querySelector('.display')
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
const submitUpdate = document.querySelectorAll(".update-submit");

async function updatePost(buttonID) {
  console.log("buttonid", buttonID)
  let title = document.querySelector(`.updateTitle${buttonID}`).value.trim();
  let blog = document.querySelector(`.updateContent${buttonID}`).value.trim();
  let id = buttonID
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
  let buttonID = button.getAttribute('id')
  button.addEventListener("click", function(){
    updatePost(buttonID)});
});


// ======================== delete post ================================
const deleteBtns = document.querySelectorAll('.deleteBtn')

console.log("this is deletedBtns", deleteBtns)

async function deletePost(buttonID) {
  let selectedPost = document.querySelector(`post${buttonID}`)
}


//delete buttons need a for each to add eventlistener to each one