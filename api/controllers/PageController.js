/**
 * GhostController
 *
 * @description :: Server-side logic for managing ghosts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'index': function (req, res) {
        Ghost.find().exec(function(err, ghosts) {
            res.view('landing',{
                ghosts: ghosts
            });
        });

    }
};

