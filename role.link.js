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
        const range1 = link1.pos.getRangeTo(link2);
        if (link1.store[RESOURCE_ENERGY] >= range1 * 10 && link2.store.getFreeCapacity(RESOURCE_ENERGY) >= range1 * 10) {
            link1.transferEnergy(link2);
        }
        //----W1N27----
        let linkb1 = Game.getObjectById('6521fb1a11986b19ab27b052');
        let linkb2 = Game.getObjectById('65376704c6ed5f491c664414');
        const rangeb1 = linkb1.pos.getRangeTo(linkb2);
        if (linkb1.store[RESOURCE_ENERGY] >= rangeb1 * 10 && linkb2.store.getFreeCapacity(RESOURCE_ENERGY) >= rangeb1 * 10) {
            linkb1.transferEnergy(linkb2);
        }
        //----W4N28----
        let linkc1 = Game.getObjectById('653378d4e834a8635f892808');
        let linkc2 = Game.getObjectById('6533a1a7e207c41ca2476de1');
        let linkc3 = Game.getObjectById('656aaad89f7ae05220696f11');
        let linkc4 = Game.getObjectById('659bfd2e89e66e10e66c1baf');
        const rangec1 = linkc1.pos.getRangeTo(linkc2);
        const rangec2 = linkc3.pos.getRangeTo(linkc4);
        const rangec3 = linkc3.pos.getRangeTo(linkc2);
        if (linkc1.store[RESOURCE_ENERGY] >= rangec1 * 10 && linkc2.store.getFreeCapacity(RESOURCE_ENERGY) >= rangec1 * 10) {
            linkc1.transferEnergy(linkc2);
        }
        if (linkc3.store[RESOURCE_ENERGY] >= rangec2 * 10 && linkc4.store.getFreeCapacity(RESOURCE_ENERGY) >= rangec2 * 10) {
            linkc3.transferEnergy(linkc4);
        }
        else if (linkc3.store[RESOURCE_ENERGY] >= rangec3 * 10 && linkc2.store.getFreeCapacity(RESOURCE_ENERGY) >= rangec3 * 10) {
            linkc3.transferEnergy(linkc2);
        }
        if (linkc4.store[RESOURCE_ENERGY] >= 700 && linkc2.store[RESOURCE_ENERGY] <= 100) {
            linkc4.transferEnergy(linkc2);
        }
        //----W6N29----
        let linkd1 = Game.getObjectById('6594c2b0c972c97f0d9efa2d');
        let linkd2 = Game.getObjectById('6594c821e6e76179c5165501');
        let linkd3 = Game.getObjectById('65b032f63e55f246fa217815');
        const ranged1 = linkd1.pos.getRangeTo(linkd2);
        const ranged2 = linkd1.pos.getRangeTo(linkd3);
        if (linkd1.store[RESOURCE_ENERGY] >= ranged1 * 10 && linkd2.store.getFreeCapacity(RESOURCE_ENERGY) >= ranged1 * 10) {
            linkd1.transferEnergy(linkd2);
        }
        else if (linkd1.store[RESOURCE_ENERGY] >= ranged2 * 10 && linkd3.store.getFreeCapacity(RESOURCE_ENERGY) >= ranged2 * 10) {
            linkd1.transferEnergy(linkd3);
        }
        //----W3N28----
        let linke1 = Game.getObjectById('656552935839c258adffb13d');
        let linke2 = Game.getObjectById('65656d8c0d2d8d1e9c17b654');
        let linke3 = Game.getObjectById('65afd40ae083dbfadeb1af3f');
        const rangee1 = linke1.pos.getRangeTo(linke2);
        const rangee2 = linke1.pos.getRangeTo(linke3);
        if (linke1.store[RESOURCE_ENERGY] >= rangee1 * 10 && linke2.store.getFreeCapacity(RESOURCE_ENERGY) >= rangee1 * 10) {
            linke1.transferEnergy(linke2);
        }
        else if (linke1.store[RESOURCE_ENERGY] >= rangee2 * 10 && linke3.store.getFreeCapacity(RESOURCE_ENERGY) >= rangee2 * 10) {
            linke1.transferEnergy(linke3);
        }
        //----W6N28----
        let linkf1 = Game.getObjectById('657fe3abbb64a2793f042eee');
        let linkf2 = Game.getObjectById('657fac00068fdda2d195af5d');
        let linkf3 = Game.getObjectById('65867944151f1cd3f5c53bd8');
        const rangef1 = linkf1.pos.getRangeTo(linkf2);
        const rangef2 = linkf3.pos.getRangeTo(linkf2);
        if (linkf1.store[RESOURCE_ENERGY] >= rangef1 * 10 && linkf2.store.getFreeCapacity(RESOURCE_ENERGY) >= rangef1 * 10) {
            linkf1.transferEnergy(linkf2);
        }
        else if (linkf3.store[RESOURCE_ENERGY] >= rangef2 * 10 && linkf2.store.getFreeCapacity(RESOURCE_ENERGY) >= rangef2 * 10) {
            linkf3.transferEnergy(linkf2);
        }
        //----W4N29----
        let linkg1 = Game.getObjectById('659f7c09b72bfe267d3c53a3');
        let linkg2 = Game.getObjectById('659f840ba0f6cf4bdbee251f');
        const rangeg1 = linkg1.pos.getRangeTo(linkg2);
        if (linkg1.store[RESOURCE_ENERGY] >= rangeg1 * 10 && linkg2.store.getFreeCapacity(RESOURCE_ENERGY) >= rangeg1 * 10) {
            linkg1.transferEnergy(linkg2);
        }
    }
}

module.exports = roleLink;