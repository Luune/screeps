/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep, roomName, enAvail, storageStorage, dismantleTargetId) {
        //----test cpu
                    // const startCpu = Game.cpu.getUsed();
        //----set status----
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            delete creep.memory.target;
            delete creep.memory.path;
            creep.say('🔄 装填');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 修建');
        }

        //----action----
        if (creep.room.name != creep.memory.loc) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), { reusePath: 20, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
        }
        else if (creep.memory.building) {
            //----create preserved construction site----
            // if (creep.room.find(FIND_STRUCTURES,{filter:(structure)=>{return structure.structureType==STRUCTURE_SPAWN}}).length == 0) {
            //     for (let flagName in Game.flags) {
            //         let flag = Game.flags[flagName];
            //         if (flag.name.includes('Spawn')) {
            //             let result = flag.pos.createConstructionSite(STRUCTURE_SPAWN, flag.name);
            //             if (result === OK) {
            //                 console.log('Construction site created at flag position');
            //                 flag.remove;
            //             } else {
            //                 console.log('Failed to create construction site');
            //             }
            //         }
            //     }
            // }
            //----build----
            var target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
            if (target) {
                delete creep.memory.path;
                delete creep.memory.target;
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    // creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
                    // creep.room.visual.line(creep.pos, target.pos, {color: '#0099ff', width:0.1, lineStyle: 'dotted'});
                    if (!creep.memory.path) {
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                    creep.moveByPath(creep.memory.path);
                    creep.say('🏗️️ 建造');
                    creep.room.visual.text('🚧', target.pos, { fontSize: 10 });
                    creep.room.visual.line(creep.pos, target.pos, { color: '#0099ff', width: 0.2, lineStyle: 'dotted', opacity: 0.8});
                    if (creep.memory.path.length > 0) {
                        // 获取creep的路线
                        let path = creep.memory.path;
                        // 获取下一步位置
                        // let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                        let nextStep = creep.room.getPositionAt(path[0].x,path[0].y);
                        // 在下一步位置查找所有对象
                        let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                        if (objects.length > 0) {
                            delete creep.memory.path;
                        }
                    }
                    else {
                        delete creep.memory.path;
                    }
                }
            }

            //----do some repair when free----
            else { //----fill tower----
                let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER)
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 300;
                    }
                });
                if (target) {
                    delete creep.memory.path;
                    delete creep.memory.target;
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
                        // creep.say('🚧 BtT');
                        // creep.room.visual.line(creep.pos, target.pos, {color: '#0099ff', width:0.1, lineStyle: 'dotted'});
                        if (!creep.memory.path) {
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        creep.moveByPath(creep.memory.path);
                        creep.say('🚧 填充防御塔');
                        creep.room.visual.text('⛽', target.pos, { fontSize: 10 });
                        creep.room.visual.line(creep.pos, target.pos, { color: '#0099ff', width: 0.2, lineStyle: 'dotted', opacity: 0.8 });
                        if (creep.memory.path.length > 0) {
                            // 获取creep的路线
                            let path = creep.memory.path;
                            // 获取下一步位置
                            // let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                            let nextStep = creep.room.getPositionAt(path[0].x,path[0].y);
                            // 在下一步位置查找所有对象
                            let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                            if (objects.length > 0) {
                                delete creep.memory.path;
                            }
                        }
                        else {
                            delete creep.memory.path;
                        }
                    }
                }
                else { //----fix----
                    if (!creep.memory.target) {
                        switch (Math.floor(storageStorage / 100000)) {
                            case 0:
                            case 1:
                                var fixHit = 300000;
                                break;
                            case 2:
                            case 3:
                                var fixHit = 1000000;
                                break;
                            case 4:
                                var fixHit = 2000000;
                                break;
                            case 5:
                                var fixHit = 5000000;
                                break;
                            case 6:
                                var fixHit = 10000000;
                                break;
                            case 7:
                                var fixHit = 50000000;
                                break;
                            case 8:
                                var fixHit = 100000000;
                                break;
                            case 9:
                            case 10:
                                var fixHit = 300000000;
                                break;
                            default:
                                var fixHit = 300000;
                                break;
                        }
                        let damagedStructures = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.hits < structure.hitsMax
                                    && structure.structureType != STRUCTURE_WALL
                                    && structure.structureType != STRUCTURE_RAMPART)
                                || (structure.hits < structure.hitsMax
                                    && (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
                                    && structure.hits < fixHit);
                            }
                        });
                        if (damagedStructures.length > 0) {
                            let sortedStructures = _.sortBy(damagedStructures, s => s.hits);
                            creep.memory.target = _.sortBy(sortedStructures, [s => creep.pos.getRangeTo(s), s => s.hits])[0].id;
                        }
                        delete creep.memory.path;
                    }
                    target = Game.getObjectById(creep.memory.target);
                    if (target && target.hits < target.hitsMax) {
                        creep.room.visual.text('🚧', target.pos, { fontSize: 10 });
                        let result = creep.repair(target);
                        if (result == ERR_NOT_IN_RANGE) {
                            if (!creep.memory.path) {
                                creep.memory.path = creep.pos.findPathTo(target);
                            }
                            creep.moveByPath(creep.memory.path);
                            creep.say('🛠️ 修理');
                            creep.room.visual.line(creep.pos, target.pos, { color: '#0099ff', width: 0.2, lineStyle: 'dotted', opacity: 0.8 });
                            if (creep.memory.path.length > 0) {
                                // 获取creep的路线
                                let path = creep.memory.path;
                                // 获取下一步位置
                                // let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                                let nextStep = creep.room.getPositionAt(path[0].x,path[0].y);
                                // 在下一步位置查找所有对象
                                let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                                if (objects.length > 0) {
                                    delete creep.memory.path;
                                }
                            }
                            else {
                                delete creep.memory.path;
                            }
                        }
                        else if (result == ERR_INVALID_TARGET || target.hits == target.hitsMax) {
                            delete creep.memory.target;
                            delete creep.memory.path;
                        }
                    }
                    else {
                        delete creep.memory.target;
                        delete creep.memory.path;
                    }
                }
            }
        }
        //----find energy----
        else {
            if (dismantleTargetId != '') {
                var target = Game.getObjectById(dismantleTargetId);
            }
            else {
                let hosTarget = Game.rooms[creep.memory.loc].find(FIND_HOSTILE_STRUCTURES);
                var target = creep.pos.findClosestByPath(hosTarget);
            }
            if (target && target.room.name == creep.memory.loc) {
                if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target) / 2, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
                }
            }
            else {
                //----pick drop----
                target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: (resource) => {
                        return (resource.resourceType == RESOURCE_ENERGY)
                            && (resource.amount > creep.pos.findPathTo(resource).length * 2);
                    }
                });
                if (target) {
                    // console.log('U>> loot: ' + target);
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        // creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
                        // creep.say('🚧E:' + target.amount);
                        if (!creep.memory.path) {
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        creep.moveByPath(creep.memory.path);
                        creep.say('🚧捡:' + target.amount);
                        creep.room.visual.text('🚧', target.pos, { fontSize: 10 });
                        creep.room.visual.line(creep.pos, target.pos, { color: '#0099ff', width: 0.1, lineStyle: 'dotted' });
                        if (creep.memory.path.length > 0) {
                            // 获取creep的路线
                            let path = creep.memory.path;
                            // 获取下一步位置
                            // let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                            let nextStep = creep.room.getPositionAt(path[0].x,path[0].y);
                            // 在下一步位置查找所有对象
                            let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                            if (objects.length > 0) {
                                delete creep.memory.path;
                            }
                        }
                        else {
                            delete creep.memory.path;
                        }
                    }
                }
                else {
                    //----pick from container----
                    let containers = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER
                                || structure.structureType == STRUCTURE_LINK
                            )
                                && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50;
                        }
                    });
                    if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] >= 300000) {
                        containers.push(creep.room.storage);
                    }
                    // containers =  _.sortBy(containers, s => creep.pos.getRangeTo(s));
                    if (containers.length > 0) {
                        let target = creep.pos.findClosestByRange(containers);
                        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            // creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
                            // creep.say('🚧C:' + target.pos.x + ',' + target.pos.y);
                            if (!creep.memory.path) {
                                creep.memory.path = creep.pos.findPathTo(target);
                            }
                            creep.moveByPath(creep.memory.path);
                            creep.say('🚧容器:' + target.pos.x + ',' + target.pos.y);
                            creep.room.visual.text('🚧', target.pos, { fontSize: 10 });
                            creep.room.visual.line(creep.pos, target.pos, { color: '#0099ff', width: 0.1, lineStyle: 'dotted' });
                            if (creep.memory.path.length > 0) {
                                // 获取creep的路线
                                let path = creep.memory.path;
                                // 获取下一步位置
                                // let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                                let nextStep = creep.room.getPositionAt(path[0].x,path[0].y);
                                // 在下一步位置查找所有对象
                                let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                                if (objects.length > 0) {
                                    delete creep.memory.path;
                                }
                            }
                            else {
                                delete creep.memory.path;
                            }
                        }
                    }
                    else {
                        //----pick from storage----
                        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store[RESOURCE_ENERGY] > 0;
                            }
                        });
                        if (target) {
                            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                // creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
                                // creep.say('🚧S:' + target.pos.x + ',' + target.pos.y);
                                if (!creep.memory.path) {
                                    creep.memory.path = creep.pos.findPathTo(target);
                                }
                                creep.moveByPath(creep.memory.path);
                                creep.say('🚧仓库:' + target.pos.x + ',' + target.pos.y);
                                creep.room.visual.text('🚧', target.pos, { fontSize: 10 });
                                creep.room.visual.line(creep.pos, target.pos, { color: '#0099ff', width: 0.1, lineStyle: 'dotted' });
                                if (creep.memory.path.length > 0) {
                                    // 获取creep的路线
                                    let path = creep.memory.path;
                                    // 获取下一步位置
                                    // let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                                    let nextStep = creep.room.getPositionAt(path[0].x,path[0].y);
                                    // 在下一步位置查找所有对象
                                    let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                                    if (objects.length > 0) {
                                        delete creep.memory.path;
                                    }
                                }
                                else {
                                    delete creep.memory.path;
                                }
                            }
                        }
                        else { //----harvest by self----
                            let target = creep.pos.findClosestByPath(FIND_SOURCES);
                            // console.log('🚧 B>> harvest: ' + target);
                            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                                // creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#0099ff', opacity: 0.8 } });
                                // creep.say('🚧B>harv');
                                if (!creep.memory.path) {
                                    creep.memory.path = creep.pos.findPathTo(target);
                                }
                                creep.moveByPath(creep.memory.path);
                                creep.say('🚧B>采集');
                                creep.room.visual.text('🚧', target.pos, { fontSize: 10 });
                                creep.room.visual.line(creep.pos, target.pos, { color: '#0099ff', width: 0.1, lineStyle: 'dotted' });
                                if (creep.memory.path.length > 0) {
                                    // 获取creep的路线
                                    let path = creep.memory.path;
                                    // 获取下一步位置
                                    // let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                                    let nextStep = creep.room.getPositionAt(path[0].x,path[0].y);
                                    // 在下一步位置查找所有对象
                                    let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                                    if (objects.length > 0) {
                                        delete creep.memory.path;
                                    }
                                }
                                else {
                                    delete creep.memory.path;
                                }
                            }
                        }
                    }
                }
            } //----dismantle temp disable
        }
        //----test cpu
                    // const elapsed = Game.cpu.getUsed() - startCpu;
                    // console.log('Creep has used '+elapsed+' CPU time');
    }
};

module.exports = roleBuilder;