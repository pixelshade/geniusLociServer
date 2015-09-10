/**
 * GhostController
 *
 * @description :: Server-side logic for managing ghosts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'getNear' : function (req, res) {
          Ghost.native(function(err, collection) {

            var query = {};

            collection.find(
              query.coordinates = {
                $near: {
                  $geometry: {
                    type: "Point",
                    coordinates: [
                      req.param('lon',0),
                      req.param('lat',0)
                    ]
                  },
                  $maxDistance : 1000
                }
              }
            ).toArray(function(err, result){
                if(err) {
                  console.log(err);
                  return res.json(err);
                }
                else

                  return res.json(result);
              });
          });
    },
    'findnearposition': function(req, res){
//        ghost.find({"loc": SON([("$near", [3, 6]), ("$maxDistance", 100)])}).limit(3);
//          db.places.find({"loc": {"$within": {"$center": [[0, 0], 6]}}}):
    }
};

