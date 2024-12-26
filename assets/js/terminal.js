// todo: change colors (blue etc), add semicolons, change the minimized div's colors, media query?

// VARIABLES
let pastCommands = [];
let timesPressedUp = 0;

// Event listeners
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        timesPressedUp = 0;
        addComment();
        // Makes the input field always appear on screen. Important
        document.querySelector(".comment-div").scrollIntoView();
    } else if (e.key == "ArrowUp") {
        if (pastCommands.length > timesPressedUp) (timesPressedUp++);
        let lastCommand = pastCommands[pastCommands.length - timesPressedUp];
        document.querySelector(".user-command").value = lastCommand;
        if (document.querySelector(".user-command").value == "undefined") {
            document.querySelector(".user-command").value = "";
        }
    } else if (e.key == "ArrowDown") {
        if (timesPressedUp == 0) {
            document.querySelector(".user-command").value = "";
            if (document.querySelector(".user-command").value == "undefined") {
                document.querySelector(".user-command").value = "";
            }
        } else if (0 < timesPressedUp) {
            timesPressedUp--;
            let lastCommand = pastCommands[pastCommands.length - timesPressedUp];
            document.querySelector(".user-command").value = lastCommand;
            if (document.querySelector(".user-command").value == "undefined") {
                document.querySelector(".user-command").value = "";
            }
        }
    } else if (e.key == "Tab") {
        e.preventDefault();
        let ongoingInput = document.querySelector(".user-command").value;
        let dict = typeof commandDict[currentlyIn] == "object" ? Object.keys(commandDict[currentlyIn]) : commandDict[currentlyIn];
        ongoingInput === "" ? document.querySelector(".user-command").value = "" : dict.map((cmd) => {
            if (cmd.startsWith(ongoingInput)) document.querySelector(".user-command").value = cmd;
        })
    }
})

export let commentsDiv = document.querySelector(".comments");

let themes = ["hacker", "default", "light", "cute"];
let rootCmds = {
    "about": `<div>Hey, I'm Berna Kurt! I'm a junior web developer who wants to build good, responsive and secure websites!</div>`,
    "skills": `<div><p>Languages: Turkish (native), English (fluent), Korean (fluent)</p>
        <p>Programming languages: Python, JavaScript/Typescript, PHP</p>
        <p>Frameworks & Libraries: Selenium, BeautifulSoup4, Pandas, Node.JS, Express, React.JS (loading...)</p>
        <p>Developer Tools: Git/Github, Postman</p>
        <p>OS: Windows, Kali Linux</p></div>`,
    "interests": `<div>I like coding, linguistics, geology & fantasy novels! </div>`,
    "information": `<div>This project was inspired by Guillaume Reygner's portfolio (https://guillaumereygner.fr/).
            <br/><br/>
            I used vanilla JavaScript, HTML and CSS while creating this project.<br/>
            The Terminal file and Terminal window are both draggable. The terminal window can be resized.<br/>
            The Terminal window can be minimized and closed. When minimized, the contents will remain but if X is pressed, the contents will reset.<br/>
            The up/down arrows work & the previous commands entered this session can be accessed. Pressing Tab will complete the input.<br/>
            Working on Turkish translation.<br/><br/>

            Type "credits" to get all credits.</div>`,
    "credits": `<div>Inspiration: https://guillaumereygner.fr/ (by Guillaume Reygner)<br/>
                                    ASCII art: https://ascii.co.uk/art/bee (by sjw)<br/>
                                    Favicon: https://www.flaticon.com/free-icons/terminal (by Royyan Wijaya) <br/>
                                    Hacker (Kali Linux) Wallpaper: https://github.com/dorianpro/kali-linux-wallpapers/tree/master 
                                </div>`,
    "certificates": ["Basics of Web Development & Coding Specialization - University of Michigan", "Introduction to Cybersecurity - BTK Academy", "Introduction to Information Security - BTK Academy", "Cyber Incident Response - BTK Academy", "Introduction to Firewalls - BTK Academy", "Frontend Development Specialization - Acunmedya Academy (loading...)"],
    "experience": ["english/turkish translator at a medical clinic", "various korean translator jobs", "intern at an information security company", "freelance ai trainer at outlier"],
    "get linkedin": "https://www.linkedin.com/in/beekurt/",
    "get medium": "https://github.com/beekurt98",
    "get github": "https://medium.com/@beekurt",
    "cd themes": "Here are some themes you can change into: ",
};
let mainCmds = ["clear", "ls", "cd ..", "help"];
let allCmds = [...mainCmds, ...Object.keys(rootCmds), ...themes];
let currentlyIn = "root";
let commandDict = {
    "root": rootCmds,
    "themes": themes,
};

function addComment() {
    let newComment = document.createElement("div");
    newComment.classList.add(".user-comment");

    // Get user comment + add it to the chat screen
    let userCommandDiv = document.querySelector(".user-command");
    let userCommand = document.querySelector(".user-command").value.trim();
    let directory = document.querySelector(".directory");
    if (userCommand === "") {
        commentsDiv.innerHTML += `<div>Please enter a command.</div>`;
        return;
    }
    pastCommands.push(userCommand);
    newComment.innerText = `> ${userCommand}`;
    commentsDiv.appendChild(newComment);

    if (allCmds.includes(userCommand)) {
        if (userCommand == "clear") {
            commentsDiv.innerHTML = "";
        } else if (userCommand == "help") {
            let currentDirArray = currentlyIn === "root" ? [...Object.keys(rootCmds), ...mainCmds] : [...themes, ...mainCmds];
            commentsDiv.innerHTML += `<ul> ${currentDirArray.map((command) => {
                return `<li class="ls-item">${command}</li>`;
            }).join("")} </ul>`;
        } else if (userCommand == "ls") {
            if (currentlyIn === "themes") {
                commentsDiv.innerHTML += `<div class="ls-cont"> ${[...themes, "root"].map((theme) => {
                    return `<div class="ls-item">${theme}</div>`;
                }).join("")} </div>`;
            } else {
                commentsDiv.innerHTML += `<div class="ls-cont"> ${Object.keys(rootCmds).map((command) => {
                    return `<div class="ls-item">${command}</div>`;
                }).join("")} </div>`;
            }
        } else if (userCommand == "cd ..") {
            if (currentlyIn == "root") {
                commentsDiv.innerHTML += `<div>Already in the root directory.</div>`;
                userCommandDiv.value = "";
                return;
            }
            currentlyIn = "root";
            let directories = directory.innerText.split("/");
            directories.pop();
            directory.innerHTML = "";
            directory.innerHTML = directories.map((x) => {
                if (x !== "") return `/${x}`;
            }).join('');
        } else if (currentlyIn === "root" && Object.keys(rootCmds).includes(userCommand) || themes.includes(userCommand)) {
            if (userCommand.startsWith("get ")) {
                window.open(rootCmds[userCommand]);
                return;
            } else if (userCommand === "experience" || userCommand === "certificates") {
                commentsDiv.innerHTML += `<ul>${rootCmds[userCommand].map((x) => {
                    return `<li>${x}</li>`;
                }).join("")}</ul>`;
                userCommandDiv.value = "";
                return;
            } if (userCommand === "cd themes") {
                currentlyIn = "themes";
                directory.innerHTML += "/themes";
                commentsDiv.innerHTML += `<ul>${themes.map((theme) => {
                    return `<li>${theme}</li>`;
                }).join("")}</ul>`;
            } else if (currentlyIn === "themes" && themes.includes(userCommand)) {
                changeTheme(userCommand);
            } else {
                commentsDiv.innerHTML += rootCmds[userCommand];
            }
        } else if (currentlyIn === "themes" && Object.keys(rootCmds).includes(userCommand)) {
            handleInvalidCommand(userCommand);
        }
    }
    else {
        handleInvalidCommand(userCommand);
    }
    userCommandDiv.value = "";
}
function changeTheme(theme) {
    let domBody = document.querySelector("body");
    let pastTheme = domBody.className;
    theme == "light" ? commentsDiv.innerHTML += `<div>"${theme}" theme selected. Protect your eyes!</div>` : commentsDiv.innerHTML += `<div>"${theme}" theme selected.</div>`;
    domBody.classList.remove(pastTheme);
    domBody.classList.add(theme);
}

function handleInvalidCommand(cmmd) {
    commentsDiv.innerHTML += `<div>The term <span class="green">'${cmmd}'</span> is not recognized as the name of a command. Please type <span class="red">help</span> to see a list of possible commands.</div>`;
}