let urlParams = new URLSearchParams(window.location.search);

let id =urlParams.get('id');
console.log('I want to get to article '+ id);

fetch('http://wilmakorpinen.com/wp00/wp-json/wp/v2/board_games?_embed/'+id).then(e =>e.json).then(showSinglePost);

function showSinglePost(aPost){
    console.log(aPost);
    document.querySelector('#singleBoardgame h1').textContent = aPost.title.rendered;
    
    // show carsection
    document.querySelector('#singleBoardgame').classList.add('slideInBoardgame')
}
