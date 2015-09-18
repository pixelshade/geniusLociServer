/**
 * GhostController
 *
 * @description :: Server-side logic for managing ghosts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
//    'index': function (req, res) {
//        res.view('landing')
//    },


    'getNear': function (req, res) {
        Ghost.native(function (err, collection) {

                var lon = parseFloat(req.param('longitude',0));
                var lat = parseFloat(req.param('latitude',0));
                collection.geoNear(
                    lon,
                    lat,
                    {
                        spherical:true,
                        maxDistance: 5000,
                        limit: 3,
                        distanceMultiplier: 6378.1
                    },
                    function (mongoErr, docs) {
                        if (mongoErr) {
                            console.error(mongoErr);

                            res.send('geoProximity failed with error=' + mongoErr);
                        } else {
                            console.log('docs=', docs);
                            res.json(docs.results);
                        }
                    });


//            collection.find(
//              query.location = {
//                  $near : [ -73.9667, 40.78 ], $maxDistance: 90
//                $near: {
//                  $geometry: {
//                    type: "Point",
//                    coordinates: [
//                      req.param('longitude',0),
//                      req.param('latitude',0)
//                    ]
//                  }
//                  ,$maxDistance : 1000
//                }
//              }
//            ).toArray(function(err, result){
//                if(err) {
//                  console.log(err);
//                  return res.json(err);
//                }
//                else
//                  return res.json(result);
//              });
            }
        );
    },


    'findnearposition': function (req, res) {
//        ghost.find({"loc": SON([("$near", [3, 6]), ("$maxDistance", 100)])}).limit(3);
//          db.places.find({"loc": {"$within": {"$center": [[0, 0], 6]}}}):
    }
}
;

