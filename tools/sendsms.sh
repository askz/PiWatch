#!/bin/bash
# using: ./sendsms.sh 89999999999 "Hello, im SMS from bash"

ADB=/usr/local/bin/adb
# KEYCODE_HOME
$ADB shell input keyevent 3
# open form and fill them
$ADB shell am start -a android.intent.action.SENDTO -d sms:$1 --es sms_body "$2" --ez exit_on_sent true
# sleep 1 sec
sleep 1
# KEYCODE_DPAD_RIGHT
$ADB shell input keyevent 22
# KEYCODE_ENTER
$ADB shell input keyevent 66