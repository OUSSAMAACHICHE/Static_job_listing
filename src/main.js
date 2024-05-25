// get json data
fetch("../data.json").then((response) => {
  if (!response.ok) {
    throw new Error("Network response was not ok!")
  }
  return response.json()
}).then(data => {
  // handle data
  preparationData(data)

}).catch(error => {
  console.error("There is a problem with api data", error)
})

// get dom elements 
const mainParent = document.getElementById('content'),
  filteredItems = document.querySelector('.filter_item_parent'),
  clearBtn = document.getElementById("clear")

  // hide the filtered bar
filteredItems.parentElement.style.opacity = "0"
// fn handle json data
function preparationData(jsonData) {
  let boxesContent = ""
  jsonData.forEach(item => {
    let tools = item.tools.map(tool => `<div data-tool="${tool}">${tool}</div>`).join('')
    let languages = item.languages.map(language => `<div data-language="${language}">${language}</div>`).join('')
    let isNewOffer = item.new ? `<p class="bg-Desaturated-Dark-Cyan px-2 py-1 text-white uppercase font-bold rounded-2xl">New!</p>` : ""
    let isFeatued = item.featured ? `<p class="px-2 py-1 text-white uppercase font-bold rounded-2xl bg-neutral-Very-Dark-Grayish-Cyan">Featured</p>` : ""

    boxesContent += `
        <article class="bg-white w-[90%] mx-auto my-10 rounded-md p-6 relative shadow-2xl shadow-Desaturated-Dark-Cyan features">
          <img src="${item.logo}" alt="photosnap" class="w-14 absolute top-[-28px] ">
          <div class="flex flex-wrap items-center justify-start gap-2 mt-5 mb-3">
            <span class="text-Desaturated-Dark-Cyan text-xl font-bold mr-3">${item.company}</span>
            ${isNewOffer}
            ${isFeatued}
          </div>
          <h2 class="cursor-pointer text-neutral-Very-Dark-Grayish-Cyan hover:text-Desaturated-Dark-Cyan w-fit font-bold text-xl mb-3">
            ${item.position}</h2>
          <div class="flex gap-5 text-xl text-neutral-Dark-Grayish-Cyan">
            <p>${item.postedAt}</p>
            <p>${item.contract}</p>
            <p>${item.location}</p>
          </div>
          <hr class="my-5 border border-neutral-Dark-Grayish-Cyan ">
          <div class="flex flex-wrap items-center gap-3 options">
            <div data-role="${item.role}">${item.role}</div>
            <div data-level="${item.level}">${item.level}</div>
            ${languages}
            ${tools}
          </div>
        </article>
      `;
  });
  // add the boxes into the main parent
  mainParent.innerHTML = boxesContent;

  let optionElements = mainParent.querySelectorAll('.options div')
  checkNewOffer(jsonData)

  createFilterEl(optionElements)

}

// add left green bar on the new offers
function checkNewOffer(data) {
  // loop through the offer items
  Array.from(mainParent.children).forEach(item => {
    if (item.classList.contains('active')) {
      item.classList.remove('actvie')
    }
  })
  // loop through data json 
  data.forEach(item => {
    if (item.new && item.featured) {
      mainParent.children[item.id - 1].classList.add('active')
    }
  })
}

let statusOption = ""


function createFilterEl(ele) {
  ele.forEach(e => {

    e.addEventListener('click', (el) => {
      
      // create the main skill container
      const skill = document.createElement('div')
      skill.className = "filtred_skills bg-neutral-Light-Grayish-Cyan-Background rounded-md mx-2] overflow-hidden flex items-center justify-between flex-wrap"


      let skillSpan = document.createElement('span')
      skillSpan.className = "px-2 text-xl font-semibold text-Desaturated-Dark-Cyan"

      // check any features clicked
      if (el.currentTarget.getAttribute('data-role')) {
        statusOption = "role"
        skillSpan.innerText = el.currentTarget.getAttribute('data-role')
        skill.setAttribute('data-skills', el.currentTarget.getAttribute('data-role'))

      } else if (el.currentTarget.getAttribute('data-language')) {
        statusOption = "language"
        skillSpan.innerText = el.currentTarget.getAttribute('data-language')
        skill.setAttribute('data-skills', el.currentTarget.getAttribute('data-language'))

      } else if (el.currentTarget.getAttribute('data-tool')) {
        statusOption = "tool"
        skillSpan.innerText = el.currentTarget.getAttribute('data-tool')
        skill.setAttribute('data-skills', el.currentTarget.getAttribute('data-tool'))

      } else {
        statusOption = "level"
        skillSpan.innerText = el.currentTarget.getAttribute('data-level')
        skill.setAttribute('data-skills', el.currentTarget.getAttribute('data-level'))

      }


      let secondSkillSpan = document.createElement('span')
      secondSkillSpan.className = "close hover:bg-[#000] text-white cursor-pointer bg-Desaturated-Dark-Cyan min-h-8 inline-block px-2 font-bold text-xl leading-10"
      secondSkillSpan.innerText = "X"

      // add the spans to the main skill parent
      skill.appendChild(skillSpan)
      skill.appendChild(secondSkillSpan)
      // add the skill element to the parent ele
      filteredItems.appendChild(skill)
      deleteFiltred(filteredItems) 
      hideFilterParent(filteredItems)
    })
  })
}

// remove filtered items
function deleteFiltred(items) {
  
  Array.from(items.children).forEach(item => {
    item.addEventListener('click', function(e) {
        // check if there's a class whose name is close
        if(e.target.classList.contains('close')) {
          e.currentTarget.remove()
          hideFilterParent(items)
        }
    })
    clearBtn.addEventListener('click', function() {
      Array.from(items.children).forEach(item => {
        item.remove()
        hideFilterParent(items) 
      })
    })
  })
}

// remove all filtered items
function hideFilterParent(items) {
  // check if there is no items 
  if(items.children.length < 1) {
    console.log(items.children.length)
    filteredItems.parentElement.style.opacity = "0"
  } else {
    filteredItems.parentElement.style.opacity = "1"
  }
}