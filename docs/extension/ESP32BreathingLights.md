# ESP32 + WS2812B灯带实现呼吸灯

## 前言
之前不是双十一到了麻，本来想搞一台炫酷的主机和显示器开始我的快乐永劫生活。但是吧，就真的，有点贵，半夜辗转反侧，对于一个永劫菜鸟来说，我不太配花这个钱。于是我最终放弃了驰骋永劫世界的想法，但是炫酷的主机我买不了，我搞一条炫酷的主机灯带总没问题吧（装饰现有的笔记本）。

说干就干，首先就是选择灯带方案。阿，你说啥？为什么不直接上淘宝买现成的灯带？，原因很简单，贵呀，而且不能二次定制。所以最实惠的当然是自己买开发板和灯带进行定制，捣鼓捣鼓就可以新鲜出炉了。

其次这篇文章是纯小白教程，有错欢迎留言纠正。

## 实现效果
视频地址：https://www.bilibili.com/video/BV1j34y1d7kr?spm_id_from=333.851.dynamic.content.click

## 准备工作-开发方案
开发工具：VSCode

开发语言：C/C++

VsCode插件：PlatformIO IDE

## 准备工作-材料
开发板：ESP32 DevKitC(WROOM-32D) Type-C接口，一个

灯带：WS2812B灯带，一条(建议5m，可以裁剪)

杜邦线：公对母类型，母对母类型，若干

数据线：Type-C，一条

电源头：5V/3A，一个(比如树莓派充电头)

固定扣：自粘式小块固定扣，若干

## 制作过程-C/C++环境搭建
> 这是一个最容易劝退小白的步骤，因为问题就像糟糕的心情，总会不期而遇。

### MAC/Linux
这两个系统都自带了c/c++的编译器，可以直接忽略环境搭建。

### Windows
#### 下载MinGW
> 直接下载MinGW最新版本进行安装即可，安装选项默认即可。同时需要你复制默认安装的地址，需要用于环境配置。

下载地址：http://win-builds.org/doku.php/download_and_installation_from_windows

#### 配置环境变量
> 因为我没有windows主机，这部分推荐去B站上找教程学习。

- 在桌面上寻找到电脑图标
- 选中电脑图标，右击"属性"
- 在弹出窗口中点击"高级系统设置"
- 在接着弹出的窗口中点击"高级”->"环境变量"
- 在新窗口上找到名称为"Path"，选中该变量，然后点击编辑变量。把MinGW默认安装的地址复制进去，未完！还需要在地址后面加上 \bin 
- 最后打开CMD工具，输入gcc -v查看环境是否配置成功

## 制作过程-VSCode开发环境搭建
### 打开VSCode，点击插件商店

![截屏2021-11-14 下午5.38.34.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69a09c670e7745b2b5c6b38b20b06475~tplv-k3u1fbpfcp-watermark.image?)

### 搜索PlatformIO IDE插件并安装

![截屏2021-11-14 下午5.37.54.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8797aab872c497a9562c6a25e67ab59~tplv-k3u1fbpfcp-watermark.image?)

## 制作过程-Arduino工程创建
### 新建Arduino工程
> 进入PlatformIO主页新建工程，工程具体内容参考图片即可，安装位置选中默认即可，新建好后会自动跳到工程目录。也可以在PlatformIO主页的Projects模块中找到工程。

![截屏2021-11-14 下午5.47.04.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0dd26ed0845d4180a7a04e1b5e015574~tplv-k3u1fbpfcp-watermark.image?)

![截屏2021-11-14 下午5.50.00.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a9d9ac3049d4495b88bbe45b2e94cc7~tplv-k3u1fbpfcp-watermark.image?)
### 安装Adafruit NeoPixel库

![截屏2021-11-14 下午5.55.04.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4645ae110d424f728abb45a91adda117~tplv-k3u1fbpfcp-watermark.image?)

![截屏2021-11-14 下午5.57.03.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4c000e6126b44549de74cc68e0be317~tplv-k3u1fbpfcp-watermark.image?)

![截屏2021-11-14 下午5.58.04.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/498f63d917384db785157bcf2f47c5f9~tplv-k3u1fbpfcp-watermark.image?)
### 复制代码到main.cpp文件中
#### 代码
> 已经有大佬写好了代码，参考如下。

```c

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

#define PIN 23

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(300, PIN, NEO_GRB + NEO_KHZ800);

// IMPORTANT: To reduce NeoPixel burnout risk, add 1000 uF capacitor across
// pixel power leads, add 300 - 500 Ohm resistor on first pixel's data input
// and minimize distance between Arduino and first pixel.  Avoid connecting
// on a live circuit...if you must, connect GND first.



// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}


// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if(WheelPos < 85) {
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if(WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}

void rainbow(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256; j++) {
    for(i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i+j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

// Slightly different, this makes the rainbow equally distributed throughout
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256*5; j++) { // 5 cycles of all colors on wheel
    for(i=0; i< strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

//Theatre-style crawling lights.
void theaterChase(uint32_t c, uint8_t wait) {
  for (int j=0; j<10; j++) {  //do 10 cycles of chasing
    for (int q=0; q < 3; q++) {
      for (uint16_t i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, c);    //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (uint16_t i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}

//Theatre-style crawling lights with rainbow effect
void theaterChaseRainbow(uint8_t wait) {
  for (int j=0; j < 256; j++) {     // cycle all 256 colors in the wheel
    for (int q=0; q < 3; q++) {
      for (uint16_t i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, Wheel( (i+j) % 255));    //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (uint16_t i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}

void clear(){
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, 0); 
    delay(10);
  }
}

//流星
void meteor(uint8_t red, uint8_t green, uint8_t blue, uint8_t wait) {
  const uint8_t num = 15;
  uint8_t max_color = red;
  if(green > max_color)
    max_color = green;
  if(blue > max_color)
    max_color = blue;
  uint8_t instance = (max_color-200)/num;
  for(uint16_t i=0; i<strip.numPixels() + num; i++) {
    for(uint8_t j = 0; j < num; j ++){
      if(i - j >= 0 && i - j < strip.numPixels()){
        int red_after = red - (instance * j);
        int green_after = green - (instance * j);
        int blue_after = blue - (instance * j);
        
        if(j>=1){
          red_after -= 200;
          green_after -= 200;
          blue_after -= 200;
        }
        strip.setPixelColor(i - j, strip.Color(red_after >= 0 ? red_after : 0, green_after >= 0 ? green_after : 0, blue_after >= 0 ? blue_after : 0));
      }
    }
    if(i - num >= 0 && i-num < strip.numPixels())
      strip.setPixelColor(i-num, 0); 

    strip.show();
    delay(wait);
  }
}

void meteor_overturn(uint8_t red, uint8_t green, uint8_t blue, uint8_t wait) {

  const uint8_t num = 15;
  uint8_t max_color = red;
  if(green > max_color)
    max_color = green;
  if(blue > max_color)
    max_color = blue;
  uint8_t instance = (max_color-200)/num;
  for(int i=strip.numPixels() - 1; i>=-num; i--) {
    for(uint8_t j = 0; j < num; j ++){
      if(i + j >= 0 && i + j < strip.numPixels()){
        int red_after = red - instance * j;
        int green_after = green - instance *  j;
        int blue_after = blue - instance *  j;
        if(j>=1){
          red_after -= 200;
          green_after -= 200;
          blue_after -= 200;
        }
        strip.setPixelColor(i + j, strip.Color(red_after >= 0 ? red_after : 0, green_after >= 0 ? green_after : 0, blue_after >= 0 ? blue_after : 0));
      }
    }
    if(i + num >= 0 && i+num < strip.numPixels())
      strip.setPixelColor(i+num, 0); 

    strip.show();
    delay(wait);
  }
}




void setup() {
  // This is for Trinket 5V 16MHz, you can remove these three lines if you are not using a Trinket
  #if defined (__AVR_ATtiny85__)
    if (F_CPU == 16000000) clock_prescale_set(clock_div_1);
  #endif
  // End of trinket special code

  strip.begin();
  strip.setBrightness(100);
  strip.show(); // Initialize all pixels to 'off'
}

void loop() {
  // 递进渐变
  // Some example procedures showing how to display to the pixels:
  // colorWipe(strip.Color(255, 0, 0), 20); // Red
  // colorWipe(strip.Color(0, 255, 0), 20); // Green
  // colorWipe(strip.Color(0, 0, 255), 20); // Blue

  // 交叉突变
  // Send a theater pixel chase in...
  // theaterChase(strip.Color(127, 127, 127), 50); // White
  // theaterChase(strip.Color(127, 0, 0), 50); // Red
  // theaterChase(strip.Color(0, 0, 127), 50); // Blue

  // 整体渐变
  rainbow(12);

  // 呼吸灯效果(rainbow进阶版本)
  // rainbowCycle(10);
 
  // 交叉突变 + 整体渐变(rainbow进阶版本)
  // theaterChaseRainbow(50);

  // 流星
  // clear();
  // meteor(255, 0, 0, 10);
  // meteor_overturn(255, 0, 0, 10);
}
```
### 代码修改注意点
> 需要指定IO脚和灯的数量，IO脚默认23即可，灯的数量根据你需要连接的灯带确定。一米WS2812有60个灯，计算总数然后替换上去即可。

![截屏2021-11-14 下午6.02.53.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b368573a579407288583264b20dfac5~tplv-k3u1fbpfcp-watermark.image?)

## 烧录-连接ESP32开发板
> 开发板通过数据线连接上电脑，在PlatformIO主页的Devices模块可以看到新出现的设备(具体名称根据系统有区别)。(因为ESP大部分开发板内置了驱动，所以应该是不需要再去进行驱动安装。)

![截屏2021-11-14 下午6.08.10.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b78eaf3767a0488d8b355bb8005090ce~tplv-k3u1fbpfcp-watermark.image?)
## 烧录-编译和烧录Arduino工程
> PlatformIO插件提供了方便操作的按钮，先完成1.编译工程后进行2.烧录工程即可

![截屏2021-11-14 下午6.11.10.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d3ab19cf319422a9345fd0097255271~tplv-k3u1fbpfcp-watermark.image?)
## 烧录-开发板连接灯带
> ESP32开发板 IO口文档
![截屏2021-11-14 下午6.18.01.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c86cfee9001043658b845c310b3ab893~tplv-k3u1fbpfcp-watermark.image?)

> 前面提到我们定义的IO脚是23，同时灯带头应该是有三根线，分别是红绿白。连接ESP32开发板时，白线需要接地，红线接电源，绿线接我们定义的IO口即可。连接的时候先将灯带的线使用杜邦线连上，起到延长线的作用，然后再使用杜邦线连接ESP开发板即可。

![截屏2021-11-14 下午6.19.56.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cadc99ac1a9461cb1c186cf0dcf6e83~tplv-k3u1fbpfcp-watermark.image?)

> 效果图

![截屏2021-11-14 下午6.28.08.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7ff38c1fca94942b69c24b70d002c28~tplv-k3u1fbpfcp-watermark.image?)

## 总结
制作过程其实很简单，毕竟连灯光算法都不是自己写的。但是最后实现的效果总是不错的，希望下次能够自己实现更好的玩意。
## 常见问题
### 为什么选择Arduino框架而不是官方的ESP-IDF框架？
新手入门最重要的是开箱即用，ESP-IDF框架相对Arduino框架更加偏向底层一些，Arduino框架使用一些成熟的库可以更快实现应用，就算遇到问题也能得到社区很好的支持。学习由浅入深，可以先由比较通用的方式入手进行学习比较好。

## 参考资料
- [ESP32-DevKitC V4 入门指南](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/hw-reference/esp32/get-started-devkitc.html)
- [ESP32-WROOM-32D/32U技术规格书](https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32d_esp32-wroom-32u_datasheet_cn.pdf)
- [乐鑫官方课程主页](https://www.espressif.com/zh-hans/ecosystem/iot-college/courses)
- [Adafruit_NeoPixel库](https://github.com/adafruit/Adafruit_NeoPixel)
- [串行通信程序Minicom](https://wiki.emacinc.com/wiki/Getting_Started_With_Minicom)
- [个人博客(代码来源)](https://blog.csdn.net/limingnanhai/article/details/120784180?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link)
- [B站up主(学习基础)](https://www.bilibili.com/video/BV1tv411w74d?p=2)