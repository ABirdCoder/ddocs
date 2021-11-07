var heads = {};
window.onload = () => {


  const dheads = document.querySelectorAll("dhead");
  const dcode = document.querySelectorAll("dcode");
  const ul = document.createElement("ul");
  ul.classList.add("docslink");

  dheads.forEach(item => {
    item.id = 'ddocs' + item.innerHTML;


    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    li.appendChild(h3);
    h3.appendChild(a);

    a.href = "#ddocs" + item.innerHTML;
    a.innerHTML = item.innerHTML;

    ul.appendChild(li);

    heads[a.innerHTML] = a;
  });


  document.body.appendChild(ul);


  dcode.forEach(item => {
    newcode = "<pre> <button class='dcopycode'>Copy &#x2398;</button> <code>" + item.innerHTML + "</code> </pre>"

    item.outerHTML = newcode;
  })

  document.querySelectorAll(".dcopycode").forEach(item => {
    item.addEventListener("click", function () {
      var copy = item.parentElement.querySelectorAll("code")[0].innerText;
      navigator.clipboard.writeText(copy).then(function () {
        console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
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
      heads[item.innerHTML].classList.add("dselected");
      found = true;
      whatfound = item;
    }
  });

  dheads.forEach(item => {
    if (found && item != whatfound) {
      heads[item.innerHTML].classList.remove("dselected");
    }
  })
}