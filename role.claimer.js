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
    run: function (creep, roomName, own) {
        var startRoomName = creep.room.name;
        var targetRoomName = creep.memory.loc;
        var controller = Game.rooms[targetRoomName].controller;
        
        creep.memory.path = creep.pos.findPathTo(controller);
        creep.moveByPath(creep.memory.path);
        if (startRoomName != targetRoomName) {
            // creep.memory.path = creep.pos.findPathTo(controller);
            creep.moveByPath(creep.memory.path);
            // creep.moveTo(new RoomPosition(25, 25, targetRoomName));


            // // 使用 Game.map.findRoute 方法找到起点房间到目标房间的最短路径
            // var route = Game.map.findRoute(startRoomName, targetRoomName);

            // // 如果找到了路径
            // if (route.length > 0) {
            //     // 获取起点房间到下一个房间的出口方向
            //     var exitDir = route[0].exit;

            //     // 获取起点房间到下一个房间的出口位置
            //     var exit = Game.rooms[startRoomName].find(exitDir)[0];

            //     // 移动到出口位置
            //     creep.moveTo(exit, { visualizePathStyle: { stroke: '#aa0066' } });
            //     creep.say('前往');
            // }
        } else {
            
            if (Game.gcl.level < own.length) {
                var result = creep.reserveController(controller);
                creep.say('reserve');
            }
            else {
                var result = creep.claimController(controller);
                creep.say('claim');
            }
            if (result == ERR_NOT_IN_RANGE) {
                // creep.moveTo(controller, { reusePath: creep.pos.getRangeTo(controller)/2, visualizePathStyle: { stroke: '#aa0066' } });
                creep.moveByPath(creep.memory.path);
                creep.say('占领');
            }
            else if (controller.owner && controller.owner.username != 'SybrrLuune') {
                if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                    // creep.moveTo(controller, { visualizePathStyle: { stroke: '#aa0066' } });
                    creep.moveByPath(creep.memory.path);
                    creep.say('攻击控制器');
                }
            }
            // else if (result == ERR_GCL_NOT_ENOUGH) {
            //     creep.reserveController(controller);
            // }
            if (!controller.sign && creep.signController(creep.room.controller, "newbie farmer") == ERR_NOT_IN_RANGE) {
                // creep.moveTo(creep.room.controller, { reusePath: 20, visualizePathStyle: { stroke: '#aa0066' } });
                creep.moveByPath(creep.memory.path);
                creep.say('签名');
            }
            else if (controller.sign.username != 'SybrrLuune') {
                creep.signController(creep.room.controller, "newbie farmer");
            }
        }
    }
}

module.exports = roleClaimer;