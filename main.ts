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
        carcotrol.setNeoColor(carcotrol.colors(RGBColors.White))
        carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.White))
    } else if (receivedNumber == 6) {
        carcotrol.setNeoColor(carcotrol.colors(RGBColors.Purple))
        carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Purple))
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
let saveString = ""
let radioGroup = 0
basic.showIcon(IconNames.SmallHeart)
let 無線グループ設定中 = true
getradiogroup.initRadioGroup()
while (radioGroup == 0) {
    radioGroup = getradiogroup.getRadioGroup(saveString)
    if (radioGroup == 0) {
        basic.showIcon(IconNames.Sad)
    } else {
        watchfont.showNumber2(radioGroup)
    }
}
saveString = ""
無線グループ設定中 = false
radio.setTransmitPower(7)
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
            carcotrol.carCtrl(0, 0)
        }
    }
})
