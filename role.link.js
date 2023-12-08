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
        let link1 = Game.getObjectById('650d9b1ee851c93a8cd7f1b4');
        let link2 = Game.getObjectById('650da9af3bfac34617fd5fbb');
        let link3 = Game.getObjectById('65290b5e72ae07cb844563a1');
        let range1 = link1.pos.getRangeTo(link2);
        let range2 = link1.pos.getRangeTo(link3);
        if (link1.store[RESOURCE_ENERGY] >= range1*10 && link2.store.getFreeCapacity(RESOURCE_ENERGY) > range1*10) {
            link1.transferEnergy(link2);
        }
        else if (link1.store[RESOURCE_ENERGY] >= range2*10 && link3.store.getFreeCapacity(RESOURCE_ENERGY) > range2*10) {
            link1.transferEnergy(link3);
        }
        //----W1N27----
        let linkb1 = Game.getObjectById('6521fb1a11986b19ab27b052');
        let linkb2 = Game.getObjectById('65376704c6ed5f491c664414');
        let rangeb1 = linkb1.pos.getRangeTo(linkb2);
        if (linkb1.store[RESOURCE_ENERGY] >= rangeb1*10 && linkb2.store.getFreeCapacity(RESOURCE_ENERGY) > rangeb1*10) {
            linkb1.transferEnergy(linkb2);
        }
        //----W4N28----
        let linkc1 = Game.getObjectById('653378d4e834a8635f892808');
        let linkc2 = Game.getObjectById('6533a1a7e207c41ca2476de1');
        let rangec1 = linkc1.pos.getRangeTo(linkc2);
        if (linkc1.store[RESOURCE_ENERGY] >= rangec1*10 && linkc2.store.getFreeCapacity(RESOURCE_ENERGY) > rangec1*10) {
            linkc1.transferEnergy(linkc2);
        }
        //----W5N28----
        let linkd1 = Game.getObjectById('6549998cce5f31cfe3c5f31a');
        let linkd2 = Game.getObjectById('655dd7bc57d7ea6af338fc75');
        let linkd3 = Game.getObjectById('654df541cbb618a55ddfb95c');
        let ranged1 = linkd1.pos.getRangeTo(linkd2);
        let ranged2 = linkd2.pos.getRangeTo(linkd3);
        if (linkd1.store[RESOURCE_ENERGY] >= ranged1*10 && linkd2.store.getFreeCapacity(RESOURCE_ENERGY) > ranged1*10) {
            linkd1.transferEnergy(linkd2);
        }
        else if (linkd2.store[RESOURCE_ENERGY] >= ranged2*10 && linkd3.store.getFreeCapacity(RESOURCE_ENERGY) > ranged2*10) {
            linkd2.transferEnergy(linkd3);
        }
        //----W3N28----
        let linke1 = Game.getObjectById('656552935839c258adffb13d');
        let linke2 = Game.getObjectById('65656d8c0d2d8d1e9c17b654');
        let rangee1 = linke1.pos.getRangeTo(linke2);
        if (linke1.store[RESOURCE_ENERGY] >= rangee1*10 && linke2.store.getFreeCapacity(RESOURCE_ENERGY) > rangee1*10) {
            linke1.transferEnergy(linke2);
        }
    }
}

module.exports = roleLink;