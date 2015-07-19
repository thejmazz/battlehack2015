# Battlehack

## API Usage

To get a screen of a webpage:

```
GET /api/screen?url=http://google.com
```

## commands: 

- **help** - return this list of available commands
- **rss _feedurl_** - retreive a selectable list of articles from an RSS feed
- **read _url_** - searches for feed from _url_ and return a list of stories
- **ss** - return a screenshot of the current page as MMS
- **ss _url_** - return a screenshot of _url_ as MMS
- **google _query_** - return a selctable list of search results for _query_
- **lucky _query_** - return the first google search result for _query_
