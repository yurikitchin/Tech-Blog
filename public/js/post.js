const commentModal = document.querySelector('.commentModal')
const submitComment = document.querySelector('comment-submit')
const addCommentBt = document.querySelector('.commentBtn')
const closeModal = document.querySelector('.closeBtn')

function showModal() {
    commentModal.classList.add('display')
}

function hideModal() {
    commentModal.classList.remove('display')
}

addCommentBt.addEventListener('click', showModal)
closeModal.addEventListener('click', hideModal)