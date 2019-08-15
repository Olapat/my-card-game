class player {
    constructor() {
        this.hp = 30;
        this.armor = 0;
        this.point = 0;
        this.stackWin = 0;
        this.stackLose = 0;

        if (this.stackLose > 2 || this.stackWin > 2) {
            this.point = +1;
            console.log("stack update!!");
        }
    };

    getState() {
        return this
    }

    setHP(newHP) {
        this.hp = newHP;
    }

    setArmor(newArmor) {
        this.armor = newArmor;
    }

    setPoint(newPoint) {
        this.point = newPoint;
    }

    render() {
        if (this.stackLose > 2 || this.stackWin > 2) {
            this.point = +1;
            console.log("stack update!! in render()");
        }
    }
};

module.exports = player;
