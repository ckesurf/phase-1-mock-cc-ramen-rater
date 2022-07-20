// write your code here
// Deliverables:

// Plain English: Display a bunch of ramen pictures at the top of the website
// See all ramen images in the div with the id of ramen-menu
// GET element by id of ramen-menu

const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");
const submitForm = document.getElementById("new-ramen");
const editForm = document.getElementById("edit-ramen");
const deleteBtn = document.getElementById("delete-ramen");

const ramenURL = "http://localhost:3000/ramens";

// fetch our data
fetch(ramenURL)
  .then((response) => response.json())
  .then((data) => renderRamenImages(data));

// add img tags under this div, append child

// input: ramenArray
function renderRamenImages(ramenArray) {
  // do this for every ramen in the array
  ramenArray.forEach((ramenElement) => addRamenImage(ramenElement));

  //// ADVANCED DELIVERABLE ////
  // COMPLETED: See the details for the first ramen as soon as the page loads (without clicking on an image)
  displayCenterRamen(ramenArray[0]);
}

// actual adds the image
function addRamenImage(ramenElementParam) {
  // create an img el and add it to the DOM
  const ramenImg = document.createElement("img");
  ramenImg.src = ramenElementParam.image;
  ramenImg.dataset.id = ramenElementParam.id;

  // Whenever you click on a ramen image, it'll pop up in the middle
  // and display all the information about the ramen
  // ramenImg.addEventListener("click", () => {
  //   displayCenterRamen(ramenElementParam);
  // });

  // find container, attach our new ramen img to it
  ramenMenu.appendChild(ramenImg);
}

function displayCenterRamen(ramenObj) {
  // update the id, for PATCH
  ramenDetail.dataset.id = ramenObj.id;
  // update the img
  ramenDetail.querySelector("img").src = ramenObj.image;
  // update the name
  ramenDetail.querySelector(".name").innerText = ramenObj.name;
  // update the restaurant
  ramenDetail.querySelector(".restaurant").innerText = ramenObj.restaurant;

  // update the rating
  ratingDisplay.innerText = ramenObj.rating;
  // update the comment
  commentDisplay.innerText = ramenObj.comment;
}

function displayCenterRamenId(id) {
  fetch(`${ramenURL}/${id}`)
    .then((res) => res.json())
    .then((ramenObj) => displayCenterRamen(ramenObj));
}

// When the form is filled out (like what we saw in TaskLister),
// create an eventlistener
submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // create new ramen
  // grab values from form inputs
  debugger;
  const name = event.target.name.value;
  const restaurant = event.target.restaurant.value;
  const image = event.target.image.value;
  const rating = event.target.rating.value;
  const comment = event.target["new-comment"].value;

  const newRamenData = { name, restaurant, image, rating, comment };

  // POST request
  fetch(ramenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamenData),
  })
    .then((res) => res.json())
    .then((data) => {
      //  add it to the ramen menu
      addRamenImage(data);
      displayCenterRamen(data);
    });

  // display the center with new ramen

  submitForm.reset();
});

// As a user, I can click on a ramen in the top menu
// and see in displayed in the center
// Event Delegation
ramenMenu.addEventListener("click", (event) => {
  if (event.target.matches("img")) {
    fetch(`${ramenURL}/${event.target.dataset.id}`)
      .then((res) => res.json())
      .then((data) => displayCenterRamen(data));
  }
});

// Update the rating and comment for a ramen by submitting a form. Changes should be reflected on the frontend. No need to persist.
editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // edit the rating and the comment
  const comment = event.target["new-comment"].value;
  const rating = event.target["rating"].value;
  const data = { comment, rating };
  const id = ramenDetail.dataset.id;
  fetch(`${ramenURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((ramenData) => displayCenterRamen(ramenData));
});

// Delete a ramen (you can add a "delete" button if you'd like, or use an existing element to handle the delete action). The ramen should be removed from the ramen-menu div, and should not be displayed in the ramen-detail div.

deleteBtn.addEventListener("click", (event) => {
  const id = ramenDetail.dataset.id;
  fetch(`${ramenURL}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      window.alert("ramen deleted successfully!");
      const ramenMenuArray = ramenMenu.querySelectorAll("img");

      const newRamenId = ramenMenuArray[1].dataset.id;
      displayCenterRamenId(newRamenId);
    });
});
