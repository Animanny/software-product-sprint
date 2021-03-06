// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* Adds a random greeting to the page. */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting');
  greetingContainer.innerText = greeting;
}

// Switch image for the experience container
function experienceImgHandler(job){
    imgAddress = null;
    projectLink = null;
    switch(job){
        case 'cipher':
            imgAddress  = "images/cipher.png";
            projectLink = "http://faceboo.com/projectcipher";
            break;
        case 'htn':
            imgAddress = "images/hackTheNorth.png";
            projectLink = "https://devpost.com/software/harry-potter-vr-chess-board";
            break;
        case 'capriccio':
            imgAddress = "images/capriccio.png";
            projectLink = "https://devpost.com/software/capriccio";
            break;
        default:

    }
    document.getElementById("experienceImage").src = imgAddress;
    document.getElementById("projecLink").href = projectLink;
}

//Fetch the greeting from the backend and display it on the page
function fetchAndDisplayGreeting(){
    fetch("/data").then(response => response.json()).then((messages) => {
            var messageContainer = document.getElementById("messages");
            messages.forEach((message) => {
                var para = document.createElement("p");
                para.innerText = message;
                messageContainer.appendChild(para);
            });
    })
}