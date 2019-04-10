(function() {
  if (document.location.hash) {
    setTimeout(function() {
      window.scrollTo(window.scrollX, window.scrollY - 100);
    }, 10);
  }
})();

window.onload = function () {

  window.addEventListener("resize", function() {
    if (window.innerWidth < 780) {
      document.getElementById('navbar').style.position = 'relative';
    } else {
      document.getElementById('navbar').style.position = 'fixed';
    }
  });

    if (window.innerWidth < 780) {
      document.getElementById('navbar').style.position = 'relative';
    } else {
      document.getElementById('navbar').style.position = 'fixed';
    }

  //Change on load navbar to fixed if Y lower than 90px
  scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  let logo = document.getElementById('logo');
  let navbar = document.getElementById('navbar-menu');
  let container = document.getElementById('container');
  if(scrollTop > 90 && window.innerWidth >780){
    //Logo
    logo.classList.remove('logo');
    logo.classList.add('logo-fixed');
    //Navbar
    navbar.classList.remove('navbar-menu');
    navbar.classList.add('navbar-menu-fixed')
    //Container
    container.classList.remove('container');
    container.classList.add('container-fixed');
  }else{
    logo.classList.remove('logo-fixed');
    logo.classList.add('logo');
    //Navbar
    navbar.classList.remove('navbar-menu-fixed');
    navbar.classList.add('navbar-menu');
    //Container
    container.classList.remove('container-fixed');
    container.classList.add('container');
  }



  //Scroll Y -90px change navbar to fixed
  window.addEventListener("scroll", function(){
    scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

    let logo = document.getElementById('logo');
    let navbar = document.getElementById('navbar-menu');
    let container = document.getElementById('container');
    if(scrollTop > 90 && window.innerWidth >780){
      //Logo

      logo.classList.remove('logo');
      logo.classList.add('logo-fixed');
      //Navbar

      navbar.classList.remove('navbar-menu');
      navbar.classList.add('navbar-menu-fixed')
      //Container

      container.classList.remove('container');
      container.classList.add('container-fixed');
    }else{



      logo.classList.remove('logo-fixed');
      logo.classList.add('logo');
      //Navbar
      navbar.classList.remove('navbar-menu-fixed');
      navbar.classList.add('navbar-menu');
      //Container
      container.classList.remove('container-fixed');
      container.classList.add('container');
    }

  }, false)





}
