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
        // document.location.replace("/")
        console.log(userName)
    } else {
        alert("Failed to sign up")
    }
}
}

const signModal = document.querySelector(".signModal");
const closeModal = document.querySelector(".closeBtn");
const loginBtn = document.querySelector("#loginBtn")
const signUP = document.querySelector(".submitBtn")

loginBtn.addEventListener("click", showSignUp)
closeModal.addEventListener("click", hideSignUp)
signUP.addEventListener("click", signupHandler)

function showSignUp() {
    signModal.classList.add("display")
}

function hideSignUp() {
    signModal.classList.remove("display")
}