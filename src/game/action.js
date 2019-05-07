var Action = {
    checkRotation : false,
    angle : 360,
    reduce : 12,
    angleSelect : 330,
    randTeam :[1, 2, 3],

    lock : true,
    arr:[30, 45, 60, 75, 90, 105, 135, 120, 360, 255, 240, 225, 210, 195, 345, 330, 315, 300, 285, 270,  180, 165, 150],
    arrAngle : 
    [
        { angle1: 7, angle2: 22, point: 700, check: "diem"},
        { angle1: 22, angle2: 37, point: 400, check: "diem"},
        { angle1: 37, angle2: 52, point: 0, check: "mat luot"},
        { angle1: 52, angle2: 67, point: 800, check: "diem"},
        { angle1: 67, angle2: 82, point: 200, check: "diem"},
        { angle1: 82, angle2: 97, point: 0, check: ""},
        { angle1: 97, angle2: 112, point: 400, check: "diem"},
        { angle1: 112, angle2: 127, point: 300, check: "diem"},
        { angle1: 127, angle2: 142, point: 800, check: "diem"},
        { angle1: 142, angle2: 157, point: 2, check: "nhan doi"},
        { angle1: 157, angle2: 172, point: 100, check: "diem"},
        { angle1: 172, angle2: 187, point: 900, check: "diem"},
        { angle1: 187, angle2: 202, point: 200, check: "diem"},
        { angle1: 202, angle2: 217, point: 0, check: "may man"},
        { angle1: 217, angle2: 232, point: 500, check: "diem"},
        { angle1: 232, angle2: 247, point: 100, check: "diem"},
        { angle1: 247, angle2: 262, point: -2, check: "chia doi"},
        { angle1: 262, angle2: 277, point: 200, check: "diem"},
        { angle1: 277, angle2: 292, point: 400, check: "diem"},
        { angle1: 292, angle2: 307, point: 100, check: "diem"},
        { angle1: 307, angle2: 322, point: 600, check: "diem"},
        { angle1: 322, angle2: 337, point: 2, check: "nhan doi"},
        { angle1: 337, angle2: 352, point: 100, check: "diem"},
        { angle1: 352, angle2: 7, point: 200, check: "diem"},
    ],
};
Action.shuffle = function(array) {
    var counter = array.length, temp, index;
     // GLI
    for (var i=counter-1; i>=1; i--) {   
        index = Action.genRandomInt(0, i);   
        // GLI-start
        temp = array[i];
        array[i] = array[index];
        array[index] = temp;
        // GLI-end
    }

    return array;
};
Action.genRandomInt = function(min, max) {
	try {
		var totalRandom = max - min + 1;
		var exclude = Math.pow(2, 32) - (Math.pow(2, 32) % totalRandom);
		var biasCount = 0;
		
		do {
			var buff = crypto.randomBytes(4);
            var randomDev = buff.readUInt32LE(0);       // Fix GLI
			
			if (randomDev < exclude) {
				var ret = (randomDev % totalRandom) + min;
				return ret;
			}
			
			biasCount++;
		}
		while (true);
	} catch(e) {
		return Math.floor((Math.random() * (max - min + 1)) + min);
	}
	// #737-end
}
Action.rotateHat = function(sender, type)
{
    switch (type)
        {     
            case ccui.Widget.TOUCH_ENDED:
            
            if (Action.lock == true) {
                Action.randomTeam();

                var ang = Action.shuffle(Action.arr);
                Action.lock = false;
                Action.angle = ang[0];
                Action.reduce = 12;
                Action.angleSelect = ang[0] - 15;
                Action.checkRotation = true;
            }
                
                break;
            default:
                break;
        }
}
Action.randomTeam = function() {
    var shuff = Action.shuffle(Action.randTeam)[0];
    if (shuff == 1) {
        layer.hat.texture = res.hat_png;
    }
    if (shuff == 2) {
        layer.hat.texture = res.hat1_png;
    }
    if (shuff == 3) {
        layer.hat.texture = res.hat2_png;
    }
}