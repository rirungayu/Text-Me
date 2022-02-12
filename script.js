"use strict";

// HTML ELEMENTS
const hugButton = document.querySelector(".hug_button");
const loginButton = document.querySelector(".login_button");
const sendButton = document.querySelector(".send_message");
const logoutButton = document.querySelector(".logoutButton");
const toast = document.querySelector(".toast");
const main = document.querySelector(".main");
const login = document.querySelector(".login");
const messages = document.querySelector(".messages");
const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const hugUserSelect = document.querySelector(".hug_user_select");
const messageUserSelect = document.querySelector(".message_user_select");
const newMessageInput = document.querySelector(".new_message_input");

const accounts = ["Alice", "John", "Jake", "Phyllis", "Connor"];

// DATA
const users = [
  {
    username: "Connor",
    password: "con123",
    messages: [],
  },
  {
    username: "Alice",
    password: "ali123",
    messages: [],
  },
  {
    username: "John",
    password: "jon123",
    messages: [],
  },
  {
    username: "Phyllis",
    password: "phy123",
    messages: [],
  },
  {
    username: "Jake",
    password: "jak123",
    messages: [],
  },
];

// GLOBAL VARIABLES
let currentaccount;

// EVENT LISTENERS
hugButton.addEventListener("click", function () {
  let recepient = users.find((user) => user.username === hugUserSelect.value);
  let message = {
    sender: currentaccount.username,
    recepient: recepient.username,
    content: "hug",
  };
  currentaccount.messages.push(message);
  recepient.messages.push(message);
  displayMessage(message);
  showToast(`Sent hug to ${recepient.username}`);
});

sendButton.addEventListener("click", function () {
  let recepient = users.find(
    (user) => user.username === messageUserSelect.value
  );
  if (newMessageInput.value === "") {
    showToast("Cannot send an empty message!");
  } else {
    let message = {
      sender: currentaccount.username,
      recepient: recepient.username,
      content: newMessageInput.value,
    };
    currentaccount.messages.push(message);
    recepient.messages.push(message);
    displayMessage(message);
    newMessageInput.value = "";
    showToast(`Sent message to ${recepient.username} `);
  }
});

loginButton.addEventListener("click", function () {
  if (usernameInput.value === "" || passwordInput.value === "") {
    showToast("Enter username and password");
  } else {
    currentaccount = users.find(
      (user) => user.username === usernameInput.value
    );
    if (passwordInput.value === currentaccount.password) {
      main.classList.add("show");
      login.classList.add("hide");
      usernameInput.value = "";
      passwordInput.value = "";
      showToast("Logged In!");
      messages.innerHTML = "";
      displayMessages(currentaccount.messages);
      displayOptions(accounts);
    } else {
      showToast("Username or password is incorrect");
    }
  }
});

logoutButton.addEventListener("click", function () {
  main.classList.remove("show");
  login.classList.remove("hide");
  showToast("Logged Out!");
});

// FUNCTIONS
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

function displayMessages(messagearray) {
  messagearray.forEach(displayMessage);
}

function displayOptions(accountsarray) {
  let curr = accountsarray.indexOf(currentaccount.username);
  let filtered = accountsarray.filter(function (value, index, arr) {
    return index !== curr;
  });
  let options = filtered
    .map((account) => `<option value=${account}>${account}</option>`)
    .join("\n");
  hugUserSelect.innerHTML = options;
  messageUserSelect.innerHTML = options;
}

function displayMessage(message) {
  const hug = `<img src="hug.jpg" alt="A hug" width="100" height="100" border="5" style ="border-radius:12px; border-color:white"/>`;
  const html = ` <div class="message ${
    message.sender === currentaccount.username ? "sent" : "received"
  } label">
  <header class="sender">@${
    message.sender === currentaccount.username
      ? message.recepient
      : message.sender
  }</header>
  ${message.content === "hug" ? hug : message.content}
</div>`;
  messages.insertAdjacentHTML("beforeend", html);
}
