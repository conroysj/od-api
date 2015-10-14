import fs from 'fs';
import parse from 'csv-parse';
import path from 'path';

function importListings (cb){
  let listings;

  const stream = fs.createReadStream(path.join(__dirname, '../../assets/listings.csv'));

  stream.on('data', chunk => {
    listings += chunk;
  });

  stream.on('error', err => {
    console.error('stack err: ' + err.stack);
  });

  stream.on('end', () => {
    parse(listings, {trim: 'true'}, (err, output) => {
      if (err) throw (err);
      else cb(output);
    });
  });
}

export function getListings(requestData, cb){

  let results = {
    type: "FeatureCollection",
    features: []
  };

  // Server-side form validation
  for (let datum in requestData) {
    if (!Number.isInteger(parseInt(requestData[datum], 10))) {
      requestData[datum] = '';
    }
  };

  // Addresses optional query parameters
  ((data) => {
    for (let datum of data) {
      requestData[datum] = parseInt(requestData[datum]) || 0;
    }
  })(['min_price', 'min_bed', 'min_bath']);

    ((data) => {
    for (let datum of data) {
      requestData[datum] = parseInt(requestData[datum]) || Number.POSITIVE_INFINITY;
    }
  })(['max_price', 'max_bed', 'max_bath']);

  // Filter accroding to request parameters

  importListings((allListings) => {
    for (let i = 0; i < allListings.length; i++) {

      let listing = allListings[i], listingPrice = listing[3], listingBed = listing[4], listingBath = listing[5];

      if (listingPrice >= requestData.min_price &&
          listingPrice <= requestData.max_price &&
          listingBed >= requestData.min_bed &&
          listingBed <= requestData.max_bed &&
          listingBath >= requestData.min_bath &&
          listingBath <= requestData.max_bath) {

        var requestedListing = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: []
          },
          properties: {
            id: listing[0],
            price: listingPrice,
            street: listing[1],
            bedrooms: listingBed,
            bathrooms: listingBath,
            sq_ft: listing[6]
          }
        };
        requestedListing.geometry.coordinates.push(listing[7], listing[8]);
        results.features.push(requestedListing);
      }
    }
    cb(results);
  });
}


