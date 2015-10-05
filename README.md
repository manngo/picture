`picture` Polyfill
==================

[Sample File](https://manngo.github.io/picture/sample/picture.html)

[Download Latest](https://github.com/manngo/picture/releases/download/1.0/picture.js)

About
-----

Simple polyfill for HTML `<picture>` Element

This enables the `<picture>` element for those modern browsers which don’t yet support it.

In principal, the `<picture>` element looks like this:

```html
<picture>
	<source srcset=".." media=".." >
	<source srcset=".." media=".." >
	<source srcset=".." media=".." >
	<img src="…" alt="…" [data-src="…"]>
</picture>
```

Note: the `data-src` attribute is non-standard; see below.

By default the browser will load the image as is, but, if `picture` is supported, it will replace the `src` with one which matches the `media` type.

It would be normal to default to an image suited to a small screen, and let the alternative `source` elements replace that with a more suitable one.

Browser Support
---------------

This requires `matchMedia()` which is only available on modern browsers. That’s OK, since older browsers are not normally found on mobile devices.

However, if you default to a smaller image, then the unsupporting desktop browsers will end up with an unsuitable version. For that reason, you can include the optional `data-src` attribute, which will be used in the case when neither neither the native `<picture>` element nor the JavaScript `matchMedia()` are supported.

```html
	<img src="…" alt="…" data-src="…">
```

Browsers which fall in this category are general IE<=9.

Usage
-----

The function attaches and runs itself, so all you need to do is include it in your HTML:

```html
<script type="text/javascript" src="scripts/picture.js"></script>
```

After that, just add a `<picture>` element:

```html
<picture>
	<source srcset=".." media=".." >
	<source srcset=".." media=".." >
	<source srcset=".." media=".." >
	<img src="…" alt="…" [data-src="…"]>
</picture>
```

- The default image is the `<img>` element
- The alternative image sources are one or more `<source>` elements
- For each `<source>` element, include the alternative `srcset` which is will be the replacement `src` for the image
- For each `<source>` element, include the `media` which is a CSS-style media query statement; for example `(min-width: 400px)`
- You may include the non-standard `data-src` attribute for non-supporting browsers; this is the image you want to use for the desktop version

Limitations
-----------

- The `srcset` only accepts a single image source.
- Only the `media` attribute is supported, not `type`.

