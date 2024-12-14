"use strict";
let siteNameInput = document.querySelector("#siteNameInput");
let siteUrlInput = document.querySelector("#siteUrlInput");
let addBtn = document.querySelector("#addBtn");
let sitesListTable = document.querySelector("#sitesListTable");
let urlGuide = document.querySelector("#urlGuide");

const siteKey = "Sites";
let siteList = [];
console.log(siteUrlInput);

addBtn.addEventListener("click", function (e) {
  addSite();
});

siteUrlInput.addEventListener("input", function (e) {
  urlValidationAndDisplay(e.target.value);
});

(function () {
  if (localStorage.length) {
    siteList = JSON.parse(localStorage.getItem(siteKey));
    console.log(siteList);
  }
})();
displaylist(siteList);

function addSite() {
  let siteInfo = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };

  if (urlValidation(siteInfo.url)) {
    validDisplay();
    siteList.push(siteInfo);
    // console.log(siteList);
    displaylist(siteList);
    localStorage.setItem(siteKey, JSON.stringify(siteList));
  } else {
    errorDisplay();
  }
}

function displaylist(list) {
  let siteBox = "";
  for (let i = 0; i < list.length; i++) {
    siteBox += `
     <div class="row mb-1">
            <div class="col-3 bg-white p-3 items-centtralize" id="index">
             ${i + 1}</div>
            <div class="col-3 bg-white p-3 items-centtralize" id="siteName">
              ${list[i].name}
            </div>
            <div class="col-3 bg-white p-3 items-centtralize" id="VisitBtn">
              <a
                target="_blank"
                class="btn btn-success"
                href=${list[i].url}
              >
                Visit
              </a>
            </div>
            <div class="col-3 bg-white p-3 items-centtralize">
              <button onclick=deleteSite(${i}) siteNum = ${i} class="btn btn-danger deleteBtn">Delete</button>
            </div>
        </div>`;
  }
  sitesListTable.innerHTML = siteBox;
}

function deleteSite(siteNum) {
  siteList.splice(siteNum, 1);
  localStorage.setItem(siteKey, JSON.stringify(siteList));
  displaylist(siteList);
}

function urlValidation(siteUrl) {
  let result = 1;
  try {
    const fccUrl = new URL(siteUrl);
    console.log(fccUrl);
  } catch (error) {
    console.log(error);
    result = 0;
  }
  return result;
}

function errorDisplay() {
  addBtn.classList.add('disabled')
  siteUrlInput.classList.remove("is-valid");
  siteUrlInput.classList.add("is-invalid");
  urlGuide.classList.replace("urlGuideHide", "urlGuideVisible");
}
function validDisplay() {
  addBtn.classList.remove('disabled')
  siteUrlInput.classList.remove("is-invalid");
  siteUrlInput.classList.add("is-valid");
  urlGuide.classList.replace("urlGuideVisible", "urlGuideHide");
}

function urlValidationAndDisplay(siteUrl) {
  if (urlValidation(siteUrl)) {
    validDisplay();
  } else {
    errorDisplay();
  }
}
