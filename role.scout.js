/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */

var roleScout = {

    /** @param {Creep} creep **/
    run: function (creep, roomName, own) {
        var startRoomName = creep.room.name;
        var targetRoomName = creep.memory.loc;
        if (creep.room.name != targetRoomName) {
            // creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), {reusePath: 20});


            // 使用 Game.map.findRoute 方法找到起点房间到目标房间的最短路径
            var route = Game.map.findRoute(startRoomName, targetRoomName);

            // 如果找到了路径
            if (route.length > 0) {
                // 获取起点房间到下一个房间的出口方向
                var exitDir = route[0].exit;

                // 获取起点房间到下一个房间的出口位置
                var exit = Game.rooms[startRoomName].find(exitDir)[0];

                // 移动到出口位置
                creep.moveTo(exit, { visualizePathStyle: { stroke: '#aa0066' } });
            }
        } else {
            let directions = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
            let randomDirection = _.sample(directions);
            creep.move(randomDirection);
        }
    }
}

module.exports = roleScout;