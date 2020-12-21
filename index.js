// Import stylesheets
import "./style.css";
import { mockData } from "./mock-data.js";

const app = document.getElementById("app");

// Fetch Data for List
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "GET"
  })
    .then(data => {
      if (!data) {
        throw new Error("Failed to Fetch Data");
      }
      return data.json();
    })
    .catch(e => {
      console.error(e);
    });

  return response;
}

getData().then(data =>
  // use mock data if fetch fails to get data
  data.length > 0 ? createList(data) : createList(mockData)
);

// Create List
const createListItem = item =>
  `<li><h5>${item.id}</h5>${item.title}<br><b>Completed:</b>&nbsp${
    item.completed
  }</li>`;

const createListUsers = item => `<hr><h3>User&nbsp${item.userId}</h3>`;

function createList(listItems) {
  let htmlString = "";
  let count = 0;

  for (const item of listItems) {
    // creates first label of list and the first list item
    if (count === 0) {
      htmlString += createListUsers(item);
      htmlString += createListItem(item);
      count++;
    }
    // if new userId then create a new label and first list item
    else if (count !== 0 && item.userId !== listItems[count - 1].userId) {
      htmlString += createListUsers(item);
      htmlString += createListItem(item);
      count++;
    } else {
      // create rest of list items for a userId
      htmlString += createListItem(item);
      count++;
    }
  }

  app.innerHTML = `
  <h1 style="margin-left:2.5rem"> To Do List </h1>
  <ul>${htmlString}</ul>
  `;
}
