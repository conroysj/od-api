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

  requestData.min_price = requestData.min_price || 0;
  requestData.max_price = requestData.max_price || Number.POSITIVE_INFINITY;
  requestData.min_bed = requestData.min_bed || 0;
  requestData.max_bed = requestData.max_bed || Number.POSITIVE_INFINITY;
  requestData.min_bath = requestData.min_bath || 0;
  requestData.max_bath = requestData.max_bath || Number.POSITIVE_INFINITY;

  importListings((allListings) => {
    for (let i = 0; i < allListings.length; i++) {
      let listing = allListings[i];
      if (listing[3] >= requestData.min_price &&
          listing[3] <= requestData.max_price &&
          listing[4] >= requestData.min_bed &&
          listing[4] <= requestData.max_bed &&
          listing[5] >= requestData.min_bath &&
          listing[5] <= requestData.max_bath) {
        var requestedListing = {
          type: "Feature",
          geometry: {
            type: "point",
            coordinates: []
          },
          properties: {
            id: listing[0],
            price: listing[3],
            street: listing[1],
            bedrooms: listing[4],
            bathrooms: listing[5],
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


