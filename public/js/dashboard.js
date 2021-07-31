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
const submitPost = document.querySelector('#post-submit')

const addPost = async (event) => {
    event.preventDefault()

    let title = document.querySelector('#postTitle').value.trim()
    let blog = document.querySelector('#postContent').value.trim()

    if (title && blog) {
        try {
            const response = await fetch('/newpost', {
                method: 'POST',
                body: JSON.stringify({ title, blog }),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                console.log('response ok')
                document.location.replace(`/dashboard`);
            }
            else {
                alert("failed to add Post")
            }

        } catch(err) {
            console.error(err.message)
        }
    } 
}

submitPost.addEventListener('click', addPost)