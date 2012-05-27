/* Library created using modifications of examples on http://www.bingmapsportal.com/isdk/ajaxv7

	Variables to set in calling document:

	maps_key: The Bing API Map Key http://msdn.microsoft.com/en-us/library/ff428642.aspx
	start_lat: The starting latitude for the initial map.
	start_lon: The starting longitude for the initial map.
	start_zoom: The initial zoom level of the map.
	map_element: The DOM ID of a <div> where the map will be loaded.
	system_width: The width of the map in PX.
	system_height: The height of the map in PX.
*/

function findLocation()
{
	query= $("#locQuery").val();
	map.getCredentials(callSearchService);
}

function searchServiceCallback(result)
{
	if (result &&
		result.resourceSets &&
		result.resourceSets.length > 0 &&
		result.resourceSets[0].resources &&
		result.resourceSets[0].resources.length > 0) 
	{

		var bbox = result.resourceSets[0].resources[0].bbox;
		var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(bbox[0], bbox[1]), new Microsoft.Maps.Location(bbox[2], bbox[3]));

		map.setView({ bounds: viewBoundaries});

		var location = new Microsoft.Maps.Location(result.resourceSets[0].resources[0].point.coordinates[0], result.resourceSets[0].resources[0].point.coordinates[1]);

		var pushpin = new Microsoft.Maps.Pushpin(location);

		map.entities.push(pushpin);
	} else {
		if (typeof (response) == 'undefined' || response == null)
		{
			alert("Invalid credentials or no response");
		} else {
			alert("No results for the query");
		}
	}
} 
	  
function callSearchService(credentials) 
{
	var searchRequest = 'http://dev.virtualearth.net/REST/v1/Locations/' + query + '?output=json&jsonp=searchServiceCallback&key=' + credentials;
	var mapscript = document.createElement('script'); 
	mapscript.type = 'text/javascript'; 
	mapscript.src = searchRequest; 
	document.getElementById('myMap').appendChild(mapscript) 
}



function getMap()
{
	map = new Microsoft.Maps.Map(document.getElementById(map_element), {credentials: maps_key, center: new Microsoft.Maps.Location(start_lat, start_lon), mapTypeId: Microsoft.Maps.MapTypeId.birdseye, width: system_width, height: system_height, zoom: start_zoom});
}