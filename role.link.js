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
        //----W2N27----
        var link1 = Game.getObjectById('650d9b1ee851c93a8cd7f1b4');
        var link2 = Game.getObjectById('650da9af3bfac34617fd5fbb');
        var link3 = Game.getObjectById('65290b5e72ae07cb844563a1');
        if (link1.store[RESOURCE_ENERGY] >= 200 && link2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
            link1.transferEnergy(link2);
        }
        else if (link1.store[RESOURCE_ENERGY] >= 200 && link3.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
            link1.transferEnergy(link3);
        }
        //----W1N27----
        var linkb1 = Game.getObjectById('6521fb1a11986b19ab27b052');
        var linkb2 = Game.getObjectById('65376704c6ed5f491c664414');
        if (linkb1.store[RESOURCE_ENERGY] >= 200 && linkb2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
            linkb1.transferEnergy(linkb2);
        }
        //----W4N28----
        var linkc1 = Game.getObjectById('653378d4e834a8635f892808');
        var linkc2 = Game.getObjectById('6533a1a7e207c41ca2476de1');
        if (linkc1.store[RESOURCE_ENERGY] >= 200 && linkc2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
            linkc1.transferEnergy(linkc2);
        }
        //----W5N28----
        var linkd1 = Game.getObjectById('6549998cce5f31cfe3c5f31a');
        var linkd2 = Game.getObjectById('6549c3d0dd5e82540ff210c3');
        if (linkd1.store[RESOURCE_ENERGY] >= 200 && linkd2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
            linkd1.transferEnergy(linkd2);
        }
    }
}

module.exports = roleLink;