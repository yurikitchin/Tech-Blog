// ======================== Show and hide new post modal ==================
const postBtn = document.querySelector('.postBtn')
const newPost = document.querySelector('.newPostModal')
const closePost = document.querySelector('.closeBtn')

function showPost() {
    newPost.classList.add('display')
}

function hidePost() {
    newPost.classList.remove('display')
}

postBtn.addEventListener('click', showPost)
closePost.addEventListener('click', hidePost)

// ======================= submit new post ========================