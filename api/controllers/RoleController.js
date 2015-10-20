// api/controllers/RoleController.js

var _ = require('lodash');
var _super = require('sails-permissions/api/controllers/RoleController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
    'init': function(res, req){
        Promise.all([
        PermissionService.grant({action: 'create', model: 'ghost', role: 'registered'}),
        PermissionService.grant({action: 'read', model: 'ghost', role: 'registered'}),
        PermissionService.grant({action: 'update', model: 'ghost', role: 'registered', relation: 'owner'}),
        PermissionService.grant({action: 'delete', model: 'ghost', role: 'registered', relation: 'owner'}),

        // , criteria: {blacklist: ['category']} tymto sa da zablokovat editovat niektore fieldy, ked je to v update
            PermissionService.createRole({ name: 'moderator', permissions: [{action: 'delete', model: 'ghost' },
                                                                            {action: 'update', model: 'ghost' }] })

        ]).then(function(value) {
            console.log(value);
            res.json({result: value});
        }, function(reason) {
            console.log(reason)
            res.json({result: reason});
        });


//            then(function (createGhostReg, readGhostReg, updateGhostReg, deleteGhostReg, deleteGhostMod){
//            sails.log('new create Ghost permission', createGhostReg);
//            sails.log('new read Ghost permission', readGhostReg);
//            sails.log('new update Ghost permission', updateGhostReg);
//            sails.log('new delete Ghost permission', deleteGhostReg);
//            sails.log('new delete Ghost permission', deleteGhostMod);
//
//
//
//            res.json({result: 'done'});
//        });
    }
});
