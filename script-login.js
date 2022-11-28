const submitBtn = document.querySelector('button');
submitBtn.addEventListener('click', e => {
    const userName = document.querySelector('#user-name');
    const password = document.querySelector('#password');
    if(userName.value==='Vishi' && password.value==='Fishi') {
        window.open('dateSort.html', '_self');
        localStorage.setItem('logedin', 'true');
        console.log("hi");
    } else {
        console.log('bye');
    }
})