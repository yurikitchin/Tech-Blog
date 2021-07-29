const viewPost = document.querySelectorAll('.postTitle')

viewPost.forEach((post) => {
post.addEventListener('click', openPost)
});

function openPost(event) {
    let id = event.target.id
    console.log(id)
    document.location.replace(`/post/${id}`)
}