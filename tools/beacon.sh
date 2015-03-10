#!/bin/bash
BLUETOOTH_DEVICE=hci0
# iBeacon broadcasting Profile UUID 87209302-C7F2-4D56-B1D1-14EADD0CE41F
# UUID //
# MAJOR // 0 - 65535
# MAJOR // 0 - 65535
# POWER // -128 - 127 (measured RSSI at 1 meter) # The 2's complement of the calibrated Tx Power
UUID="87 20 93 02 C7 F2 4D 56 B1 D1 14 EA DD 0C E4 1F"
MAJOR="00 00"
MINOR="00 00"
POWER="C9"

echo "start iBeacon Advertising"
echo " UUID: $UUID"
echo " Major: $MAJOR Minor: $MINOR"
sudo hciconfig $BLUETOOTH_DEVICE up
sudo hciconfig $BLUETOOTH_DEVICE leadv3
sudo hcitool -i $BLUETOOTH_DEVICE cmd 0x08 0x0008 1e 02 01 1a 1a ff 4c 00 02 15 $UUID $MAJOR $MINOR $POWER 00