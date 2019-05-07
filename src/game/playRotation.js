var playRotate = cc.Layer.extend({
    hat: null,
    playSelect: null,
    buttonHat: null,
    bTime: 0.03,
    labelCoin: null,
    score: 0,

    ctor: function () {
        this._super();

        this.initGUI();

        this.scheduleUpdate();

    },
    reset: function () {
        var ang = Action.shuffle(Action.arr);
        this.bTime = 0.03;
        Action.checkRotation = false;
        Action.angle = ang[0];
        Action.reduce = 12;
        Action.angleSelect = ang[0] - 15;
        Action.lock = true;

    },

    initGUI: function () {
        var bgRotate = CommmonUtuils.craeteImage(res.btnRotate_png, 0.5, 0.5);
        this.addChild(bgRotate);

        var coin = CommmonUtuils.craeteImage(res.coin_png, 0.95, 0.91);
        this.addChild(coin);
        coin.setScale(0.5);

        this.labelCoin = CommmonUtuils.createLabelFont("0", 0.915, 0.9, res.font_score, 0.5);
        this.addChild(this.labelCoin);
        this.labelCoin.setAnchorPoint(1, 1);

        this.hat = CommmonUtuils.craeteImage(res.hat_png, 0.5, 0.5);
        this.addChild(this.hat);
        this.hat.setScale(1.5);
        this.hat.setRotation(360);

        this.buttonHat = CommmonUtuils.createButton(res.buttonHatLight_png, 0.5, 0.5);
        this.addChild(this.buttonHat);
        this.buttonHat.addTouchEventListener(Action.rotateHat, this);

        this.playSelect = CommmonUtuils.craeteImage(res.playSelect_png, 0.5, -0.01);
        this.addChild(this.playSelect);
        this.playSelect.setAnchorPoint(0.5, 0);
    },
    play: function () {
        if (Action.checkRotation == true) {
            if (Action.reduce >= 0.05) {
                Action.angle = Action.angle - Action.reduce;
                this.hat.setRotation(Action.angle);
                Action.reduce = Action.reduce - 0.05;

                // chỉnh tốc độ của kim quay 
                this.bTime += (0.07 / 249);
                //.....

                this.checkSelect();

                if (Action.angle <= 0) {
                    Action.angle = 360;
                    Action.angleSelect = 345;
                }
            }
            else {
                this.stopRotation();
            }
        }
    },
    checkSelect: function () {
        if (Action.angle <= Action.angleSelect - 15) {
            var rotateLeft = cc.RotateTo.create(this.bTime, 350);
            var rotateRight = cc.RotateTo.create(this.bTime, 360);
            var sequence = cc.Sequence.create(rotateLeft, rotateRight);

            this.playSelect.runAction(sequence);
            Action.angleSelect = Action.angle - 15;
        }
    },
    stopRotation: function () {
        Action.checkRotation = false;
        for (var i = 0; i < Action.arrAngle.length; i++) {
            if (Action.angle >= Action.arrAngle[i].angle1 &&
                Action.angle < Action.arrAngle[i].angle2) {
                var sum = (Action.arrAngle[i].angle1 + Action.arrAngle[i].angle2) / 2;
                var result = 0;
                if (Action.angle < sum) {
                    result = sum - Action.angle;
                }
                else {
                    result = Action.angle - sum;
                }

                this.hat.runAction(cc.rotateBy(1, result));
            }
        }
        this.reset();
        Action.lock = true;

    },
    randomArray: function (items) {
        return items[Math.floor(Math.random() * items.length)];
    },
    update: function (dt) {
        this.play();
    }
});
var layer = null;
var MainGame = cc.Scene.extend({
    onEnter: function () {
        this._super();
        layer = new playRotate();
        this.addChild(layer);
    }
});

