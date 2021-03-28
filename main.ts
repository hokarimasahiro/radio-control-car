function デモ () {
    if (carcotrol.getLineColor(Position.Left, lineColor.White) && carcotrol.getLineColor(Position.Right, lineColor.White)) {
    	
    } else if (carcotrol.getLineColor(Position.Left, lineColor.White) && carcotrol.getLineColor(Position.Right, lineColor.Black)) {
        carcotrol.carCtrl(DEMO_SPEED, 0)
    } else if (carcotrol.getLineColor(Position.Left, lineColor.Black) && carcotrol.getLineColor(Position.Right, lineColor.White)) {
        carcotrol.carCtrl(0, DEMO_SPEED)
    } else if (carcotrol.getLineColor(Position.Left, lineColor.Black) && carcotrol.getLineColor(Position.Right, lineColor.Black)) {
        carcotrol.carCtrl(DEMO_SPEED, DEMO_SPEED)
    }
    if (carcotrol.getLineColor(Position.Left, lineColor.White)) {
        led.plot(0, 2)
    } else {
        led.unplot(0, 2)
    }
    if (carcotrol.getLineColor(Position.Right, lineColor.White)) {
        led.plot(4, 2)
    } else {
        led.unplot(4, 2)
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
radio.onReceivedString(function (receivedString) {
    saveString = receivedString
})
let y = 0
let x = 0
let DEMO_SPEED = 0
let デモNO = 0
let saveString = ""
let radioGroup = 0
let carType2 = ["U", "T", "M", "U", "P"]
basic.showString("" + (carType2[carcotrol.getCarType()]))
let 無線グループ設定中 = true
getradiogroup.initRadioGroup()
while (radioGroup == 0) {
    radioGroup = getradiogroup.getRadioGroup(saveString)
}
watchfont.showNumber2(radioGroup)
saveString = ""
無線グループ設定中 = false
radio.setTransmitPower(7)
デモNO = 0
if (carcotrol.getCarType() == carcotrol.car(carType.Tinybit)) {
    DEMO_SPEED = 90
} else if (carcotrol.getCarType() == carcotrol.car(carType.Maqueen)) {
    DEMO_SPEED = 200
} else if (carcotrol.getCarType() == carcotrol.car(carType.Porocar)) {
    DEMO_SPEED = 150
} else {
    DEMO_SPEED = 0
}
basic.forever(function () {
    if (saveString != "" && !(無線グループ設定中)) {
        x = parseFloat(saveString.split(",")[1])
        y = parseFloat(saveString.split(",")[2])
        if (Math.abs(y) > 100) {
            if (Math.abs(x) < 100) {
                carcotrol.carCtrl(y / 2, y / 2)
            } else {
                carcotrol.carCtrl(y / 2 + x / 2, y / 2 - x / 2)
            }
        } else if (Math.abs(x) > 100) {
            carcotrol.carCtrl(x / 2, x / -2)
        } else {
            if (デモNO == 0) {
                carcotrol.carCtrl(0, 0)
            } else {
                デモ()
            }
        }
    }
})
