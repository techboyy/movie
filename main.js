$(document).ready(function()
{
$('#searchform').on('submit',function(e)
{

	var search=$('#searchtext').val();
	getmovies(search);
e.preventDefault();
});
function getmovies(search)
{
	 axios.get('https://www.omdbapi.com?s='+ search+'&apikey=thewdb') 
	.then(function(response)
	{

  console.log(response);
  var movies=response.data.Search;
 var output='';
 $.each(movies,function(index,movie)
 {
output += `<div class="col-md-3">
<div class="well text-center">
<img src="${movie.Poster}">
<h5>${movie.Title}</h5>
<a onclick="movieSelect('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Detail</a>
</div>
</div>

`;
 });
$('#movies').html(output);
	})
	.catch(function(err)
	{
console.log(err);
	});


}
function movieSelect(id)
{
	  sessionStorage.setItem('movieId', id);
	window.location='movie.html';
	return false;
}
function getMovie()
{
	var movieId = sessionStorage.getItem('movieId');
	axios.get('https://www.omdbapi.com/?i='+ movieId +'&apikey=8461feb3')
	.then(function(response)
	{

  console.log(response);
  var movies=response.data;
  var output=`
  <div class="row">
  <div class="col-md-4">
  <img src="${movie.Poster}" class="thumbnail">
  </div>
  <div class="col-md-8">
  <h2>${movie.Title}</h2>
  <ul class="list-group">
  <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
    <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
      <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
        <li class="list-group-item"><strong>Actor:</strong>${movie.Actor}</li>
  </ul>
  </div>
  </div>

  `;
$('#movie').html(output);
	})
	.catch(function(err)
	{
console.log(err);
	});

}
});