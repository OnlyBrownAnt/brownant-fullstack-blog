# FFmpeg

> 一个完整的跨平台解决方案，用于录制、转换和流式传输音频和视频。

## 文档

- [FFmpeg主页](https://ffmpeg.org/)
- [FFmpeg教程-知乎](https://zhuanlan.zhihu.com/p/145592911)

## 常用命令

## 视频格式转换

```shell
ffmpeg -i input.mov output.mp4
```

## 视频转码

```shell
# -vcodec 指定视频编码器，-acodec 指定音频编码器
ffmpeg -y -i input.mp4 -vcodec libx264 -acodec copy output.mp4
```

## 视频拼接

可以将几个视频拼接成一个视频 -f 表示采用concat协议，-c 表示采用什么编码器 copy表示不重新编码，如果是x264 表示将采用x264进行重新编码。videolist.txt指的是视频文件列表

```shell
ffmpeg -y -f concat -i videolist.txt -c copy  output.mp4
```

videolist.txt格式要求: (视频需要是相同的视频编码格式，要不然会失败或者转换出的视频是黑屏)
file file1.mp4
file file2.mp4

## 从视频中获取音频

```shell
ffmpeg -y -i source.mp4 -vn output.wav
```

## 总结
