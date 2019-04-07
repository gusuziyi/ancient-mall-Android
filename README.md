# 一次微信小程序向安卓移植的实践

四月，开始学习uniApp，这是一个拥有vue外表和native内核的框架，能够使用vue开发App，我在学习的过程中也对以前写过的《美妆小铺小程序版》进行了移植。这期间积累了一定的移植和兼容适配经验。

> 由于个人无法申请到微信开放平台账号，所以分享到微信，微信账号登录这二个功能模块尽管已经在安卓模拟机上已经全部跑通，但由于无法打包到App，所以看起来是不可用的，代码没有问题。而视频直播功能由于涉及到流传输，我认为以我目前的水平尚不足以完成，所以暂时搁浅。同时在移植过程中，由于兼容性的问题，对原有功能做了少量阉割。


技术栈：
框架：uniApp，前端：vue，后端：native，云端：阿里云OSS

- 图片预览：[美妆小铺功能界面](https://gusuziyi.github.io/ancientBeauty/)
- 下载地址：[百度网盘链接](https://pan.baidu.com/s/176dGtudLXIg-lUKdeNdOgQ)   提取码：6ype
- 下载源代码 ：[项目源代码](https://github.com/gusuziyi/ancient-mall-Android)
- 下载二维码 ：
![app下载二维码](https://upload-images.jianshu.io/upload_images/2770403-016f095ea8aff372.png)

**关于这个App的一些链接介绍：**

- 点击查看 [微信小程序移植安卓App的一些经验](https://www.jianshu.com/p/fb0f81152174).
- 点击查看 [小程序中的腾讯云如何迁移到阿里云](https://www.jianshu.com/p/b5132ee3a82a).
- 点击查看 [小程序中的微信登录在安卓App中的写法](https://www.jianshu.com/p/2864231b80c3).
- 点击查看 [我的前端转行之路](https://www.jianshu.com/p/902d29e84c1f).


