let pets = [];
let sliderItem = document.querySelectorAll('.pets__content-items');
fetch('../js/pets.json').then(res => res.json()).then(list => pets = list);
 


function popup(event) {
  document.querySelector("html").style.overflowY = 'hidden';
  
  let name = event.target.closest('.pets__content-items').getAttribute('data-modal');
  let i = pets.findIndex(elem => elem.name == name);
 
  document.body.insertAdjacentHTML('afterbegin', `
  <div class='darkScreen' id='darkScreen'>
    <div class="dark"></div>
    <div class="modal-box"> 
        <div class="modal-box_main">
            <div class="modal-box__pic">
              <img src="${pets[i].img}" alt="${pets[i].name}">
            </div>
            <div class="modal-box modal-description">
                <div class="modal-description__name">${pets[i].name}
                </div>
                <div class="modal-description__breed-type">
                    <span class="modal-description__type">${pets[i].type}</span> -
                    <span class="modal-description__breed">${pets[i].breed}</span>
                </div>
                <div class="modal-description__description">${pets[i].description}
                </div>
                <div class="modal-description__list">
                    <ul>
                    <li modal-description__list_item><b>Age:</b> ${pets[i].age}</li>
                    <li modal-description__list_item><b>Inoculations:</b> ${pets[i].inoculations}</li>
                    <li modal-description__list_item><b>Diseases:</b> ${pets[i].diseases}</li>
                    <li modal-description__list_item><b>Parasites:</b> ${pets[i].parasites}</li>
                    </ul>
                </div>  
            </div>                          
        </div>
        <button class="modal-box_button">
            <img src="../../assets/vector.png" alt="Close">
        </button>
        
    </div>
</div>
  `);

  const darkScreen = document.querySelector('.darkScreen')
  darkScreen.style.top = window.pageYOffset + 'px'; 
  darkScreen.classList.add('animate__animated');
  darkScreen.classList.add('animate__fadeIn');

  document.querySelectorAll('.dark, .modal-box_button')
  .forEach(elem => elem.addEventListener('click', () => {
    document.querySelector("html").style.overflowY = '';    
    darkScreen.remove();
  }));
}

