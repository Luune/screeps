//api reference: https://screeps-cn.github.io/api/
var consData = require('cons.data');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var roleTransporter = require('role.transporter');
var roleClaimer = require('role.claimer');
var roleFighter = require('role.fighter');
var roleMiner = require('role.miner');
var roleAlchemist = require('role.alchemist');
var roleLink = require('role.link');
// var roleDoctor = require('role.doctor');
var roleMelee = require('role.melee');
var roleScout = require('role.scout');

module.exports.loop = function () {
    console.log('🔻~~~~~~~~~~~~~~~~~~~~~~Tick~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~🔻');
    //----setup memory: structures----
    consData.run();

    //----setup trade----
    // Game.market.deal('6536d07f9a89e1f679c46d5a', 00, 'W2N27');
    // Game.market.createOrder({ type: ORDER_SELL, resourceType: RESOURCE_UTRIUM_HYDRIDE, price: 100, totalAmount: 1000, roomName: "W2N27" });
    // Game.market.createOrder({ type: ORDER_BUY, resourceType: RESOURCE_HYDROGEN, price: 111, totalAmount: 1000, roomName: "W2N27" });
    // Game.rooms['W6N29'].terminal.send('energy', 7000, 'W4N28');


    var myRooms = [];
    var reserveRooms = [];
    var room1 = 'W2N27';
    myRooms.push(room1);
    var room2 = 'W1N27';
    myRooms.push(room2);
    var room3 = 'W4N28';
    myRooms.push(room3);
    var room4 = 'W6N29';
    myRooms.push(room4);
    var room5 = 'W3N28';
    myRooms.push(room5);
    var room6 = 'W6N28';
    myRooms.push(room6);
    var room7 = 'W4N29';
    myRooms.push(room7);
    // reserveRooms.push(room7);
    // console.log(myRooms.length);
    var dismantleTarget = ''; //----recycle some buildings for builder----


    delete Memory.rooms;
    //----room wide----
    for (let roomName of myRooms) {
        let thisRoom = Game.rooms[roomName];
        if (!thisRoom || !thisRoom.my) {
            Game.getObjectById('656f3b51638f798312eec0e3').observeRoom(roomName);
        }

        let roomLevel;
        let enAvail;
        if (thisRoom && thisRoom.controller.my) {
            roomLevel = thisRoom.controller.level;
            enAvail = thisRoom.energyAvailable;
        }
        //----count extensions storage----
        let extensionEnergy = 0;
        let extensions = thisRoom.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        // if (extensions.length > 0) {
        //     // var extensionCount = extensions.length;
        //     var extensionCapacity = extensions[0].store.getCapacity(RESOURCE_ENERGY);
        //     // console.log(`主>> Room ${roomName} has ${extensionCount} extensions.`);
        // }
        let extensionCapacity = EXTENSION_ENERGY_CAPACITY[roomLevel];
        for (let extension of extensions) {
            extensionEnergy += extension.store[RESOURCE_ENERGY];
        }
        //----show energy----
        let controllerProgress;
        let controllerProgressTotal;
        if (roomLevel == 8) {
            roomLevel = 'GCL:' + Game.gcl.level;
            controllerProgress = Math.round(Game.gcl.progress);
            controllerProgressTotal = Math.round(Game.gcl.progressTotal);
        }
        else {
            controllerProgress = thisRoom.controller.progress;
            controllerProgressTotal = thisRoom.controller.progressTotal;
        }
        console.log('🏰 主>>>>>>>>>> 房间: [' + roomName + '], 等级 ' + roomLevel + ', ' + controllerProgress + '/' + controllerProgressTotal + ' = ' + Math.round(controllerProgress * 100 / controllerProgressTotal) + '%, 孵化能量: ' + enAvail + ' <<<<<<<<<<🏰');

        //----storage of storage----
        let storage = thisRoom.storage;
        if (storage) {
            var storageStorage = storage.store[RESOURCE_ENERGY];
        } else { storageStorage = 0; }
        
        //----container storage----
        let containerEn = 0;
        let containerCapacity = 0;
        let containers = thisRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER;
            }
        });
        if (containers.length > 0) {
            containerCapacity = containers[0].store.getCapacity();

            for (let container of containers) {
                containerEn += container.store[RESOURCE_ENERGY];
            }
        }
        console.log('🟡 主>> 仓库: ' + storageStorage + ', 扩展: ' + extensions.length + ', 扩展能量: ' + extensionEnergy + '/' + extensions.length * extensionCapacity + ', 容器 ' + containers.length + ', 容器能量: ' + containerEn + '/' + containerCapacity * containers.length);

        //----find dropped energy----
        let droppedEnergy = thisRoom.find(FIND_DROPPED_RESOURCES
            , {
                filter: (resource) => {
                    return resource.amount > 10;
                }
            }
        );
        let sortedEnergys = _.sortBy(droppedEnergy, (drop) => {
            if (drop.resourceType === RESOURCE_ENERGY) {
                return -drop.amount; // 能量数量越多，排序越靠前
            }
        });
        for (let drop of sortedEnergys) {
            console.log('🟡🟡 主>> 掉落能量: ' + drop.room.name + ':' + drop.pos.x + ',' + drop.pos.y + ': ' + drop.amount);
            // 获取资源的位置和数量
            const { x, y } = drop.pos;
            const amount = drop.amount;
            // 在资源的位置上绘制一个圆圈
            thisRoom.visual.circle(x, y, { radius: 0.4, fill: 'yellow', opacity: 0.5 });
            // 在资源的位置上绘制资源的数量
            thisRoom.visual.text(amount.toString(), x, y + 0.5, { color: 'white', font: 0.5 });
        }
        //----find tombstone + ruins----
        let tombstones = thisRoom.find(FIND_TOMBSTONES, {
            filter: (tombstone) => {
                return _.sum(tombstone.store) > 0;
            },
            // 按存储量从大到小排序
            sort: (a, b) => _.sum(b.store) - _.sum(a.store)
        }).concat(thisRoom.find(FIND_RUINS, {
            filter: ruin => ruin.store.getUsedCapacity() > 0
        }));
        if (tombstones.length > 0) {
            console.log('🟡🟡 主>> 墓/废墟资源: ' + tombstones[0] + ': ' + _.sum(tombstones[0].store));
        }
        //----count available harvest spots----
        let totalSources = thisRoom.find(FIND_SOURCES);
        // let sources = thisRoom.find(FIND_SOURCES, {
        //     filter: (source) => {
        //         return source.energy > 0;
        //     }
        // });
        let sources = [];
        for (let source of totalSources) {
            if (source.energy > 0) {
                sources.push(source);
            }
            //     let countharvester = _.filter(Game.creeps, (creep) => creep.memory.workingSlot == source.id);
            //     console.log('⛏️ 主>> ' + countharvester.length + ' creeps harvesting ' + source);
        }

        //----mineral----
        let minerals = thisRoom.find(FIND_MINERALS);
        let mineral0Amount = minerals[0].mineralAmount;

        let towers = thisRoom.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        let towerEn = 0;
        let roomInvader = thisRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_INVADER_CORE)
            }
        });
        let enemies = thisRoom.find(FIND_HOSTILE_CREEPS);

        //----call tower----
        for (let tower of towers) {
            roleTower.run(tower, roomName, dismantleTarget, enemies);
            towerEn += tower.store.getUsedCapacity(RESOURCE_ENERGY);
        }

        //----clear memory----
        for (let creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                delete Memory.creeps[creepName];
                console.log('🗑️ 主>> 清除无效虫子内存: ' + creepName);
            }
        }

        //----count creep by roles----
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.loc == roomName);
        let totalWorkParts = _.sum(_.map(harvesters, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.loc == roomName);
        let totalUpgraderParts = _.sum(_.map(upgraders, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.loc == roomName);
        let totalBuildParts = _.sum(_.map(builders, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' && creep.memory.loc == roomName);
        let totalTransporterParts = _.sum(_.map(transporter, (creep) => creep.body.filter((part) => part.type === CARRY).length));
        let claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.loc == roomName);
        let totalClaimParts = _.sum(_.map(claimers, (creep) => creep.body.filter((part) => part.type === CLAIM).length));
        let fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter' && creep.memory.loc == roomName);
        let melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee' && creep.memory.loc == roomName);
        let miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.loc == roomName);
        let totalMineParts = _.sum(_.map(miners, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let alchemists = _.filter(Game.creeps, (creep) => creep.memory.role == 'alchemist' && creep.memory.loc == roomName);
        console.log('🏷️ 主>> 采能虫: ' + harvesters.length + ', WORK:' + totalWorkParts + ', 能量+' + totalWorkParts * 2);
        console.log('🏷️ 主>> 升级虫: ' + upgraders.length + ', WORK:' + totalUpgraderParts + ', 能量-' + totalUpgraderParts + ' |️ 占领虫: ' + claimers.length);
        console.log('🏷️ 主>> 运输虫: ' + transporter.length + ', CARRY:' + totalTransporterParts + ', 运力:' + totalTransporterParts * 50);
        console.log('🏷️ 主>> 建筑虫: ' + builders.length + ', WORK:' + totalBuildParts + ' |️ 战斗虫: ' + fighters.length + ' | 格斗虫: ' + melees.length);
        console.log('🏷️ 主>> 采矿虫: ' + miners.length + ', 矿:' + mineral0Amount + ' |️ 炼金虫: ' + alchemists.length);

        //----spawning creeps----
        let spawnName = '';
        // var spawn = thisRoom.find(FIND_MY_SPAWNS)[0];
        // if (spawn && thisRoom.controller.my) {
        //     var spawnName = spawn.name;
        // } else {
        //     var spawnName = 'SpawnW4N28';
        // }
        let spawnsInRoom = thisRoom.find(FIND_MY_SPAWNS);
        let compareRest = 130;
        for (let s of spawnsInRoom) {
            if (!s.memory.restTime) {
                s.memory.restTime = 0;
            }
            //----show spawning----
            if (s.spawning) {
                let spawningCreep = Game.creeps[s.spawning.name];
                s.room.visual.text(
                    '🛠️' + spawningCreep.memory.role + '-' + s.spawning.remainingTime + '/' + s.spawning.needTime,
                    s.pos.x + 1, s.pos.y, { align: 'left', opacity: 0.8 });
            }
            else {
                if (s.memory.restTime <= compareRest) {
                    spawnName = s.name;
                    compareRest = s.memory.restTime;
                }
            }
            s.room.visual.text(s.memory.restTime, s.pos.x, s.pos.y + 0.1, { color: 'lightgreen', stroke: 'black', font: 0.5 });
            if (thisRoom.find(FIND_HOSTILE_CREEPS).length > 0 && towerEn < 100 && !s.Spawning) {
                s.memory.restTime = 0;
            }
            else if (s.memory.restTime > 0) {
                s.memory.restTime--;
            }
            // else if (!s.Spawning && (s.memory.restTime <= 0 || !s.memory.restTime)) {
            //     spawnName = s.name;
            // }
        }
        if (spawnsInRoom.length == 0) {
            spawnName = 'SpawnW3N28';
        }
        else if (!spawnName || spawnName == '') {
            spawnName = spawnsInRoom[0].name;
        }
        // else if (spawn && thisRoom.controller.my) {
        //     var spawnName = 'SpawnW4N28';
        // }
        let spawn = Game.spawns[spawnName];
        // console.log('主>> ----spawner: ' + spawnName + ':' + spawn.memory.restTime);
        
        //----harvester----
        if (totalWorkParts < sources.length * 5 && thisRoom.controller.my && harvesters.length < 6) {
            if (enAvail >= 1800 && totalSources.length > 1 && storageStorage >= 300000) {
                if (spawn.memory.restTime <= 66) {
                    let newName = roomName + '-HvB-' + Game.time;
                    console.log('主>> 孵化采能虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 196;
                }
            } else if (enAvail >= 900) {
                if (spawn.memory.restTime <= 33) {
                    let newName = roomName + '-Hv-' + Game.time;
                    console.log('主>> 孵化采能虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 163;
                }
            } else if (enAvail >= 700) {
                if (spawn.memory.restTime <= 27) {
                    let newName = roomName + '-Hv-' + Game.time;
                    console.log('主>> 孵化采能虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 157;
                }
            } else if (enAvail >= 500) {
                if (spawn.memory.restTime <= 21) {
                    let newName = roomName + '-Hv-' + Game.time;
                    console.log('主>> 孵化采能虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 151;
                }
            } else {
                if (spawn.memory.restTime <= 12) {
                    let newName = roomName + '-Hv-' + Game.time;
                    console.log('主>> 孵化采能虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 142;
                }
            }
        }
        //----upgrader----
        else if ((upgraders.length < 1 && thisRoom.controller.my && thisRoom.controller.ticksToDowngrade <= 190000)) {
            if (enAvail >= 2800 && totalSources.length > 1 && storageStorage > 500000) {
                if (spawn.memory.restTime <= 102) {
                    let newName = roomName + '-UpB-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 232;
                }
            }
            else if (enAvail >= 2000 && storageStorage > 500000) {
                if (spawn.memory.restTime <= 75) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 205;
                }
            }
            else if (enAvail >= 1500 && totalSources.length > 1) {
                if (spawn.memory.restTime <= 54) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 184;
                }
            } else if (enAvail >= 900) {
                if (spawn.memory.restTime <= 33) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 163;
                }
            } else if (enAvail >= 650) {
                if (spawn.memory.restTime <= 24) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 154;
                }
            } else if (enAvail >= 500) {
                if (spawn.memory.restTime <= 21) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 151;
                }
            } else {
                if (spawn.memory.restTime <= 12) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, MOVE, CARRY, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 142;
                }
            }
        }
        //----builder----
        else if (builders.length < 1) {
            if (enAvail >= 1600) {
                if (spawn.memory.restTime <= 66) {
                    let newName = roomName + '-Bd-' + Game.time;
                    console.log('主>> 孵化建筑虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 196;
                }
            }
            else if (enAvail >= 1200) {
                if (spawn.memory.restTime <= 48) {
                    let newName = roomName + '-Bd-' + Game.time;
                    console.log('主>> 孵化建筑虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 178;
                }
            }
            else if (enAvail >= 900) {
                if (spawn.memory.restTime <= 36) {
                    let newName = roomName + '-Bd-' + Game.time;
                    console.log('主>> 孵化建筑虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 166;
                }
            }
            else if (enAvail >= 550) {
                if (spawn.memory.restTime <= 24) {
                    let newName = roomName + '-Bd-' + Game.time;
                    console.log('主>> 孵化建筑虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 154;
                }
            }
            else {
                if (spawn.memory.restTime <= 12) {
                    let newName = roomName + '-Bd-' + Game.time;
                    console.log('主>> 孵化建筑虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 142;
                }
            }
        }
        //----transporter----
        else if (transporter.length < 2 && totalTransporterParts < 16 && thisRoom.controller.my) {
            if (enAvail >= 2000 && thisRoom.controller.level == 8 && storageStorage >= 300000) {
                if (spawn.memory.restTime <= 108) {
                    let newName = roomName + '-TrB-' + Game.time;
                    console.log('主>> 孵化运输虫: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 238;
                }
            } else 
            if (enAvail >= 1300) {
                if (spawn.memory.restTime <= 60) {
                    let newName = roomName + '-Tr-' + Game.time;
                    console.log('主>> 孵化运输虫: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 190;
                }
            } else if (enAvail >= 1000) {
                if (spawn.memory.restTime <= 48) {
                    let newName = roomName + '-Tr-' + Game.time;
                    console.log('主>> 孵化运输虫: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 178;
                }
            } else if (enAvail >= 800) {
                if (spawn.memory.restTime <= 36) {
                    let newName = roomName + '-Tr-' + Game.time;
                    console.log('主>> 孵化运输虫: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 166;
                }
            } else if (enAvail >= 600) {
                if (spawn.memory.restTime <= 30) {
                    let newName = roomName + '-Tr-' + Game.time;
                    console.log('主>> 孵化运输虫: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 160;
                }
            } else if (enAvail >= 400) {
                if (spawn.memory.restTime <= 24) {
                    let newName = roomName + '-Tr-' + Game.time;
                    console.log('主>> 孵化运输虫: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 154;
                }
            } else {
                if (spawn.memory.restTime <= 12) {
                    let newName = roomName + '-Tr-' + Game.time;
                    console.log('主>> 孵化运输虫: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 142;
                }
            }
        }
        //----claimer----
        else if (!thisRoom.controller.my) {
            if (claimers.length < 1) {
                if (spawn.memory.restTime <= 6) {
                    let newName = roomName + '-Cl-' + Game.time;
                    console.log('主>> 孵化占领虫: ' + newName);
                    spawn.spawnCreep([CLAIM, MOVE], newName, { memory: { role: 'claimer', loc: roomName } });
                    spawn.memory.restTime = 136;
                }
            }
        }
        //----fighter----
        else if (towerEn < 300 && (enemies.length > 0 || roomInvader.length > 0)) {
            if (fighters.length < 1) {
                if (enAvail >= 550) {
                    let newName = roomName + '-Ft-' + Game.time;
                    console.log('主>> 孵化战斗虫: ' + newName);
                    spawn.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK], newName, { memory: { role: 'fighter', loc: roomName, destiny: roomName } });
                    // Game.spawns['SpawnW4N28'].spawnCreep([MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK], 'FighterW6N29', { memory: { role: 'fighter', loc: 'W4N28', destiny:'W6N29' } });
                    spawn.memory.restTime = 160;
                } else {
                    let newName = roomName + '-Ft-' + Game.time;
                    console.log('主>> 孵化战斗虫: ' + newName);
                    spawn.spawnCreep([RANGED_ATTACK, MOVE], newName, { memory: { role: 'fighter', loc: roomName, destiny: roomName } });
                    spawn.memory.restTime = 136;
                }
            }
        }
        //----melee----
        else if (roomInvader.length > 0 || !thisRoom.controller.my) {
            if (melees.length < 1) {
                if (enAvail >= 550) {
                    let newName = roomName + '-Ml-' + Game.time;
                    console.log('主>> 孵化格斗虫: ' + newName);
                    spawn.spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK], newName, { memory: { role: 'melee', loc: roomName, destiny: roomName } });
                    // Game.spawns['SpawnW4N28'].spawnCreep([MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK], 'FighterW6N29', { memory: { role: 'fighter', loc: 'W4N28', destiny:'W6N29' } });
                    spawn.memory.restTime = 175;
                } else {
                    let newName = roomName + '-Ml-' + Game.time;
                    console.log('主>> 孵化格斗虫: ' + newName);
                    spawn.spawnCreep([ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], newName, { memory: { role: 'melee', loc: roomName, destiny: roomName } });
                    spawn.memory.restTime = 160;
                }
            }
        }
        //----alchemist----
        else if (alchemists.length < 1 && thisRoom.terminal) {
            if (spawn.memory.restTime <= 9) {
                let newName = roomName + '-Al-' + Game.time;
                console.log('主>> 孵化炼金虫: ' + newName);
                spawn.spawnCreep([CARRY, CARRY, MOVE], newName, { memory: { role: 'alchemist', loc: roomName } });
                spawn.memory.restTime = 139;
            }
        }
        //----upgrader max----
        else if (storageStorage > 500000 && thisRoom.controller.my) {
            if (enAvail >= 2800 && totalSources.length > 1) {
                if (spawn.memory.restTime <= 102) {
                    let newName = roomName + '-UpB-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 232;
                }
            }
            else if (enAvail >= 2000 && storageStorage > 500000) {
                if (spawn.memory.restTime <= 75) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 205;
                }
            }
            else if (enAvail >= 1500 && totalSources.length > 1) {
                if (spawn.memory.restTime <= 54) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 184;
                }
            } else if (enAvail >= 900) {
                if (spawn.memory.restTime <= 33) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 163;
                }
            } else if (enAvail >= 650) {
                if (spawn.memory.restTime <= 24) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 154;
                }
            } else if (enAvail >= 500) {
                if (spawn.memory.restTime <= 21) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 151;
                }
            } else {
                if (spawn.memory.restTime <= 12) {
                    let newName = roomName + '-Up-' + Game.time;
                    console.log('主>> 孵化升级虫: ' + newName);
                    spawn.spawnCreep([WORK, MOVE, CARRY, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 142;
                }
            }
        }
        // 遍历每个矿物
        else {
            for (let mineral of minerals) {
                // 判断矿物上是否已经建造了Extractor
                let extractors = mineral.pos.lookFor(LOOK_STRUCTURES, { filter: { structureType: STRUCTURE_EXTRACTOR } });
                if (extractors.length > 0 && mineral.mineralAmount > 0 && storage.store[mineral.mineralType] + thisRoom.terminal.store[mineral.mineralType] < 300000) {
                    // console.log(`主>> 矿物 ${mineral.mineralType} 可以采集 ${mineral.mineralAmount}`);
                    if (miners.length < 1) {
                        if (enAvail >= 1600) {
                            if (spawn.memory.restTime <= 45) {
                                let newName = roomName + '-Mn-' + Game.time;
                                console.log('主>> 孵化采矿虫: ' + newName);
                                spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'miner', loc: roomName } });
                                spawn.memory.restTime = 175;
                            }
                        }
                        else if (enAvail >= 800) {
                            if (spawn.memory.restTime <= 27) {
                                let newName = roomName + '-Mn-' + Game.time;
                                console.log('主>> 孵化采矿虫: ' + newName);
                                spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'miner', loc: roomName } });
                                spawn.memory.restTime = 157;
                            }
                        }
                    }
                } else {
                    // console.log(`主>> 矿物 ${mineral.mineralType} 上尚未建造Extractor`);
                }
            }
        }

        var age = CREEP_LIFE_TIME;
        //----call creeps to work----
        for (let creepName in Game.creeps) {
            let creep = Game.creeps[creepName];
            //----find oldest creep----
            let life = creep.ticksToLive;
            if (life < age) {
                age = life;
                var oldest = creep;
            }
            if (creep.memory.loc == roomName) {
                //----save creep life to Memory.rooms.roomName----
                thisRoom.memory[creepName] = life;
                //----call creeps to work----
                switch (creep.memory.role) {
                    case 'harvester':
                        var workResult = roleHarvester.run(creep, roomName, sources);
                        break;
                    case 'upgrader':
                        var workResult = roleUpgrader.run(creep);
                        break;
                    case 'builder':
                        var workResult = roleBuilder.run(creep, roomName, enAvail, storageStorage, dismantleTarget);
                        break;
                    case 'transporter':
                        var workResult = roleTransporter.run(creep, roomName, sortedEnergys, tombstones);
                        break;
                    case 'claimer':
                        var workResult = roleClaimer.run(creep, roomName, myRooms);
                        break;
                    case 'fighter':
                        var workResult = roleFighter.run(creep, roomName, dismantleTarget);
                        break;
                    case 'miner':
                        var workResult = roleMiner.run(creep, roomName, minerals);
                        break;
                    case 'alchemist':
                        var workResult = roleAlchemist.run(creep);
                        break;
                    case 'melee':
                        var workResult = roleMelee.run(creep, roomName, dismantleTarget);
                        break;
                }
            }
        }


    } //----room wide end----

    //----reserve room wide----
    // for (let roomName of reserveRooms) {
    //     let thisRoom = Game.rooms[roomName];
    //     if (!thisRoom.my) {
    //         Game.getObjectById('656f3b51638f798312eec0e3').observeRoom(roomName);
    //     }
    //     let roomLevel;
    //     let enAvail;
    //     if (thisRoom && thisRoom.controller.my) {
    //         roomLevel = thisRoom.controller.level;
    //         enAvail = thisRoom.energyAvailable;
    //     }
    //     console.log('🏰 主>>>>>>>>>> 房间: [' + roomName + '], 等级 ' + roomLevel + ' <<<<<<<<<<🏰');

    //     //----count creep by roles----
    //     var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.loc == roomName);
    //     var totalClaimParts = _.sum(_.map(claimers, (creep) => creep.body.filter((part) => part.type === CLAIM).length));
    //     let fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter' && creep.memory.loc == roomName);
    //     console.log('🏷️ 主>> Claimer: ' + claimers.length + ', claims:' + totalClaimParts);
    //     console.log('🏷️ 主>>️ 战斗虫: ' + fighters.length);

    //     //----spawning creeps----
    //     let spawnsInRoom;
    //     if (thisRoom.find(FIND_MY_SPAWNS)) {
    //         spawnsInRoom = thisRoom.find(FIND_MY_SPAWNS);
    //     }
    //     let spawn = spawnsInRoom[0];
    //     if (spawn && thisRoom.controller.my) {
    //         var spawnName = spawn.name;
    //     } else {
    //         var spawnName = 'SpawnW6N28';
    //     }
    //     //----claimer----
    //     if (!thisRoom.controller.my) {
    //         if (claimers.length < 1) {
    //             var newName = 'Claimer' + roomName + Game.time;
    //             console.log('主>> Spawning new claimer: ' + newName);
    //             Game.spawns[spawnName].spawnCreep([CLAIM, MOVE], newName, { memory: { role: 'claimer', loc: roomName } });
    //             spawn.memory.restTime = 136;
    //         }
    //     }
    //     //----fighter----
    //     if (thisRoom.find(FIND_HOSTILE_CREEPS).length > 0 && towerEn < 100) {
    //         if (fighters.length < 1) {
    //             if (enAvail >= 550) {
    //                 let newName = roomName + 'Ft' + Game.time;
    //                 console.log('主>> Spawning new fighter: ' + newName);
    //                 spawn.spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK], newName, { memory: { role: 'fighter', loc: roomName } });
    //                 spawn.memory.restTime = 157;
    //             } else {
    //                 let newName = roomName + 'Ft' + Game.time;
    //                 console.log('主>> Spawning new fighter: ' + newName);
    //                 spawn.spawnCreep([RANGED_ATTACK, MOVE], newName, { memory: { role: 'fighter', loc: roomName } });
    //                 spawn.memory.restTime = 136;
    //             }
    //         }
    //     }

    //     //----find oldest creep----
    //     var age2 = 1500;
    //     //----call creeps to work----
    //     for (let creepName in Game.creeps) {
    //         let creep = Game.creeps[creepName];
    //         //----find oldest creep----
    //         let life = creep.ticksToLive;
    //         if (life < age2) {
    //             age2 = life;
    //             var oldest = creep;
    //         }
    //         //----call creeps to work----
    //         if (creep.memory.role == 'claimer' && creep.memory.loc == roomName) {
    //             roleClaimer.run(creep, roomName, myRooms);
    //         }
    //     }
    // }
    //----reserve room wide end----

    //----link----
    roleLink.run();

    console.log(`⚰️ 主>>>> ${oldest} 剩余生命 ${age} >>>>`);

    //----test----
    // console.log('container ' + Game.getObjectById('650040e2dbe835a751c7c705').storage.store[RESOURCE_ENERGY] );
    // console.log(Game.getObjectById('65052ea2c34196660d3e9925').store[RESOURCE_OXYGEN]);

    console.log('💻 CPU 桶: ' + Game.cpu.bucket);
    if (Game.cpu.bucket >= 10000) {
        Game.cpu.generatePixel();
    }
    //----test end----
}