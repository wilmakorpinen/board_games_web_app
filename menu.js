window.addEventListener('load',()=>{
  let menuOpen = false;
  let menuIcon = document.querySelector("svg.menuIcon")
  let menu = document.querySelector(".menu");
  let bars = menuIcon.querySelectorAll("rect");
  menuIcon.addEventListener('click', toggleMenu);

  function toggleMenu(){
    menuOpen = !menuOpen;
    bars[0].classList.toggle("rotateDown");
    bars[1].classList.toggle("fadeOut");
    bars[2].classList.toggle("rotateUp");
    menu.classList.toggle("hidden");
  }
    
    
  fetch('http://wilmakorpinen.com/wp00/wp-json/wp/v2/categories?per_page=10').then(e => e.json()).then(buildMenu)
    
    function buildMenu(data){
        let parentElement = document.querySelector('.menu ul')
        data.forEach(item =>{
            console.log(item);
            let li = document.createElement('li');
            let a = document.createElement('a');
            if(item.parent == 17){
            a.textContent = item.name;
            a.href = 'index.html?categories='+ item.id;
            
            li.appendChild(a);
            parentElement.appendChild(li);
                
                
                }
            
        })
    } 
});
    
    