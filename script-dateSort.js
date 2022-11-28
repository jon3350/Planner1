//session timeout
let time;

if(localStorage.getItem('logedin') != 'true') {
    window.open('index.html', '_self');
}

window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onkeypress = resetTimer;

function resetTimer() {
    window.clearTimeout(time);
    time = window.setTimeout(logout, 600000);
}

function logout() {
    localStorage.setItem('logedin', 'false');
    window.open('index.html', '_self');
}

//other stuff

//store data
// localStorage.setItem('numOfEvents', '3');
// for(let i=0; i<localStorage.getItem('numOfEvents'); i++) {
//     localStorage.setItem('name'+i, "Name...");
//     localStorage.setItem('description'+i, "Description...");
//     localStorage.setItem('date'+i, i);
// }

//factory function
function createEvent(name, description, date) {
    return {
        name,
        description,
        date
    }
}

//extract data into arr
const eventArr = [];
for(let i=0; i<localStorage.getItem('numOfEvents'); i++) {
    eventArr.push(createEvent(localStorage.getItem('name'+i),
    localStorage.getItem('description'+i), 
    localStorage.getItem('date'+i)));
}

eventArr.sort( (a,b) => {
    console.log(a.date.replaceAll('-',''));
    return  a.date.replaceAll('-','') -  b.date.replaceAll('-','')
});
console.log(eventArr);

//display
const flexContainer = document.querySelector('.flex-container');
const formContainer = document.querySelector('.form-container');
eventArr.forEach(x => {
    const div = document.createElement('div');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const btn = document.createElement('button');
    const span3 = document.createElement('span');
    span1.innerText = x.name;
    span2.innerText = x.date;
    btn.innerText = 'Delete';
    span3.innerText = "^ " + x.description + " ^";
    btn.addEventListener('click', e => {
        eventArr.splice(eventArr.indexOf(x), 1);
        console.log(eventArr);
    
        localStorage.setItem('numOfEvents', eventArr.length);
    
        for(let i=0; i<eventArr.length; i++) {
            localStorage.setItem('name'+i, eventArr[i].name);
            localStorage.setItem('description'+i, eventArr[i].description);
            localStorage.setItem('date'+i, eventArr[i].date);
        }
    
        location.reload();
    })
    span1.classList.add('name');
    span2.classList.add('date');
    btn.classList.add('delete');
    span3.classList.add('description');
    div.append(span1, span2, btn, span3);
    div.classList.add("flex-item", "event");
    flexContainer.insertBefore(div, formContainer);
})

//add Event
const addEvent = document.querySelector('#add-event');
const eventName = document.querySelector('#event-name');
const eventDate = document.querySelector('#event-date');
const eventDescription = document.querySelector('#event-description');
addEvent.addEventListener('click', e => {
    eventArr.push(createEvent(eventName.value, eventDescription.value, eventDate.value));
    console.log(eventArr);

    localStorage.setItem('numOfEvents', eventArr.length);

    for(let i=0; i<eventArr.length; i++) {
        localStorage.setItem('name'+i, eventArr[i].name);
        localStorage.setItem('description'+i, eventArr[i].description);
        localStorage.setItem('date'+i, eventArr[i].date);
    }

    location.reload();

})