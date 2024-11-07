/* PART 1 */

// STEP 1: Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector("main");

// STEP 2: Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// let myVar = "var(--main-bg)";
mainEl.style.backgroundColor = "var(--main-bg)";

// STEP 3: Set the content of mainEl to <h1>DOM Manipulation</h1>.
const h1_element = document.createElement("h1");
h1_element.innerHTML = "DOM Manipulation";
mainEl.appendChild(h1_element);

// STEP 4: Add a class of flex-ctr to mainEl.
mainEl.classList.add("flex-ctr");

/* PART 2 */

// STEP 1: Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById("top-menu");

// STEP 2: Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = "100%";

// STEP 3: Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
let myOtherVar = "--top-menu-bg";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// STEP 4: Add a class of flex-around to topMenuEL.
topMenuEl.classList.add("flex-around");

/* PART 3 */

// Menu data structure - Modified with graded lab's given data
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

// Iterate over the entire menuLinks array and for each "link" object:
for (let i = 0; i < menuLinks.length; i++) {
  // Create an <a> element.
  let a_element = document.createElement("a");
  // On the new element, add an href attribute with its value set to the href property of the "link" object.
  a_element.attributes.href = menuLinks[i].href;
  // Set the new element's content to the value of the text property of the "link" object.
  a_element.innerHTML = menuLinks[i].text;
  // Append the new element to the topMenuEl element.
  topMenuEl.appendChild(a_element);
}

// R-ALAB GRADED PORTION OF ASSIGNMENT

/* PART 3 */

// Step 1: Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById('sub-menu');

// Step 2: Set the height subMenuElEl element to be "100%".
subMenuEl.style.height = "100%";

// Step 3: Set the background color of subMenuElEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Step 4: Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add("flex-around");

// Step 5: Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = "absolute";

// Step 6: Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = 0;

/* PART 4 */

// Step 1: Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a');
// console.log(topMenuLinks[0]);

// Step 2: Attach a delegated 'click' event listener to topMenuEl
topMenuEl.addEventListener('click', (event)=> {
    event.preventDefault(); // The first line of code of the event listener function should call the event object's preventDefault() method.
    if (event.target.localName !== 'a') return; // The second line of code of the function should immediately return if the element clicked was not an <a> element.
    console.log(event.target.innerHTML); // Log the content of the <a> to verify the handler is working.
    // Step 3: The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
    if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        subMenuEl.style.top = 0;
    }
    else {
        // Step 4: The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
        for (let i=0; i<event.target.parentNode.childNodes.length; i++) {
            event.target.parentNode.childNodes[i].classList.remove('active');
        }
        event.target.classList.add('active');
        // console.log(event.target);
        
        /* PART 5 */

        // Step 1: Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):        
        for (let i=0; i<event.target.parentNode.childNodes.length; i++) {
            if (event.target.innerHTML === menuLinks[i].text) {
                // a) If the clicked <a> element's "link" object within menuLinks has a subLinks property 
                // (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
                if ('subLinks' in menuLinks[i]) {
                    subMenuEl.style.top = '100%';
                }
                // b) Otherwise, set the CSS top property of subMenuEl to 0.
                // Hint: Caching the "link" object will come in handy for passing its subLinks array later.
                else {
                    subMenuEl.style.top = 0;
                }
            }
        }
        buildSubmenu(subMenuEl, menuLinks, event.target.innerHTML);
    }
});

function buildSubmenu (submenu, arr, text) {
    // Step 2: Clear the contents of subMenuEl.
    submenu.innerHTML = ''; 
    // Step 3: Iterate over the subLinks array, passed as an argument, and for each "link object":
    for (let i=1; i<arr.length; i++) { // start at i=1 because we know for certain the first object of the array contains no subLinks property
        if (text === arr[i].text) {
            for (let k=0; k<arr[i].subLinks.length; k++) {
            // a) Create an <a> element.
            let a = document.createElement("a");
            // b) Add an href attribute to the <a>, with the value set by the href property of the "link" object.
            a.attributes.href = arr[i].subLinks[k].href;
            // c) Set the element's content to the value of the text property of the "link" object.
            a.innerHTML = arr[i].subLinks[k].text;
            // d) Append the new element to the subMenuEl.
            submenu.appendChild(a);
            }  
        } 
    }
}

// Step 4: Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener('click', (event)=>{
    // The first line of code of the event listener function should call the event object's preventDefault() method.
    event.preventDefault();
    // The second line of code within the function should immediately return if the element clicked was not an <a> element.
    if (event.target.localName !== 'a') return;
    // Log the content of the <a> to verify the handler is working.
    console.log(event.target.innerHTML);
    // Step 5: Next, the event listener should set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = 0;
    // Step 6: Remove the active class from each <a> element in topMenuLinks.
    for (let i=0; i<event.target.parentNode.previousSibling.childNodes.length; i++) {
        event.target.parentNode.previousSibling.childNodes[i].classList.remove('active');
    }
    // Step 7: Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
    mainEl.innerHTML = `<h1>${event.target.innerHTML.charAt(0).toUpperCase() + event.target.innerHTML.slice(1)}</h1>`;
});
