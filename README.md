# Searchcut
Quicksearch add-on for Firefox.

This add-on provides the ability to search using predefined (or user-defined) search engines by using assigned shortcuts in the url bar. 

For example, typing *g mysearchterm* will search for 'mysearchterm' on google. 

The following shortcuts are defined by default:

* d -> DuckDuckGo (https://duckduckgo.com/?q=%q)
* g -> Google (https://www.google.com/search?q=%q)
* i -> Google Images (https://www.google.com/images?q=%q)
* m -> Google Maps (https://maps.google.com/maps?q=%q)
* gt -> Google Translate (https://translate.google.com/#auto|en|%q)
* w -> Wikipedia (https://en.wikipedia.org/wiki/%q)
* y -> Youtube (https://www.youtube.com/results?search_query=%q)
* a -> Amazon.com (https://www.amazon.com/gp/search?keywords=%q)
* wt -> Weather.com (http://www.weather.com/search/enhancedlocalsearch?where=%q&loctypes=1/5/9/11/13/19/&from=hdr)
* imdb -> IMDB (http://www.imdb.com/find?s=all&q=%q)
* wa -> Wolfram Alpha (https://www.wolframalpha.com/input/?i=%q)

To define your own custom search pages or change the existing ones, go to the Addon Preferences (Tools->Add-ons->Searchcut->Preferences) and type the shortcut definition in the following format: *shortcut name, shortcut, urlPattern*. *%q* in the url pattern will be replaced with the search term.

This add-on recreates some of the behaviour of the great Instantfox add-on (http://www.instantfox.net/) which I've been using for quite a while. It intentionally leaves out some it its features like search suggestions, previews and the much better UI, but the code is simpler und some of the bugs which have been bugging me (character getting chopped off at the end of queries) don't occur.

## Development notes

This add-on has been developed using the Firefox addon sdk (https://developer.mozilla.org/en-US/Add-ons/SDK). To use/extend the add-on, install the sdk, download the code and just run
* ```cfx run``` to test the add-on in a browser
* ```cfx test``` to run the tests
* ```cfx xpi``` to build the xpi which you can install in your browser