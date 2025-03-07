function デモ () {
    if (carcotrol.getLineColor(Position.Left, lineColor.White) && carcotrol.getLineColor(Position.Right, lineColor.White)) {
    	
    } else if (carcotrol.getLineColor(Position.Left, lineColor.White) && carcotrol.getLineColor(Position.Right, lineColor.Black)) {
        carcotrol.carCtrl(DEMO_SPEED[carcotrol.getCarType()], 0)
    } else if (carcotrol.getLineColor(Position.Left, lineColor.Black) && carcotrol.getLineColor(Position.Right, lineColor.White)) {
        carcotrol.carCtrl(0, DEMO_SPEED[carcotrol.getCarType()])
    } else if (carcotrol.getLineColor(Position.Left, lineColor.Black) && carcotrol.getLineColor(Position.Right, lineColor.Black)) {
        carcotrol.carCtrl(DEMO_SPEED[carcotrol.getCarType()], DEMO_SPEED[carcotrol.getCarType()])
    }
    if (carcotrol.getCarType() == carcotrol.car(carType.Porocar)) {
        carcotrol.plotBarGraph(pins.analogReadPin(AnalogReadWritePin.P1) / 4, pins.analogReadPin(AnalogReadWritePin.P2) / 4)
    } else {
        carcotrol.plotBarGraph(carcotrol.getLineColorN(Position.Right) * 255, carcotrol.getLineColorN(Position.Left) * 255)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        carcotrol.setNeoColor(carcotrol.colors(RGBColors.Red))
        carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Red))
    } else if (receivedNumber == 2) {
        carcotrol.setNeoColor(carcotrol.colors(RGBColors.Green))
        carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Green))
    } else if (receivedNumber == 3) {
        carcotrol.setNeoColor(carcotrol.colors(RGBColors.Blue))
        carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Blue))
    } else if (receivedNumber == 4) {
        carcotrol.setNeoColor(carcotrol.colors(RGBColors.Yellow))
        carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Yellow))
    } else if (receivedNumber == 5) {
        デモNO = 1
    } else if (receivedNumber == 6) {
        デモNO = 0
    } else {
        carcotrol.setNeoColor(carcotrol.colors(RGBColors.Black))
        carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Black))
    }
})
function carControl () {
    if (Math.abs(y) > 100) {
        if (Math.abs(x) < 100) {
            left = y / 2
            right = y / 2
        } else {
            left = y / 2 + x / 2
            right = y / 2 - x / 2
        }
        carcotrol.carCtrl(left, right)
    } else if (Math.abs(x) > 100) {
        left = x / 2
        right = x / -2
        carcotrol.carCtrl(left, right)
    } else if (デモNO == 0) {
        left = 0
        right = 0
        carcotrol.carCtrl(left, right)
    }
    saveString = ""
}
input.onButtonPressed(Button.A, function () {
    デモNO = 1
    basic.showString("A")
})
radio.onReceivedString(function (receivedString) {
    saveString = receivedString
})
input.onButtonPressed(Button.B, function () {
    デモNO = 0
    basic.showString("B")
})
let radioGroup = 0
let saveString = ""
let right = 0
let left = 0
let x = 0
let y = 0
let デモNO = 0
let DEMO_SPEED: number[] = []
carcotrol.setNeoBrightness(50)
carcotrol.setNeoColor(carcotrol.colors(RGBColors.Black))
let carType2 = [
"U",
"T",
"M",
"S",
"P",
"O"
]
DEMO_SPEED = [
0,
60,
150,
100,
70,
70
]
if (input.buttonIsPressed(Button.A)) {
    carcotrol.setCarType(carType.switchE)
    while (input.buttonIsPressed(Button.A)) {
    	
    }
}
if (input.buttonIsPressed(Button.B)) {
    carcotrol.setCarType(carType.PorocarO)
    while (input.buttonIsPressed(Button.B)) {
    	
    }
}
basic.showString("" + (carType2[carcotrol.getCarType()]))
getradiogroup.initRadioGroup()
デモNO = 0
basic.forever(function () {
    if (radioGroup == 0) {
        if (saveString != "") {
            radioGroup = getradiogroup.getRadioGroup(saveString)
            saveString = ""
            if (radioGroup != 0) {
                watchfont.showNumber2(radioGroup)
                basic.pause(1000)
                radio.setTransmitPower(7)
            }
        }
    } else {
        if (saveString != "") {
            x = parseFloat(saveString.split(",")[1])
            y = parseFloat(saveString.split(",")[2])
            carControl()
        }
    }
    if (デモNO != 0) {
        デモ()
    } else {
        if (carcotrol.getCarType() == carcotrol.car(carType.Porocar)) {
            carcotrol.plotBarGraph(left, right)
        } else {
            carcotrol.plotBarGraph(0 - right, 0 - left)
        }
    }
})
