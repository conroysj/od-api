# od-api

### Usage

Resource URL: `/listings`

Response format: GeoJSON

Parameters:
`min_price`: The minimum listing price in dollars.
`max_price`: The maximum listing price in dollars.
`min_bed`: The minimum number of bedrooms.
`max_bed`: The maximum number of bedrooms.
`min_bath`: The minimum number of bathrooms.
`max_bath`: The maximum number of bathrooms.

Example request:

`/listings?min_price=297000&max_price=300000&min_bed=3&max_bed=3&min_bath=2&max_bath=2`

Example result:

```
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [-112.1,33.4]},
      "properties": {
        "id": "123ABC", # CSV id
        "price": 200000, # Price in Dollars
        "street": "123 Walnut St",
        "bedrooms": 3, # Bedrooms
        "bathrooms": 2, # Bathrooms
        "sq_ft": 1500 # Square Footage
      }
    },
    ...
  ]
}
```

### Install

Pull down the repo, run `npm install`

And then `npm start`, or for development: `grunt serve`

For testing: `grunt test`

### TODOs

- Import CSV and parse it into an SQL database to allow for more efficient, faster queries of relational data.
- Expand test coverage.
- Build out 'OPTIONS' request routing to provide API information.
- Implement logging middleware.
