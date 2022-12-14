//Logica de Signup
const btnSignup = document.getElementById('btnSignup')
const formSignup = document.getElementById('signup')

btnSignup.onclick= async (e)=>{
    e.preventDefault()
    const userData = {
        username: formSignup.username.value,
        password: formSignup.password.value,
        name: formSignup.name.value
    }
    console.log(userData)
    try {
        await fetch('signup',{
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(userData)
        })
    } catch (error) {
        console.log(error);
    }
    const resultado = await fetch('login',{
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(userData)
    })
    if(resultado.status === 200){window.location.href = '/index.html'}
}
