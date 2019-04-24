{
  "created_at": 1555728941107,
  "id": 2,
  "queries": [
    {
      "apiUrl": "http://localhost:3000/gql/",
      "headers": [
        {
          "key": "",
          "value": ""
        }
      ],
      "query": "{ hello }",
      "subscriptionUrl": "",
      "type": "window",
      "variables": "{}",
      "version": 1,
      "windowName": "Hello World"
    },
    {
      "apiUrl": "http://localhost:3000/gql/",
      "created_at": 1555943601389,
      "headers": [
        {
          "key": "",
          "value": ""
        }
      ],
      "id": "a74bd5ff-14fe-4676-9f97-d21f690048c0",
      "query": "{ bookmarks {title, url} }",
      "subscriptionUrl": "",
      "type": "window",
      "updated_at": 1555943601389,
      "variables": "{}",
      "version": 1,
      "windowName": "Bookmarks"
    },
    {
      "apiUrl": "http://localhost:3000/gql/",
      "created_at": 1556036328634,
      "headers": [
        {
          "key": "",
          "value": ""
        }
      ],
      "id": "4e16e412-f211-411c-8cb5-8b1120e83efa",
      "query": "{ tags }",
      "subscriptionUrl": "",
      "type": "window",
      "updated_at": 1556036328634,
      "variables": "{}",
      "version": 1,
      "windowName": "Tags"
    },
    {
      "apiUrl": "http://localhost:3000/gql/",
      "created_at": 1556113881496,
      "headers": [
        {
          "key": "",
          "value": ""
        }
      ],
      "id": "7c599348-9d63-4fd9-9602-704e818e68e8",
      "query": "mutation {\n  createBookmark(title:  \"Star Trek\", url:\"http://www.startrek.com\") {\n    title, url, tags\n  }\n}",
      "subscriptionUrl": "",
      "type": "window",
      "updated_at": 1556113881496,
      "variables": "{}",
      "version": 1,
      "windowName": "Mutation : Add Bookmark"
    }
  ],
  "title": "Mongo Node GQL",
  "type": "collection",
  "updated_at": 1556113881496,
  "version": 1
}
