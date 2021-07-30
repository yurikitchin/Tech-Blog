const commentModal = document.querySelector(".commentModal");
const submitComment = document.querySelector("comment-submit");
const addCommentBt = document.querySelector(".commentBtn");
const closeComment = document.querySelector(".closeBtn");

function showModal() {
  commentModal.classList.add("display");
}

function hideModal() {
  commentModal.classList.remove("display");
}

addCommentBt.addEventListener("click", showModal);
closeComment.addEventListener("click", hideModal);

//==================== add comment ===========================//
const commentAdd = document.querySelector("#comment-submit");

const addComment = async (event ) => {
    event.preventDefault()

    debugger
  let post_id = document.querySelector(".postTitle").getAttribute('id');
  let Comment = document.querySelector("#commentContent").value.trim();

  console.log(post_id)
  console.log(Comment)
  if (post_id && Comment) {
    try {
    const response = await fetch("/comment", {
      method: 'POST',
      body: JSON.stringify({ post_id, Comment }),
      headers: {'Content-Type': 'application/json'},
    });
  } catch(err) {
    console.log(err)
  } 
    if (response.ok) {
      //document.location.replace(`/post/${post_id}`);
      console.log('response ok')
    } else {
      alert("failed to add comment");
    }
  }
};

commentAdd.addEventListener('click', addComment)