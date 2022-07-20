const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ratingDisplay = document.querySelector("#rating-display");
const commentDisplay = document.querySelector("#comment-display");
const newRamenForm = document.querySelector("#new-ramen");
const editRamenForm = document.querySelector("#edit-ramen");
const deleteBtn = document.querySelector("#delete-ramen");

const URL = "http://localhost:3000/ramens";

// When the page loads, request the data from the server to get all the ramen objects.
fetch(URL)
  .then((res) => res.json())
  .then((data) => addRamenArrayToMenu(data));

// See all ramen images in the div with the id of ramen-menu.
function addRamenArrayToMenu(ramenArray) {
  // For every ramen obj in the array,
  //  Add a new ramen img to menu
  ramenArray.forEach((ramen) => addRamenToMenu(ramen));
  displayCentralRamen(ramenArray[0]);
}

// {
// "id": 1,
// "name": "Shoyu Ramen",
// "restaurant": "Nonono",
// "image": "./assets/ramen/shoyu.jpg",
// "rating": 7,
// "comment": "Delish. Can't go wrong with a classic!"
// },
// Add a single ramen object as an image to ramen-menu
function addRamenToMenu(ramenObj) {
  //  make a new img node
  const imgNode = document.createElement("img");
  imgNode.src = ramenObj.image;

  imgNode.dataset.id = ramenObj.id;
  //  append it to ramen-menu
  ramenMenu.appendChild(imgNode);

  // add event listener
  // when clicked, it should display relevant data in the center
  imgNode.addEventListener("click", (event) =>
    displayCentralRamenId(imgNode.dataset.id)
  );
}

// Alternatively, event delegation
// ramenMenu.addEventListener("click", event => {
//   if (event.target.tag == "img") {
//     displayCentralRamenId(event.target.dataset.id)
//   }
// })

// With just an id, get the rest of the information you need from the source of truth
function displayCentralRamenId(id) {
  fetch(`${URL}/${id}`)
    .then((res) => res.json())
    .then((data) => displayCentralRamen(data));
}

// see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.
function displayCentralRamen(ramenObj) {
  ramenDetail.dataset.id = ramenObj.id;
  ramenDetail.querySelector(".detail-image").src = ramenObj.image;
  ramenDetail.querySelector(".name").textContent = ramenObj.name;
  ramenDetail.querySelector(".restaurant").textContent = ramenObj.restaurant;
  ratingDisplay.textContent = ramenObj.rating;
  commentDisplay.textContent = ramenObj.comment;
}

// Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.
// target the new-ramen form
// add an eventlistener when it submits
newRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // add a new ramen with info to ramen-menu
  const name = event.target.name.value;
  const restaurant = event.target.restaurant.value;
  const image = event.target.image.value;
  const rating = event.target.rating.value;
  const comment = event.target["new-comment"].value;

  const newRamenData = {
    name,
    restaurant,
    image,
    rating,
    comment,
  };

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamenData),
  })
    .then((res) => res.json())
    .then((data) => addRamenToMenu(data)); // append this to the ramen-menu
});

editRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = ramenDetail.dataset.id;
  const rating = event.target.rating.value;
  const comment = event.target["new-comment"].value;

  const updatedRamenData = {
    rating,
    comment,
  };

  fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRamenData),
  })
    .then((res) => res.json())
    .then((data) => displayCentralRamen(data));
});

// Delete a ramen (you can add a "delete" button if you'd like, or use an existing element to handle the delete action). The ramen should be removed from the ramen-menu div, and should not be displayed in the ramen-detail div.
deleteBtn.addEventListener("click", () => {
  const id = ramenDetail.dataset.id;
  fetch(`${URL}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      window.alert("Ramen deleted!");
      const ramenToBeDeleted = Array.from(
        ramenMenu.querySelectorAll("img")
      ).filter((el) => el.dataset.id == id);
      ramenToBeDeleted[0].remove();

      // display next available ramen image
      displayCentralRamenId(ramenMenu.querySelectorAll("img")[0].dataset.id);
    });
});
