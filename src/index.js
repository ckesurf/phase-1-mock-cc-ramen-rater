// write your code here
// Deliverables:

// Plain English: Display a bunch of ramen pictures at the top of the website
// See all ramen images in the div with the id of ramen-menu
// GET element by id of ramen-menu

const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const ratingDisplay = document.getElementById("rating-display")
const commentDisplay = document.getElementById("comment-display")
const submitForm = document.getElementById('new-ramen')

const ramenURL = "http://localhost:3000/ramens"

// fetch our data
fetch(ramenURL)
    .then(response => response.json())
    .then(data => renderRamenImages(data))

// add img tags under this div, append child

// input: ramenArray
function renderRamenImages(ramenArray) {
    // do this for every ramen in the array
    ramenArray.forEach(ramenElement => addRamenImage(ramenElement))
}

// actual adds the image
function addRamenImage(ramenElementParam) {
    // create an img el and add it to the DOM
    const ramenImg = document.createElement("img");
    ramenImg.src = ramenElementParam.image;

    // Whenever you click on a ramen image, it'll pop up in the middle
    // and display all the information about the ramen
    ramenImg.addEventListener('click', () => {
        // update the img
        ramenDetail.querySelector('img').src = ramenElementParam.image

        // update the name
        ramenDetail.querySelector('.name').innerText = ramenElementParam.name

        // update the restaurant
        ramenDetail.querySelector('.restaurant').innerText = ramenElementParam.restaurant

        // update the rating
        ratingDisplay.innerText = ramenElementParam.rating
        // update the comment
        commentDisplay.innerText = ramenElementParam.comment
    });


    // find container, attach our new ramen img to it
    ramenMenu.appendChild(ramenImg)
}

// When the form is filled out (like what we saw in TaskLister),
// create an eventlistener
submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // create new ramen 
    // have it show up in ramen-menu
        // append it to the top portion
    // create an actual DOM element
    const newRamen = document.createElement("img")
    // add a src
    newRamen.src = event.target['new-image'].value 
    ramenMenu.appendChild(newRamen)
    console.log('hey our submit works')
    submitForm.reset();
})


