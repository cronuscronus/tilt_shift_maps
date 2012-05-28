/* Library to interface the bing maps birds eye view with the pixastic image library */

function applyTiltEffect() {
	if (map.getImageryId() != "NativeBirdseye") {
		alert("Sorry, but it looks like your current area is not Native Birds Eye Mode. Tilt Shifter not available. Try another location or zoom in.");
	} else {
		$( "img" ).each(
			function( intIndex ) {
				/* Bing tile size is 256x256 */
				tiles_wide = (parseInt($(this).parent().css("width"))/256);
				tiles_heigh = (parseInt($(this).parent().css("height"))/256);
				bottom_row = ( (tiles_wide*tiles_heigh) - tiles_wide);
					
				if (intIndex < tiles_wide || intIndex >= bottom_row ) {
				$(this).pixastic("blurfast", {amount: blur_amount});
				}
			}
		);
	}
}