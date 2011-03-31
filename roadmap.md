Changelog
=========
As the forking & merging of SnipR & SnipR Mobile has been streamlined into one **SnipR** repository, it took some reworking in versioning convention. Now featurewise, SnipR 1.x.0 = SnipR Mobile 1.x.5 upto version 1.2.5.

v1.2.0 - v1.5.0
---------------
*	SnipR & SnipR Mobile has been seamlessly put into a single repo & can use the same binary/package.
*   No more remote JS calls from chrome:// privilege, (logical) security issue fixed.
*   Fetches optional contents from the web, so lighter download package.
*   Further minimizes resource footprint & has gone faster.
*   GitHub homepage & bug-tracker; developing wiki pages.

v1.1.0 - v1.2.0
---------------
*	XmlHttpRequest has been changed from synchronous to asynchronous to avoid (theoritically-) accidental UI freeze.
*	Google Maps default Zoom level has been increased to level 10.

v1.0.0 - v1.1.0
---------------
*	SnipR is now split into "SnipR" & "SnipR Mobile", dedicated for Firefox & Fennec respectively.
*	Code is now slim-gym-trimmed; no fat, no hair. Reduced from 54KiB to less than 10KiB per package.
*	Backward Compatibility with Firefox 3.6 (So, now from Firefox 3.6 to Firefox 4.0b10pre is supported).
*	Information section is re-worked to give progress details, see it for yourself.
*	The Logo is recreated & repositioned, to make the entire appearance a lot cooler.


Roadmap
=======
Personally I don't really think of any more features that has to be integrated.

May you have any, please report them as [features/suggestions/bugs](https://github.com/debloper/SnipR/issues "Issues Tracker").


Known Issues
============
I have got complains that the button is not prominent enough to be eye-catchy - some even said they failed to find it completely after installing. Odd to say, but it's made to be like this. It's meant to blend itself with Firefox's interface, and to be an integral part of it. In Fennec, I guess, there's less chance for it - I am also not very happy to put the icon on where it is - wish I knew any better place.

Also some people complained the absence of marker(pointer) on the map [Personally, I don't like the marker] - what do you think?
