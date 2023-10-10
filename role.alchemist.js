/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.alchemist');
 * mod.thing == 'a thing'; // true
 */

var roleAlchemist = {
    run: function (creep, order, tradeAmount, tradeCost) {
        //----set status----
        if (creep.memory.transporting && creep.store.getUsedCapacity() == 0) {
            creep.memory.transporting = false;
            creep.say('🔄 loot');
        }

        if (!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
            creep.memory.transporting = true;
            creep.say('🚚 transport');
        }

        var lab1 = Game.getObjectById(Memory.structures.lab1.id);
        var lab2 = Game.getObjectById(Memory.structures.lab2.id);
        var lab3 = Game.getObjectById(Memory.structures.lab3.id);
        var terminal1 = Game.getObjectById(Memory.structures.terminals['id0']);
        var storage1 = Game.getObjectById(Memory.structures.storages['id0']);


        //----trans----
        if (creep.memory.transporting) {
            for (var resourceType of Object.keys(creep.store)) {
                //----order exist----
                if (order && resourceType == order.resourceType && terminal1.store.getUsedCapacity(resourceType) < tradeAmount) {
                    var target = terminal1;
                    console.log('A>> to terminal: ' + target.id);
                }
                else {
                    //----fill labs----
                    if (resourceType == Memory.structures.lab1.resource && lab1.store.getFreeCapacity(resourceType) > 1000) {
                        var target = lab1;
                        console.log('A>> to lab1: ' + target.id);
                    }
                    else if (resourceType == Memory.structures.lab2.resource && lab2.store.getFreeCapacity(resourceType) > 1000) {
                        var target = lab2;
                        console.log('A>> to lab2: ' + target.id);
                    }
                    //----to storage----
                    else {
                        var target = storage1;
                        console.log('A>> to storage1: ' + target.id);
                    }
                }
                if (target.room != creep.room) {
                    creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 30, visualizePathStyle: { stroke: '#ffeb0b' } });
                } else if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { reusePath: creep.pos.findPathTo(target), visualizePathStyle: { stroke: '#ffeb0b' } });
                }
            }
        }
        //----loot----
        else {
            //----clear lab3----
            let mineralType = lab3.mineralType;
            if (mineralType) {
                var target = lab3;
                var targetResource = mineralType;
            }
            else {
                //----find resource from storages----
                let rooms = Game.rooms; // 获取所有房间
                for (let roomName in rooms) {
                    let storage = rooms[roomName].storage;
                    if (storage) {
                        for (let resourceType in storage.store) { // 遍历所有资源
                            if (resourceType == Memory.structures.lab1.resource && lab1.store.getUsedCapacity(resourceType) < 1000) {
                                var target = storage;
                                var targetResource = resourceType;
                            }
                            else if (resourceType == Memory.structures.lab2.resource && lab2.store.getUsedCapacity(resourceType) < 1000) {
                                var target = storage;
                                var targetResource = resourceType;
                            }
                            else if (order && resourceType == order.resourceType && terminal1.store.getUsedCapacity(order.resourceType) < tradeAmount) {
                                var target = storage;
                                var targetResource = resourceType;
                            }
                        }
                    }
                    // console.log(`在房间 ${roomName} 的 storage 中找到了 ${targetResource}`);
                }
            }
            if (target) {
                console.log('A>> from: ' + target.id + ' take: ' + targetResource);
                if (target.room != creep.room) {
                    creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 30, visualizePathStyle: { stroke: '#ffeb0b' } });
                } else if (creep.withdraw(target, targetResource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { reusePath: 3, visualizePathStyle: { stroke: '#ffeb0b' } });
                }
            }
            else if (creep.store.getUsedCapacity() > 0) { //----没得捡了就存掉----
                creep.memory.transporting = true;
            }
        }
    }
};

module.exports = roleAlchemist;