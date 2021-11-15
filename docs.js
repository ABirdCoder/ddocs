var heads = {};
const root = document.documentElement;

window.onload = () => {
  const dheads = document.querySelectorAll("dhead");
  const dcode = document.querySelectorAll("dcode");
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  div.classList.add("docslink");
  div.appendChild(ul);

  const button = document.createElement("button");

  button.innerHTML = "&#9790";
  button.classList.add("light-mode")
  div.appendChild(button);
  if(localStorage.get("darkmode")==="true") button.click();

  button.addEventListener("click", () => {
    if (button.classList.contains("light-mode")) {
      button.classList.remove("light-mode");
      button.classList.add("dark-mode");
      localStorage.setItem("darkmode", "true");
    }
    else {
      localStorage.setItem("darkmode", "false");
      button.classList.remove("dark-mode");
      button.classList.add("light-mode");
    }
    if (button.classList.contains("dark-mode")) {
      button.innerHTML = "&#9728";


      root.style.setProperty("--docs-bg",  "#1b1b1b");
      root.style.setProperty("--code-bg",  "#444444");
      root.style.setProperty("--sample-color", "darkred");
      root.style.setProperty("--info-color",  "rgb(199, 199, 199)");
      root.style.setProperty("--base-color",  "white");

      root.style.setProperty("--bookmark-unselected",  "rgb(134, 134, 134)");
      root.style.setProperty("--bookmark-background",  "#111111");
      root.style.setProperty("--bookmark-selected",  "#36a4cf");

      root.style.setProperty("--scrollbar-code-color",  "rgb(63, 63, 63)");
      root.style.setProperty("--scrollbar-code-color-hover",  "rgb(59, 59, 59)");

      root.style.setProperty("--copy-button-color",  "rgb(255, 255, 255)");
      root.style.setProperty("--copy-button-bg",  "#111a42");

      document.getElementById("DDarkTheme").removeAttribute("disabled");
    }
    else {
      button.innerHTML = "&#9790";


      root.style.setProperty("--docs-bg",  "white");
      root.style.setProperty("--code-bg",  "#f1f1f1");
      root.style.setProperty("--sample-color", "crimson");
      root.style.setProperty("--info-color",  "grey");
      root.style.setProperty("--base-color",  "black");

      root.style.setProperty("--bookmark-unselected",  "rgb(70, 68, 68)");
      root.style.setProperty("--bookmark-background",  "#ebebeb");
      root.style.setProperty("--bookmark-selected",  "#36a4cf");

      root.style.setProperty("--scrollbar-code-color",  "#888");
      root.style.setProperty("--scrollbar-code-color-hover",  "#555");

      root.style.setProperty("--copy-button-color",  "white");
      root.style.setProperty("--copy-button-bg",  "#3aa0ff");

      document.getElementById("DDarkTheme").setAttribute("disabled", "disabled");
    }
  })

  dheads.forEach(item => {
    item.id = 'ddocs' + item.innerText;
    item.innerHTML += "<span class='line'></span>"

    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    li.appendChild(h3);
    h3.appendChild(a);

    const maxLength = 13;

    a.href = item.innerText.length > maxLength ? "#ddocs" + item.innerText : "#ddocs" + item.innerText;
    a.innerHTML = item.innerText.length > maxLength ?item.innerText.substr(0, maxLength) + "..." :  item.innerText.substr(0, maxLength);

    ul.appendChild(li);

    if (Object.keys(heads).length == 0) {
      a.classList.add("dselected")
    }

    heads[a.innerText] = [a, item.innerText];
  });

  document.body.appendChild(div);


  dcode.forEach(item => {
    newcode = "<pre> <button class='dcopycode'>Copy &#x2398;</button> <code>" + item.innerHTML + "</code> </pre>"

    item.outerHTML = newcode;
  })

  document.querySelectorAll(".dcopycode").forEach(item => {
    item.addEventListener("click", function () {
      var copy = item.parentElement.querySelectorAll("code")[0].innerText;
      navigator.clipboard.writeText(copy).then(function () {
        item.innerText = "Copied!"
      }, function (err) {
        item.innerText = "Failed to copy!"
      });
      setTimeout(function () {
        item.innerHTML = "Copy &#x2398;"
      }, 1000);
    })
  })

  hljs.highlightAll();
}

window.onscroll = () => {
  const dheads = document.querySelectorAll("dhead");

  var found = false;
  var whatfound = undefined;
  dheads.forEach(item => {
    const rect = item.getBoundingClientRect();

    if (window.scrollY >= rect.top && window.scrollY <= rect.bottom && !found) {
      heads[htmlEntities(item[1].innerText)].classList.add("dselected");
      found = true;
      whatfound = item;
    }
  });

  dheads.forEach(item => {
    if (found && item != whatfound) {

      heads[htmlEntities(item[1].innerText)].classList.remove("dselected");
    }
  })
}

function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
