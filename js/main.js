"use strict";

//--------fetching the data.json--------
fetch("../data/data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    getHtmlRoot(data);
  })
  .catch((error) => {
    console.log(error);
  });

let result = "";
let level = 0;

//iterating over each element within the data object
const showData = (data, result, level) => {
  data.forEach((item, i) => {
    if (!item.subData) {
      result += `<div class="sub${level}">
      <p>Id: ${item.id} </p>
      <p>Site Name: ${item.name}</p>
      <p><a target="_blank" href="https://${item.url}">Site Url: ${item.name}</a></p>
      </div>`;
    } else {
      result +=
        `<div class="sub${level}">
      <p>Id: ${item.id} </p>
      <p>Site Name: ${item.name}</p>
      <p><a target="_blank" href="https://${item.url}">Site Url: ${item.name}</a></p>
      <div >` +
        showData(item.subData, " ", level + 1) +
        `</div></div>`;
    }
  });
  return result;
};

// injecting js into html
const getHtmlRoot = (data, result) => {
  let mainRoot = document.querySelector(".root");
  mainRoot.innerHTML = showData(data, result, level);
};
