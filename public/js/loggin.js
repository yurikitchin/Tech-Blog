const signupHandler = async (event) => {
    console.log("Click Works")
    event.preventDefault()

    const userName = document.querySelector("#signup").value.trim();
    // const password = document.querySelector("#password-signup").value;
    let password = ""
    // console.log(userName)
    // console.log(password)
    confirmPassword = () => { if (document.querySelector("#password-signup").value === document.querySelector("#confirm-password-signup").value) {
        password = (document.querySelector("#password-signup").value.trim())
        console.log(password)
    } else {
        password = ""
        alert("Your passwords do not match, please try again")
    }
}
confirmPassword()

if (userName && password) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json"}
    })
    
    if (response.ok) {
        document.location.replace("/")
        console.log(userName)
    } else {
        alert("Failed to sign up")
    }
}
}

const loginHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#userLogin').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (userName && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password}),
            headers: {'Content-Type': 'application/json'},
        })
        console.log("check out this response",response)
        if (response.ok) {
            
            console.log('user logged in......................................')
            setTimeout(function(){ 
              console.log('setTimeoutAAAAAAAAAAAAAAA')
              document.location.replace('/') }, 100);
            
          } else {
            alert('Failed to log in.');
          }
    }
  
}

const loginModal = document.querySelector(".loginModal")
const signModal = document.querySelector(".signModal");
const closeModal = document.querySelector(".closeBtn");
const loginBtn = document.querySelector("#loginBtn")
const signUP = document.querySelector(".submitBtn")
const signBtn = document.querySelector('#signBtn')
const loginSubmit = document.querySelector('#login-submit')

loginSubmit.addEventListener('click', loginHandler)
signUP.addEventListener("click", signupHandler)

loginBtn.addEventListener("click", showLogin)
closeModal.addEventListener("click", hideSignUp)
signBtn.addEventListener("click", showSignUp)
closeLogin.addEventListener('click', hideLogin)

function showLogin() {
    loginModal.classList.add("display");
    signModal.classList.remove("display")
}

function showSignUp() {
    signModal.classList.add("display")
    loginModal.classList.remove("display")
}

function hideSignUp() {
    signModal.classList.remove("display")
}

function hideLogin() {
    loginModal.classList.remove("display")
}

