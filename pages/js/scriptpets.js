fetch('../js/pets.json').then(res => res.json()).then(json => {
  const petCardTemplate = document.querySelector('#petCard').content
  const freindsList = document.querySelector('.friends__list')
  const pageSpan = document.querySelector('.pets__page')

  let arrpets = []
  const PETS_COUNT = 48
  let pageSize
  let pageNumber = 1
  let lastPage, petPage;

  const initPageSize = () => {
    if (window.innerWidth < 768) {
      pageSize = 'mobile'
      lastPage = PETS_COUNT / 3
    }
    if (window.innerWidth < 1221 && window.innerWidth > 767) {
      pageSize = 'tablet'
      lastPage = PETS_COUNT / 6
    }
    if (window.innerWidth > 1220) {
      pageSize = 'decktop'
      lastPage = PETS_COUNT / 8
    }
  }
  initPageSize();

  let fullPetsList = [];
  let pets = [0, 1, 2, 3, 4, 5, 6, 7];
  fullPetsList = () => {
    let tempArr = [];
    for (let i = 0; i < 6; i++) {
      const newPets = pets;
      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }
      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  };
  arrpets = fullPetsList()


  const sort6recursively = (list) => {
    const length = list.length;
    for (let i = 0; i < (length / 6); i++) {
      const stepList = list.slice(i * 6, (i * 6) + 6);
      for (let j = 0; j < 6; j++) {
        const duplicatedItem = stepList.find((item, ind) => {
          return item === stepList[j] && (ind !== j)
        });
        if (duplicatedItem !== undefined) {
          const ind = (i * 6) + j;
          const which8OfList = Math.trunc(ind / 8);
          list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);
          sort6recursively(list);
        }
      }
    }
    return list;
  }

  const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;
    for (let i = 0; i < length / 8; i++) {
      const uniqueStepList = [];
      for (j = 0; j < list.length; j++) {
        if (uniqueStepList.length >= 8) {
          break;
        }
        if (!uniqueStepList.includes(list[j])) {
          uniqueStepList.push(list[j]);
          list.splice(j, 1);
          j--;
        }
      }
      unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;
    list = sort6recursively(list);
    return list;
  }

  arrpets = sort863(arrpets);

  const petAdd = (itemNumber) => {
    freindsList.append(petCardTemplate.cloneNode(true))
    const sliderItem = freindsList.querySelectorAll('.pets__content-items')
    const sliderImg = freindsList.querySelectorAll('.pets__picture')
    const sliderName = freindsList.querySelectorAll('.pets__content-items-name')
    sliderItem[sliderItem.length - 1].setAttribute('data-modal', `${json[itemNumber].name}`)
    sliderName[sliderItem.length - 1].textContent = `${json[itemNumber].name}`
    sliderImg[sliderItem.length - 1].setAttribute('src', `${json[itemNumber].img}`)
  }
  freindsList.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (evt.target.parentNode.classList.contains('pets__content-items')) {
      popup(event, petPage);
    }
  });


  const draw = (pageNumber) => {
    if (pageNumber > lastPage) {
      pageNumber = lastPage
      pageSpan.textContent = pageNumber
    }
    if (pageSize === 'decktop') {
      for (let i = (pageNumber - 1) * 8; i < pageNumber * 8; i++) {
        petAdd(arrpets[i])
      }
    }
    if (pageSize === 'tablet') {
      for (let i = (pageNumber - 1) * 6; i < pageNumber * 6; i++) {
        petAdd(arrpets[i])
      }
    }
    if (pageSize === 'mobile') {
      for (let i = (pageNumber - 1) * 3; i < pageNumber * 3; i++) {
        petAdd(arrpets[i])
      }
    }
  }

  draw(pageNumber);

  const delPets = () => {
    while (freindsList.firstChild) {
      freindsList.removeChild(freindsList.firstChild);
      freindsList.classList.add('animate__animated');
      freindsList.classList.add('animate__fadeIn');
    }
  }

  window.addEventListener('resize', () => {
    let oldPageSize = pageSize
    initPageSize()
    if (oldPageSize !== pageSize) {
      initPageSize()
      delPets()
      draw(pageNumber)
    }
  })

  const nextBtn = document.querySelector('.slide-bar-button-next')
  const lastBtn = document.querySelector('.slide-bar-button-last')
  const previousBtn = document.querySelector('.slide-bar-button-previous')
  const firstBtn = document.querySelector('.slide-bar-button-first')


  nextBtn.addEventListener('click', () => {
    pageNumber++
    pageSpan.textContent = pageNumber
    delPets();
    freindsList.classList.add('animate__animated');
    freindsList.classList.add('animate__fadeIn');
    draw(pageNumber)
    if (pageNumber === lastPage) {
      lastBtn.setAttribute('disabled', 'disabled')
      nextBtn.setAttribute('disabled', 'disabled')
    }
    firstBtn.removeAttribute('disabled')
    previousBtn.removeAttribute('disabled')
  })

  previousBtn.addEventListener('click', () => {
    pageNumber--;
    pageSpan.textContent = pageNumber;
    delPets();
    freindsList.classList.add('animate__animated');
    freindsList.classList.add('animate__fadeIn');
    draw(pageNumber)
    if (pageNumber === 1) {
      firstBtn.setAttribute('disabled', 'disabled')
      previousBtn.setAttribute('disabled', 'disabled')
    }
    lastBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')

  })

  lastBtn.addEventListener('click', () => {
    pageNumber = lastPage
    pageSpan.textContent = lastPage
    delPets()
    draw(pageNumber)
    lastBtn.setAttribute('disabled', 'disabled')
    nextBtn.setAttribute('disabled', 'disabled')
    firstBtn.removeAttribute('disabled')
    previousBtn.removeAttribute('disabled')
  })

  firstBtn.addEventListener('click', () => {
    pageNumber = 1
    pageSpan.textContent = pageNumber
    delPets()
    draw(pageNumber)
    firstBtn.setAttribute('disabled', 'disabled')
    previousBtn.setAttribute('disabled', 'disabled')
    lastBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')
  })

  // самый-самый конец
})