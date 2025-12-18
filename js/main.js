var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var email = document.getElementById("email");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var searchInput = document.getElementById("searchInput");
var favBox = document.getElementById("favBox");
var emerBox = document.getElementById("emerBox");
var favorite = document.getElementById("favorite");
var emergency = document.getElementById("emergency");
var btnImageUpload = document.getElementById("btnImageUpload");
var imageUpload = document.getElementById("imageUpload");
var imagePreview = document.getElementById("imagePreview");
var contactRow = document.getElementById("contactRow");
var emptyCont = document.getElementById("emptyCont");
var favoritesNum = document.getElementById("favoritesNum");
var emergencyNum = document.getElementById("emergencyNum");

// buttons
var btnSave = document.getElementById("btnSave");
var btnUpdate = document.getElementById("btnUpdate");

// status number
var totalNum = document.getElementById("totalNum");

// local storage
var contactList = [];
if (localStorage.getItem("contactStorage")) {
  contactList = JSON.parse(localStorage.getItem("contactStorage"));
  display();
  updateTotal();
  updateStats();
}

// image upload
var currentImage = "";
btnImageUpload.addEventListener("click", function () {
  imageUpload.click();
});
imageUpload.addEventListener("change", function () {
  var file = imageUpload.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    var imgSrc = e.target.result;
    currentImage = imgSrc;
    imagePreview.innerHTML = `
      <img 
        src="${imgSrc}" 
        class="rounded-circle object-fit-cover shadow-sm w-100 h-100"
        alt="Profile Image"
      >
    `;
  };

  reader.readAsDataURL(file);
});

// add contatct function
function addContact() {
  if (validation(fullName) && validation(phoneNumber)) {
    var contactObj = {
      cId: Date.now(),
      cImage: currentImage,
      cName: fullName.value,
      cPhone: phoneNumber.value,
      cAddress: address.value,
      cEmail: email.value,
      cgroup: group.value,
      cnotes: notes.value,

      isFavorite: favorite.checked,
      isEmergency: emergency.checked,
    };
    // add contact to list
    contactList.push(contactObj);

    // set in localstorage
    localStorage.setItem("contactStorage", JSON.stringify(contactList));

    //display
    display();

    //clear
    clear();
  }
}

// clear fumction
function clear() {
  currentImage = "";
  fullName.value = "";
  phoneNumber.value = "";
  email.value = "";
  group.value = "";
  notes.value = "";
  favorite.checked = false;
  emergency.checked = false;
}

//diplay function
function display(list = contactList) {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    box += `
    
<div class="col-md-6">
    <div class="contact-card bg-white rounded-4 shadow overflow-hidden h-100 d-flex flex-column ">
        <div class="p-3">
            <div class="d-flex align-items-center gap-2 mb-3">
                <div class="position-relative flex-shrink-0">
                    <div
                        class="shadow-sm bg-primary bg-gradient text-white fw-bolder rounded-4 w-14 d-flex align-items-center justify-content-center">
                        ${
                          list[i].cImage
                            ? `<img src="${list[i].cImage}" class=" object-fit-cover w-100 h-100 rounded-4" alt="Profile Image">`
                            : list[i].cName
                                .trim()
                                .split(" ")
                                .slice(0, 2)
                                .map((w) => w[0].toUpperCase())
                                .join("")
                        }
                    </div>

                    ${
                      list[i].isEmergency
                        ? `
                      <div
                        class="position-absolute status-badge emergency bg-danger rounded-circle border border-2 border-white d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-heart-pulse text-white"></i>
                    </div>
                      `
                        : ""
                    }
                    

                    ${
                      list[i].isFavorite
                        ? `
                      <div
                        class="position-absolute status-badge favorite bg-warning rounded-circle border border-2 border-white d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-star text-white"></i>
                    </div>
                      `
                        : ""
                    }
                    

                </div>

                <div>
                    <h3 class="fs-6 fw-bold m-0">${list[i].cName}</h3>
                    <div class="d-flex align-items-center  gap-2 small">
                        <div class="d-flex align-items-center justify-content-center rounded-3 shadow bg-primary-subtle bg-opacity-10 "
                            style="width: 25px;height: 25px;">
                            <i class="fa-solid fa-phone text-primary small"></i>
                        </div>
                        <span class="text-muted">${list[i].cPhone}</span>
                    </div>
                </div>
            </div>

            ${
              list[i].cEmail
                ? `
            <div class="d-flex align-items-center gap-2 my-3">
                <div
                    class="d-flex align-items-center justify-content-center flex-shrink-0 rounded w-7 bg-primary bg-opacity-10">
                    <i class="fa-solid fa-envelope text-info-emphasis" style="font-size:10px;"></i>
                </div>
                <span class="text-secondary small">
                    ${list[i].cEmail}
                </span>
            </div>
                `
                : ""
            }
            ${
              list[i].cAddress
                ? `
            <div class="d-flex align-items-center gap-2 mb-3">
                <div
                    class="d-flex align-items-center justify-content-center flex-shrink-0 rounded bg-success-subtle bg-opacity-10 w-7">
                    <i class="fa-solid fa-location-dot text-success " style="font-size:10px;"></i>
                </div>

                <span class="text-secondary small">
                    ${list[i].cAddress}
                </span>
            </div>
                `
                : ""
            }
            

            <div class="d-flex align-items-center gap-2">
            ${
              list[i].cgroup
                ? `
                <div class="badge bg-primary bg-opacity-10 text-primary">
                    ${list[i].cgroup}
                </div>
                `
                : ""
            }

            ${
              list[i].isEmergency
                ? `
                <div class="badge bg-danger bg-opacity-10 text-danger">
                    <i class="fa-solid fa-heart-pulse "></i>
                    Emergency
                </div>
                `
                : ""
            }
                
            </div>
        </div>

        <div
            class="d-flex align-items-center justify-content-between mt-auto px-4 py-2 border-top   bg-body-tertiary contact-btns">
            <div class="d-flex align-items-center gap-1">
                <button class="btn border-0 phoneBtn bg-success bg-opacity-10">
                    <i class="fa-solid fa-phone small text-success"></i>
                </button>

                <button class="btn border-0 envelopeBtn bg-primary bg-opacity-10">
                    <i class="fa-solid fa-envelope small text-info-emphasis"></i>
                </button>
            </div>

            <div class="d-flex align-items-center gap-1">
                <button class="btn border-0 starBtn" onclick="toggleFavorite(${i})">
                ${
                  list[i].isFavorite
                    ? `<i class="fa-solid fa-star small text-warning"></i>`
                    : `<i class="fa-regular fa-star small"></i>`
                }
                    
                </button>

                <button class="btn border-0 heartBtn" onclick="toggleEmergency(${i})">
                ${
                  list[i].isEmergency
                    ? `<i class="fa-solid fa-heart-pulse small text-danger"></i>`
                    : ` <i class="fa-regular fa-heart small"></i>`
                }
                    
                </button>

                <button class="btn border-0 penBtn"  onclick="editData(${i})"data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-pen small"></i>
                </button>

                <button class="btn border-0 trashBtn" onclick="deleteContact(${i})">
                    <i class="fa-solid fa-trash small"></i>
                </button>
            </div>
        </div>
     </div>
</div>
    `;
  }
  contactRow.innerHTML = box;

  if (list.length > 0) {
    emptyCont.classList.replace("d-block", "d-none");
  } else {
    emptyCont.classList.replace("d-none", "d-block");
  }
}

// delete function
function deleteContact(index) {
  contactList.splice(index, 1);

  localStorage.setItem("contactStorage", JSON.stringify(contactList));

  //update total number after delete
  updateTotal();
  //
  updateStats();
  display();
}

//update total number
function updateTotal() {
  totalNum.innerHTML = contactList.length;
}

// enents
btnSave.addEventListener("click", function () {
  addContact();
  updateStats();
  updateTotal();
});

// edit data function
var currentIndex = 0;
function editData(index) {
  currentIndex = index;
  fullName.value = contactList[index].cName;
  phoneNumber.value = contactList[index].cPhone;
  email.value = contactList[index].cEmail;
  group.value = contactList[index].cgroup;
  notes.value = contactList[index].cnotes;
  favorite.checked = contactList[index].isFavorite;
  emergency.checked = contactList[index].isEmergency;

  btnSave.classList.replace("d-flex", "d-none");
  btnUpdate.classList.replace("d-none", "d-flex");
}

// update data function
function updateData() {
  var contactObj = {
    cId: contactList[currentIndex].cId,
    cImage: currentImage,
    cName: fullName.value,
    cPhone: phoneNumber.value,
    cAddress: address.value,
    cEmail: email.value,
    cgroup: group.value,
    cnotes: notes.value,
    isFavorite: favorite.checked,
    isEmergency: emergency.checked,
  };

  contactList.splice(currentIndex, 1, contactObj);

  localStorage.setItem("contactStorage", JSON.stringify(contactList));

  display();
  updateStats();
  updateTotal();
  clear();

  btnSave.classList.replace("d-none", "d-flex");
  btnUpdate.classList.replace("d-flex", "d-none");
}

// validation
var regex = {
  fullName: /^[A-Za-z\s]{2,50}$/,
  phoneNumber: /^(010|011|012|015)[0-9]{8}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

function validation(input) {
  if (regex[input.id].test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

// validation during typing in input
var inputs = [fullName, phoneNumber, email];
inputs.forEach((input) => {
  input.addEventListener("input", () => validation(input));
});

//search function
function searchFun() {
  var searchedArr = [];
  var term = searchInput.value.trim().toLowerCase();
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].cName.toLowerCase().includes(term)) {
      searchedArr.push(contactList[i]);
    }
  }
  display(searchedArr);
}

// event for search input
searchInput.addEventListener("input", searchFun);

// favorite and emergency
function updateStats() {
  var favCount = 0;
  var emerCount = 0;

  var favContainer = "";
  var emerContainer = "";

  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].isFavorite) {
      favCount++;
      favContainer += `
        <div class="col-sm-6 col-lg-12 mb-3">
        <div class="d-flex align-items-center justify-content-between gap-2 p-2 bg-white rounded-3 shadow-sm">
          <div class="d-flex align-items-center gap-2 p-2 bg-white">
            <div class="bg-primary bg-gradient text-white rounded-3 w-10 h-10 d-flex align-items-center justify-content-center fw-bold">
              ${contactList[i].cName
                .trim()
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0].toUpperCase())
                .join("")}
            </div>
            <div>
              <h6 class="mb-0 fw-medium">${contactList[i].cName}</h6>
              <p class="mb-0 text-muted small">${contactList[i].cPhone}</p>
            </div>
          </div>
          <div class="flex-shrink-0 d-flex align-items-center justify-content-center rounded bg-success bg-opacity-10 w-7">
          <i class="fas fa-phone text-success small"></i>
          </div>
          </div>
        </div>
      `;
    }
    if (contactList[i].isEmergency) {
      emerCount++;
      emerContainer += `
        <div class="col-sm-6 col-lg-12 mb-3">
        <div class="d-flex align-items-center justify-content-between gap-2 p-2 bg-white rounded-3 shadow-sm">
          <div class="d-flex align-items-center gap-2 p-2 bg-white ">
            <div class="bg-danger bg-gradient text-white rounded-3 w-10 h-10 d-flex align-items-center justify-content-center fw-bold">
              ${contactList[i].cName
                .trim()
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0].toUpperCase())
                .join("")}
            </div>
            <div>
              <h6 class="mb-0 fw-medium">${contactList[i].cName}</h6>
              <p class="mb-0 text-muted small">${contactList[i].cPhone}</p>
            </div>
          </div>
          <div class="flex-shrink-0 d-flex align-items-center justify-content-center rounded bg-success bg-opacity-10 w-7">
          <i class="fas fa-phone text-success small"></i>
          </div>
          </div>
        </div>
      `;
    }
  }

  favoritesNum.innerHTML = favCount;
  emergencyNum.innerHTML = emerCount;

  favBox.innerHTML =
    favContainer ||
    `<p class="text-center fw-semibold text-muted p-5">No favorites yet</p>`;
  emerBox.innerHTML =
    emerContainer ||
    `<p class="text-center fw-semibold text-muted p-5">No emergency contacts</p>`;
}
updateStats();

function toggleFavorite(index) {
  contactList[index].isFavorite = !contactList[index].isFavorite;
  localStorage.setItem("contactStorage", JSON.stringify(contactList));
  display();
  updateStats();
}
function toggleEmergency(index) {
  contactList[index].isEmergency = !contactList[index].isEmergency;
  localStorage.setItem("contactStorage", JSON.stringify(contactList));
  display();
  updateStats();
}
