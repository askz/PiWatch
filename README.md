
![PiWatch Logo](https://raw.githubusercontent.com/askz/PiWatch/master/public/img/fav_piwatch_logo2.png)
Run PiWatch
===

Getting the essentials
---
1. Install nodejs.
2. Clone PiWatch repo ```git clone https://github.com/askz/PiWatch.git```
3. Run ```npm install``` within the PiWatch directory. (You'll have to install libcurl before this)
4. Plug your USB Webcam, be sure that it is compatible w/ Motion (http://www.ideasonboard.org/uvc/). You can also attach IP Camera, but we currently don't support it automatically, you'll need to edit ```motion/motion.conf``` (refer to motion documentation)
5. Run ```node bin/www```
6. Enjoy !


TODO
---

1. Refactor code
2. Auto install script, with auto-configuration
3. Make all switches work
4. Infinite things..