const commentModal = document.querySelector('.commentModal')
const submitComment = document.querySelector('comment-submit')
const addCommentBt = document.querySelector('.commentBtn')
const closeComment = document.querySelector('.closeBtn')

function showModal() {
    commentModal.classList.add('display')    
}

function hideModal() {
    commentModal.classList.remove('display')
}

addCommentBt.addEventListener('click', showModal)
closeComment.addEventListener('click', hideModal)

//==================== add comment ===========================//
