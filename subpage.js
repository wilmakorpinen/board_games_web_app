let urlParams = new URLSearchParams(window.location.search);

let id =urlParams.get('id');
console.log('I want to get to article '+ id);

fetch('http://wilmakorpinen.com/wp00/wp-json/wp/v2/board_games/'+id+'?_embed').then(e => e.json()).then(showSinglePost);
function showSinglePost(aPost){
    console.log(aPost);
    document.querySelector('#singleBoardgame h1').textContent = aPost.title.rendered;
    
   document.querySelector("img").setAttribute("src", aPost._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
    document.querySelector('#singleBoardgame .genre').textContent = 'genre: ' + aPost.acf.genre;
    document.querySelector('#singleBoardgame span').textContent = 'price: ' + aPost.acf.price;
    document.querySelector('#singleBoardgame .date').textContent = 'data: ' + aPost.acf.data;
    document.querySelector('#singleBoardgame .location').textContent = 'location: '+ aPost.acf.location;
    document.querySelector('#singleBoardgame .descript').innerHTML = 'description: ' + aPost.content.rendered;
}
