var request = require('request');
var rp = require('request-promise-native');
var Product = require('../models/Product.js');

var AffilinetPublisherId = '821350';
var AffilinetPassword = '9j3msjLqmyVvXns5tKZ7';


function AddAffilinetListing(product, listing){

  function getImages(){
    var Images = [];
    listing.Images.forEach(function(i){
      i.forEach(function(ri){
        Images.push(ri.URL);
      });
    });
    return Images;
  }

  function getLogos(){
    var Logos = [];
    listing.Logos.forEach(function(l){
        Logos.push(l.URL);
    });
    return Logos;
  }

  var pricePatt = /\d*[.]\d{2}/;

  var data = {
    AffiliateProgram: 'Affilinet',
    AffiliateProgramProductId: listing.ProductId,
    Title: listing.ProductName,
    Description: listing.Description,
    DescriptionShort: listing.DescriptionShort,
    Deeplink: listing.Deeplink1,
    Images: getImages(),
    DisplayPrice: listing.PriceInformation.DisplayPrice,
    DisplayShipping: listing.PriceInformation.DisplayShipping,
    Price: Number(pricePatt.exec(listing.PriceInformation.DisplayPrice)),
    Shipping: Number(pricePatt.exec(listing.PriceInformation.DisplayShipping)),
    Brand: listing.Brand,
    Logos: getLogos()
  }

  //Find existing Lsiting and make new one if none exists
    var existingListingId = product.Listings.findIndex(function(l){
      return l.AffiliateProgram === 'Affilinet' && l.AffiliateProgramProductId === listing.ProductId;
    });

    if(existingListingId > -1){
      product.Listings[existingListingId].set(data);
    } else {
      product.Listings.push(data).isNew;
      //Mark listing as news
    }

}

function addSimilarAffilinetProducts(product){

  var options = {
    uri: 'https://product-api.affili.net/V3/productservice.svc/JSON/SearchProducts',
    qs: {
        PublisherId: AffilinetPublisherId,
        Password: AffilinetPassword,
        ImageScales: 'OriginalImage',
        LogoScales: 'Logo468',
        fq: 'EAN:' + product.EAN,
        PageSize: 500
    }
  };

  return rp(options).then(function(body){

    body = JSON.parse(body.trim());

    body.Products.forEach(function(p){
      AddAffilinetListing(product, p);
    });

    return(product);
  });
}

function searchAffilinet(query){

  var options = {
    uri: 'https://product-api.affili.net/V3/productservice.svc/JSON/SearchProducts',
    qs: {
        PublisherId: AffilinetPublisherId,
        Password: AffilinetPassword,
        ImageScales: 'OriginalImage',
        LogoScales: 'Logo468',
        Query: query,
        PageSize: 20
    }
  };

  return rp(options).then(function(body){

    body = JSON.parse(body.trim());

    return Promise.all(body.Products.map(async (product) => {

      return Product.findOne({EAN: product.EAN}).then(function(existingProduct){

        if(existingProduct){
          AddAffilinetListing(existingProduct, product);
          return addSimilarAffilinetProducts(existingProduct);
        } else {
          return Product.create({EAN: product.EAN, Title: product.ProductName, Listings: []}).then(function(newProduct){
            AddAffilinetListing(newProduct, product);
            return addSimilarAffilinetProducts(newProduct);
          }).then(function(p){
            return p.save();
          });
        }
      });
    }));
  });

}

module.exports = function(app){

  app.get('/affilinet', function(req, res){


    searchAffilinet(req.query.query).then(function(products){
      res.send(products);
    }).catch(function(er){
      console.log(er);
      res.code(404);
      res.send('Internal server error');
    });

  });

};
