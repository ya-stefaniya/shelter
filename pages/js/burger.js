const burger = document.querySelector('.burger-menu'),
    menuNav= document.querySelector('.menu'),
    headerActiveMenu = document.querySelector('.main');
    htmloff = document.querySelector("html");
let isRotated = false;

const toggleMenu = function() {
  menuNav.classList.toggle('active');
  menuNav.classList.toggle('animate__animated');
  menuNav.classList.add('animate__fadeInRight');
  burger.classList.toggle('active');
  headerActiveMenu.classList.toggle('active-menu');
  
}
burger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
    isRotated = !isRotated;
    isRotated ? 
    document.querySelector("html").style.overflow = 'hidden':
    document.querySelector("html").style.overflowY = ''; 
});
document.addEventListener('click', function(e) {
    const target = e.target;
    const its_menu = target == menuNav || menuNav.contains(target);
    const its_btnMenu = target == burger;
  
    const menu_is_active = menuNav.classList.contains('active');
    if (!its_menu && !its_btnMenu && menu_is_active  ) {
        toggleMenu();
    }
});
 