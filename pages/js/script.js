const petsSlider = document.querySelector('.pets__slider-box')

const darkScreen = document.querySelector('.dark-screen')
let sliderList;
fetch('../js/pets.json').then(res => res.json()).then(json => {
  const petItemTemplate = document.querySelector('#pets-item').content;

  let arrpets = [],
    main;

  const generatePets = () => {
    while (arrpets.length < 3) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length));
      if (!arrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
  }
  generatePets();

  const petListAdd = () => {
    sliderList = document.createElement('div')
    sliderList.classList.add('slider__list')
    petsSlider.append(sliderList)

    for (let i = 0; i < 3; i++) {
      const itemNumber = arrpets[i]
      sliderList.append(petItemTemplate.cloneNode(true));
      const sliderItem = sliderList.querySelectorAll('.pets__content-items')
      const sliderImg = sliderList.querySelectorAll('.pets__picture')
      const sliderName = sliderList.querySelectorAll('.pets__content-items-name')

      sliderItem[sliderItem.length - 1].setAttribute('data-modal', `${json[itemNumber].name}`)
      sliderName[sliderItem.length - 1].textContent = `${json[itemNumber].name}`
      sliderImg[sliderItem.length - 1].setAttribute('src', `${json[itemNumber].img}`);
    }

    petsSlider.addEventListener('click', (evt) => {
      evt.preventDefault()
      if (evt.target.parentNode.classList.contains('pets__content-items')) {
        popup(event, main);
      }
    });
  }
  let arrows = document.querySelectorAll('.sl-button');
  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      if (arrpets.length)
        setTimeout(() => {
          sliderList.classList.add('animate__animated');
          sliderList.classList.add('animate__slideOutRight');
          sliderList.remove(petItemTemplate.cloneNode(true));
          arrpets.splice(0, 3);
        }, 100);
      setTimeout(() => {
        generatePets();
        petListAdd();
        document.documentElement.style.setProperty('--animate-duration', '.5s');
        sliderList.classList.add('animate__animated');
        sliderList.classList.add('animate__fadeInUp');
      }, 100);
    });
  });
  petListAdd();
});