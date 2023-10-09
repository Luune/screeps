/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function (creep, roomName) {
        if (creep.room.name != roomName) {
            creep.moveTo(new RoomPosition(25, 25, roomName), {reusePath: 20});
        } else {
            var controller = Game.rooms[roomName].controller;
            if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {reusePath: 20});
            }
            if(creep.signController(creep.room.controller, "newbie farmer") == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
}

module.exports = roleClaimer;