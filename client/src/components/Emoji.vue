<template>
  <section v-if="show" class="emoji-body bg-secondary border border-dark d-flex flex-column sticky">
    <nav class="emoji-categories navbar mb-2 bg-secondary">
      <ul class="navbar-nav flex-row mx-auto">
        <li class="nav-item">
          <button v-on:click="scroll" :aria-label="guild.name" :title="guild.name" data-index="1" type="button" class="nav-btn selected">
            <svg class="disabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <g transform="translate(2.000000, 1.000000)">
                <rect id="Rectangle" x="8" y="0" width="3" height="21" rx="1.5"></rect>
                <rect id="Rectangle" transform="translate(9.843, 10.549) rotate(60) translate(-9.843, -10.549)" x="8.343" y="0.049" width="3" height="21" rx="1.5"></rect>
                <rect id="Rectangle" transform="translate(9.843, 10.549) rotate(-60) translate(-9.843, -10.549)" x="8.343" y="0.049" width="3" height="21" rx="1.5"></rect>
              </g>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="People" title="People" data-index="2" type="button" class="nav-btn">
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM16.293 6.293L17.707 7.706L16.414 9L17.707 10.293L16.293 11.706L13.586 9L16.293 6.293ZM6.293 7.707L7.707 6.294L10.414 9L7.707 11.707L6.293 10.294L7.586 9L6.293 7.707ZM12 19C9.609 19 7.412 17.868 6 16.043L7.559 14.486C8.555 15.92 10.196 16.831 12 16.831C13.809 16.831 15.447 15.92 16.443 14.481L18 16.04C16.59 17.867 14.396 19 12 19Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="Nature" title="Nature" data-index="3" type="button" class="nav-btn">
            <svg class="categoryIcon-1SvUHG" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6.814 8.982C4.539 11.674 4.656 15.591 6.931 18.153L4.034 21.579L5.561 22.87L8.463 19.437C9.569 20.127 10.846 20.513 12.161 20.513C14.231 20.513 16.183 19.607 17.516 18.027C20.069 15.01 20.771 6.945 21 3C17.765 3.876 9.032 6.356 6.814 8.982V8.982ZM8.935 17.331C6.826 15.548 6.56 12.382 8.342 10.272C9.592 8.793 14.904 6.845 18.764 5.698L8.935 17.331V17.331Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="Food" title="Food" data-index="4" type="button" class="nav-btn">
            <svg class="categoryIcon-1SvUHG" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M11 18H13V22H11V18Z" fill="currentColor"></path><path d="M12 2C8.822 2 7 4.187 7 8V16C7 16.552 7.447 17 8 17H16C16.553 17 17 16.552 17 16V8C17 4.187 15.178 2 12 2ZM11 14.001H10V5.001H11V14.001ZM14 14.001H13V5.001H14V14.001Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="Activities" title="Activities" data-index="5" type="button" class="nav-btn">
            <svg class="categoryIcon-1SvUHG" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M5.66487 5H18.3351C19.9078 5 21.2136 6.21463 21.3272 7.78329L21.9931 16.9774C22.0684 18.0165 21.287 18.9198 20.248 18.9951C20.2026 18.9984 20.1572 19 20.1117 19C18.919 19 17.8785 18.2254 17.5855 17.0342L17.0698 15H6.93015L6.41449 17.0342C6.12142 18.2254 5.08094 19 3.88826 19C2.84645 19 2.00189 18.1554 2.00189 17.1136C2.00189 17.0682 2.00354 17.0227 2.00682 16.9774L2.67271 7.78329C2.78632 6.21463 4.0921 5 5.66487 5ZM14.5 10C15.3284 10 16 9.32843 16 8.5C16 7.67157 15.3284 7 14.5 7C13.6716 7 13 7.67157 13 8.5C13 9.32843 13.6716 10 14.5 10ZM18.5 13C19.3284 13 20 12.3284 20 11.5C20 10.6716 19.3284 10 18.5 10C17.6716 10 17 10.6716 17 11.5C17 12.3284 17.6716 13 18.5 13ZM6.00001 9H4.00001V11H6.00001V13H8.00001V11H10V9H8.00001V7H6.00001V9Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="Travel" title="Travel" data-index="6" type="button" class="nav-btn">
            <svg class="categoryIcon-1SvUHG" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M22 17H19.725C19.892 16.529 20 16.029 20 15.5C20 13.015 17.985 11 15.5 11H13.5L12.276 8.553C12.107 8.214 11.761 8 11.382 8H7C6.448 8 6 8.447 6 9V11.051C3.753 11.302 2 13.186 2 15.5C2 17.986 4.015 20 6.5 20H15.5C16.563 20 17.527 19.616 18.297 19H22V17ZM6.5 16.75C5.81 16.75 5.25 16.19 5.25 15.5C5.25 14.81 5.81 14.25 6.5 14.25C7.19 14.25 7.75 14.81 7.75 15.5C7.75 16.19 7.19 16.75 6.5 16.75ZM11.5 16.75C10.81 16.75 10.25 16.19 10.25 15.5C10.25 14.81 10.81 14.25 11.5 14.25C12.19 14.25 12.75 14.81 12.75 15.5C12.75 16.19 12.19 16.75 11.5 16.75ZM16.5 16.75C15.81 16.75 15.25 16.19 15.25 15.5C15.25 14.81 15.81 14.25 16.5 14.25C17.19 14.25 17.75 14.81 17.75 15.5C17.75 16.19 17.19 16.75 16.5 16.75Z" fill="currentColor"></path>
              <path d="M8 7H10C10 5.346 8.654 4 7 4H6V6H7C7.551 6 8 6.449 8 7Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="Objects" title="Objects" data-index="7" type="button" class="nav-btn">
            <svg class="categoryIcon-1SvUHG" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M18 5.999H17V4.999C17 4.448 16.553 3.999 16 3.999H4C3.447 3.999 3 4.448 3 4.999V12.999C3 14.488 3.47 15.865 4.265 16.999H15.722C16.335 16.122 16.761 15.105 16.92 13.999H18C20.205 13.999 22 12.205 22 9.999C22 7.794 20.205 5.999 18 5.999V5.999ZM18 12H17V8H18C19.104 8 20 8.897 20 10C20 11.102 19.104 12 18 12Z" fill="currentColor"></path>
              <path d="M2 18H18V20H2V18Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="Symbols" title="Symbols" data-index="8" type="button" class="nav-btn">
            <svg class="categoryIcon-1SvUHG" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M16 4.001C14.406 4.001 12.93 4.838 12 6.081C11.07 4.838 9.594 4.001 8 4.001C5.243 4.001 3 6.244 3 9.001C3 14.492 11.124 19.633 11.471 19.849C11.633 19.95 11.817 20.001 12 20.001C12.183 20.001 12.367 19.95 12.529 19.849C12.876 19.633 21 14.492 21 9.001C21 6.244 18.757 4.001 16 4.001V4.001Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
        <li class="nav-item">
          <button v-on:click="scroll" aria-label="Flags" title="Flags" data-index="9" type="button" class="nav-btn">
            <svg class="categoryIcon-1SvUHG" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 6.002H14V3.002C14 2.45 13.553 2.002 13 2.002H4C3.447 2.002 3 2.45 3 3.002V22.002H5V14.002H10.586L8.293 16.295C8.007 16.581 7.922 17.011 8.076 17.385C8.23 17.759 8.596 18.002 9 18.002H20C20.553 18.002 21 17.554 21 17.002V7.002C21 6.45 20.553 6.002 20 6.002Z" fill="currentColor"></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
    <div class="search bg-secondary">
      <input type="text" v-on:input="handleChange" placeholder="search term" class="bg-dark text-light border-1 outline-secondary mb-2 mx-2 d-block rounded"/>
    </div>
    <div class="d-flex flex-column overflow-auto" name="emoji-list" style="height: 295px;">
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="1">
          <div aria-hidden="true" class="category-label bg-secondary">{{ guild.name }}</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in guild.emojis" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="':' + emoji.name + ':'" class="emoji-list-item" :title="emoji.name" :data-id="emoji.id" type="button">
                <img v-if="emoji.animated" class="no-click" height="32" width="32" :src="'https://cdn.discordapp.com/emojis/' + emoji.id + '.gif?v=1'"/>
                <img v-else class="no-click" height="32" width="32" :src="'https://cdn.discordapp.com/emojis/' + emoji.id + '.png?v=1'">
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="2">
          <div aria-hidden="true" class="category-label bg-secondary">People</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.people" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label secondary" name="3">
          <div aria-hidden="true" class="category-label bg-secondary">Nature</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.nature" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="4">
          <div aria-hidden="true" class="category-label bg-secondary">Food</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.food" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="5">
          <div aria-hidden="true" class="category-label bg-secondary">Activities</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.activities" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="6">
          <div aria-hidden="true" class="category-label bg-secondary">Travel</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.travel" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="7">
          <div aria-hidden="true" class="category-label bg-secondary">Objects</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.objects" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="8">
          <div aria-hidden="true" class="category-label bg-secondary">Symbols</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.symbols" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="9">
          <div aria-hidden="true" class="category-label bg-secondary">Flags</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in emojis.flags" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <div class="d-none flex-column overflow-auto" name="search-list" style="height: 295px;">
      <section class="emoji-category">
        <div class="emoji-category-label bg-secondary" name="search">
          <div aria-hidden="true" class="category-label bg-secondary">Search Results</div>
          <ul class="d-flex emoji-list flex-row flex-wrap">
            <li v-for="emoji in filtered" :key="emoji.name">
              <button v-on:click="handleClick" :aria-label="emoji.unicode" class="emoji-list-item" :title="emoji.name" type="button">
                <div class="no-click"
                  :style="'background-image: url(https://discord.com' + emoji.url + '); background-position: ' + emoji.backgroundPosition + '; background-size: ' + emoji.backgroundSize + '; width: 32px; height: 32px;'"
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.no-click {
  pointer-events: none;
}

.sticky {
  position: absolute;
  top: 35px;
  right: 35px;
  z-index: 2;
}

input {
  display: inline-block !important;
  width: 297px;
  border: 1px #000 solid;
}

.emoji-list {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}

.emoji-list-item {
  border: none;
  background-color: inherit;
  width: 42px;
  height: 42px;
  padding: 5px;
}

.emoji-list-item:hover {
  background-color: #222;
  border-radius: 25px;
}

.emoji-list-item:active,
.emoji-list-item:focus {
  border: none;
  outline: none;
}

div.category-label {
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  padding: 5px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
}

nav.emoji-categories {
  padding: 0px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.emoji-body {
  width: 315px;
  height: 400px;
  border-radius: 15px !important;
  margin: 0px;
}

button.nav-btn {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin: 0;
  padding: 10px 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 3px #000000 solid;
  background-color: inherit;
  color: white;
}

button.emoji-list {
  border: none;
}

button.nav-btn:active,
button.nav-btn:focus,
button.nav-btn:link {
    outline: none;
}

button.nav-btn:hover {
  color: green;
  border-color: green;
  outline: none;
}

.selected {
  color: green !important;
  border-color: green !important;
  outline: none;
}

.selected svg {
  fill: green !important;
}

svg {
  pointer-events: none;
  fill: white;
}

button.nav-btn:hover svg {
  fill: green !important;
}

button.nav-btn:hover {
  color: green;
  border-color: green;
  background-color: #222222;
}

path {
  background-color: white;
}
</style>

<script>
const { people } = require("../emojis/people.json");
const { nature } = require("../emojis/nature.json");
const { food } = require("../emojis/food.json");
const { activities } = require("../emojis/activities.json");
const { objects } = require("../emojis/objects.json");
const { flags } = require("../emojis/flags.json");
const { symbols } = require("../emojis/symbols.json");
const { travel } = require("../emojis/travel.json");

export default {
  name: "Emoji",
  props: {
    guild: {},
    show: Boolean,
    classes: String,
    handleClick: Function
  },
  data: function() {
    return {
      emojis: {
        people: people,
        nature: nature,
        food: food,
        activities: activities,
        objects: objects,
        flags: flags,
        symbols: symbols,
        travel: travel
      },
      search: Array,
      filtered: Array
    };
  },
  methods: {
    scroll: function(event) {
      const index = event.target.getAttribute("data-index");
      const element = document.getElementsByName(index)[0];
      element.scrollIntoView({ behavior: "smooth" });
    },
    handleChange: function(event) {
      const { value } = event.target
      if (value !== "") {
        document.getElementsByName("emoji-list")[0].classList.replace("d-flex", "d-none");
        document.getElementsByName("search-list")[0].classList.replace("d-none", "d-flex");
        this.filtered = this.search.filter(emoji => {
          const term = emoji.name.replace(/_/g, " ")
          if (term.indexOf(value.toLowerCase()) > -1) {
            return emoji;
          }
        });
      } else {
        document.getElementsByName("search-list")[0].classList.replace("d-flex", "d-none");
        document.getElementsByName("emoji-list")[0].classList.replace("d-none", "d-flex");
      }
    },
    setEvents: function() {
      const section1 = document.getElementsByName("1")[0];
      const section2 = document.getElementsByName("2")[0];
      const section3 = document.getElementsByName("3")[0];
      const section4 = document.getElementsByName("4")[0];
      const section5 = document.getElementsByName("5")[0];
      const section6 = document.getElementsByName("6")[0];
      const section7 = document.getElementsByName("7")[0];
      const section8 = document.getElementsByName("8")[0];
      const section9 = document.getElementsByName("9")[0];
      const categories = document.getElementsByClassName("nav-btn");
      const emojiList = document.getElementsByName("emoji-list")[0];
      if (emojiList.scrollTop + 225 >= section1.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[0].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section2.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[1].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section3.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[2].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section4.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[3].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section5.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[4].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section6.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[5].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section7.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[6].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section8.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[7].classList.add("selected");
      }
      if (emojiList.scrollTop + 225 >= section9.offsetTop) {
        categories.forEach(category => {
          category.classList.remove("selected");
        })
        categories[8].classList.add("selected");
      }
    }
  },
  watch: {
    show: function (value) {
      if (value) {
        this.$nextTick(function() {
          const emojiList = document.getElementsByName("emoji-list")[0];
          emojiList.addEventListener("scroll", this.setEvents)
        })
      } else {
        const emojiList = document.getElementsByName("emoji-list")[0];
        emojiList.removeEventListener("scroll", this.setEvents);
      }
    }
  },
  mounted() { 
    let search = [];
    search = search.concat(people, nature, food, activities, objects, flags, symbols, travel)
    this.search = search;
  }
};
</script>
