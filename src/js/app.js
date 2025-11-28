import { name } from "file-loader";
import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "position-right", // social media bar position (position-left or position-right)
        //for social media links, only update usernames
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }*/

const toggle = document.getElementById("container-toggle");
toggle.onclick = () => {
  const html = document.documentElement;
  const activeTheme = html.getAttribute("data-theme");
  activeTheme === "light"
    ? (html.setAttribute("data-theme", "dark"),
      localStorage.setItem("theme", "dark"))
    : (html.setAttribute("data-theme", "light"),
      localStorage.setItem("theme", "light"));
};
// Obtener elementos
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";
  let name = `${variables.name}`;
  variables.name == null ? (name = `Your name`) : (name = `${variables.name}`);
  let lastName = `${variables.lastName}`;
  variables.lastName == null
    ? (lastName = `Your lastName`)
    : (lastName = `${variables.lastName}`);
  let role = variables.role;
  variables.role == null ? (role = "Web Developer") : (role = variables.role);
  let city = variables.city;
  variables.city == null ? (city = "Maimi") : (city = variables.city);
  let country = variables.country;
  variables.country == null ? (country = "USA") : (country = variables.country);
  let twitter = variables.twitter;
  variables.twitter == null ? (twitter = "") : (twitter = variables.twitter);
  let github = variables.github;
  variables.github == null ? (github = "") : (github = variables.github);
  let linkedin = variables.linkedin;
  variables.linkedin == null
    ? (linkedin = "")
    : (linkedin = variables.linkedin);
  let instagram = variables.instagram;
  variables.instagram == null
    ? (instagram = "")
    : (instagram = variables.instagram);

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${name} ${lastName}</h1>
          <h2>${role}</h2>
          <h3>${city}, ${country}</h3>
          <ul class="${variables.socialMediaPosition}">
            <li><a href="https://x.com/${twitter}" target="_blank"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/${github}" target="_blank"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/${linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/${instagram}" target="_blank"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (position-left or position-right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
