console.log('client js loaded succesfully..')

const element = document.getElementById('search_button')
const message1 = document.getElementById('paragraph-location')
const message2 = document.getElementById('paragraph-temperature')




element.addEventListener('click', (e) => {
    e.preventDefault()
    message1.textContent = 'Searching....'
    const searched_location = document.getElementById("location_name").value
    fetch(`http://localhost:3000/weather?address=${searched_location}`).then((response) => {
        console.log(response)
    response.json().then((data) => {
        message1.textContent = data.place
        message2.textContent = data.temperature
    })    
})
})