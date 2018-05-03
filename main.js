let template = document.querySelector("#boardtemp").content;
let musiclist = document.querySelector("#boardgamelist");
let page = 1;
let lookingForData = false;

document.querySelector('.image-header').onclick = function (){
    location.href = "index.html"; // add a new link from server
}

function fetchBoardgame(){
  lookingForData=true;
    
    let urlParams = new URLSearchParams(window.location.search);

    let catid =urlParams.get('categories');
    let endpoint = 'http://wilmakorpinen.com/wp00/wp-json/wp/v2/board_games?_embed&per_page=2&page='+page;
    if(catid){ // DRY
     endpoint = "http://wilmakorpinen.com/wp00/wp-json/wp/v2/board_games?_embed&per_page=2&page="+page+'&categories='+ catid;
    }
    fetch(endpoint)
    .then(e => e.json())
    .then(showBoardgame);
}

function showBoardgame(data){
  console.log(data)
  lookingForData=false;
  data.forEach(showSingleBoardgame);
}

function showSingleBoardgame(aBoardgame){
  let clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = aBoardgame.title.rendered;
  clone.querySelector(".price span").textContent=aBoardgame.acf.price;
    
    
    clone.querySelector(".weekday").textContent = aBoardgame.acf.weekday;

    let month = aBoardgame.acf.data.substring(0, 2);
    var day = aBoardgame.acf.data.substring(2, 4);
    var year = aBoardgame.acf.data.substring(4, 8);

clone.querySelector(".date").textContent = month + "" + day + "" + year;

  if(aBoardgame._embedded["wp:featuredmedia"]){//img is there
     clone.querySelector("img").setAttribute("src", aBoardgame._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  } else { // no img
      clone.querySelector("img").remove()
  }

  clone.querySelector('.readmore').href = 'subpages.html?id=' + aBoardgame.id;

  boardgamelist.appendChild(clone);
}
fetchBoardgame();


//found this stuff online
setInterval(function(){

  if(bottomVisible() && lookingForData===false){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchBoardgame();
  }
}, 1000)

function bottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight
  return bottomOfPage || pageHeight < visible
}