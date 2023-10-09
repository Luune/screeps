/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.linker');
 * mod.thing == 'a thing'; // true
 */

var roleLink = {
    /** @param {link} link **/
    run: function () {
        var link1 = Game.getObjectById('650d9b1ee851c93a8cd7f1b4');
        var link2 = Game.getObjectById('650da9af3bfac34617fd5fbb');
        if (link1.store[RESOURCE_ENERGY] >= 400 && link2.store[RESOURCE_ENERGY] < 400) {
            link1.transferEnergy(link2);
        }
        var linkb1 = Game.getObjectById('6521fb1a11986b19ab27b052');
        var linkb2 = Game.getObjectById('652216c27d4de8480a748921');
        if (linkb1.store[RESOURCE_ENERGY] >= 400 && linkb2.store[RESOURCE_ENERGY] < 400) {
            linkb1.transferEnergy(linkb2);
        }
    }
}

module.exports = roleLink;