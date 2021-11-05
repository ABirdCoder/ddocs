var heads = {};
window.onload = () => {
  var code_pretty = document.createElement('script');

  code_pretty.setAttribute('src','https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js');

  document.head.appendChild(code_pretty);


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
    newcode = "<pre class='prettyprint'>" + item.innerHTML + "</pre>"

    item.outerHTML = newcode;
  })
  
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