//Logica de Login
const btnLogin = document.getElementById('btnLogin')
const formLogin = document.getElementById('login')

btnLogin.onclick= async (e)=>{
    e.preventDefault()
    const userData = {
        username: formLogin.username.value,
        password: formLogin.password.value
    }
    console.log(userData)
    const resultado = await fetch('login',{
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(userData)
    })
}
