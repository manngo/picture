/*	pictyre Polyfill
	================================================

	Simple polyfill to implement <picture> element
	in other browsers.

	Usage

		<script type="text/javascript" src="scripts/picture.js"></script>

	HTML:

		<picture>
			<source srcset=".." media=".." >
			<source srcset=".." media=".." >
			<source srcset=".." media=".." >
			<img src="…" alt="…" data-src="…">
		</picture>

	Note the data-src attribute. This is a fall back
	for older browsers. This allows a preferred src
	to be loaded without interfering with the syntax.

	================================================ */

	'use strict';

	(function() {
		//	Test whether needed
			//var picture=document.createElement('picture');
			if(window.HTMLPictureElement) return;
			//alert(picture instanceof HTMLUnknownElement);

		if(document.addEventListener)
			document.addEventListener("DOMContentLoaded",init,false);
		else document.attachEvent("onreadystatechange", init) ;

		function init() {
			//	Test for matchMedia
				if(!window.matchMedia) {
					var images=document.querySelectorAll('img[data-src]');
					if(images) {
						for(var i=0;i<images.length;i++)
							images[i].src=images[i].getAttribute('data-src');
					}
					return;
				}

			var pictures=document.querySelectorAll('picture');
			for(var i=0;i<pictures.length;i++) pictures[i].src=pictures[i].querySelector('img').src;

			window.addEventListener('resize', replaceImages, false);
			replaceImages();

			function replaceImages() {
				function replaceImage(picture) {
					var img=picture.querySelector('img');
					var sources=picture.querySelectorAll('source');

					for(var j=0;j<sources.length;j++) {
						var media=sources[j].getAttribute('media') || '';
						var srcset=sources[j].getAttribute('srcset');
						if(window.matchMedia(media).matches) {
							img.src=srcset;
							return;
						}
						img.src=picture.src;
					}
				}

				for(var i=0;i<pictures.length;i++) {
					replaceImage(pictures[i]);
				}
			}
		}
	})();
