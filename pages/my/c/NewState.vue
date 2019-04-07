<template>
    <view class="page">
    	<view class="page__hd">
    		<input type="text" class="q-input" placeholder-style="color:plum;text-align:center;font-size: 28rpx;" v-model="userMsg"  placeholder="发一条美美的状态吧 (๑╹ヮ╹๑)ﾉ"></input>
    		<view class='pic-div' v-if='!uploder' @tap="showUploder">
    
    			<text class="iconfont icon-plus-circle q-pic" ></text>
    		</view>
    		<view class="pic-div" v-else @tap="hiddenUploder">
    			<text class="iconfont icon-up-circle q-pic" ></text>
    		</view>
    	</view>
    	<view class="page__bd" v-if='uploder'>
    		<view class="weui-cells">
    			<view class="weui-cell">
    				<view class="weui-cell__bd">
    					<view class="weui-uploader">
    						<view class="weui-uploader__hd">
    							<view class="weui-uploader__title">亲,最多上传3张照片噢~(长按可删除照片)</view>
    							<view class="weui-uploader__info">{{files.length}}/3</view>
    						</view>
    						<view class="weui-uploader__bd">
    							<view class="weui-uploader__files" id="uploaderFiles">
    								<block v-for="(item,index) in files" :key="index">
    									<view class="weui-uploader__file" @tap="previewImage(item)" @longpress="deleteImage(index)" data-index="index" data-id="item">
    										<image class="weui-uploader__img" :src="item" mode="aspectFill" />
    									</view>
    								</block>
    							</view>
    							<view class="weui-uploader__input-box" :hidden='noMorePic'>
    								<view class="weui-uploader__input" @tap="chooseImage"></view>
    							</view>
    						</view>
    					</view>
    				</view>
    			</view>
    		</view>
    	</view>
    	<button class="q-done" @tap='doUpload'>发送</button>
    </view>
    
</template>

<script>
    import OSS from 'ali-oss';
    const crypto = require("crypto")
    const app = getApp()
    let db=require('../../util/databaseGuide')
    export default {
       data(){
           return {
               files: [], //图片缓存
               uploder: false, //是否显示上传图片界面
               noMorePic: false, //最多三张图
               userMsg: '', //微博博文,
               userMsgId: '', //id用于按时间排序
               weiboTime:''//写作时间
           }
       },
       methods: {
       		showUploder() {//是否显示上传图片界面
       			this.setData({
       				uploder: true
       			})
       		},
       		hiddenUploder(){//是否显示上传图片界面
       			this.setData({
       				uploder: false,
       				noMorePic: false,
       				files: [],
       			})
       		},
       		chooseImage: function (e) {
       			var that = this;
       			uni.chooseImage({
       				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       				success: function (res) {
       					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
       					that.setData({
       						files: that.files.concat(res.tempFilePaths)
       					});
       					if (that.files.length > 2) {
       						that.setData({
       							noMorePic: true
       						});
       					}
       				}
       			})
       		},
       		deleteImage(index) {
       			let that = this
       			let files = this.files;
       			wx.showModal({
       				title: '提示',
       				content: '确定要删除此图片吗？',
       				success: function (res) {
       					if (res.confirm) {
       						console.log('del pic');
       						files.splice(index, 1);
       					} else if (res.cancel) {
       						return false;
       					}
       					that.setData({
       						files,
                            noMorePic: false
       					});
       				}
       			})
       		},
       		previewImage: function (id) {
       			wx.previewImage({
       				current: id, // 当前显示图片的http链接
       				urls: this.files // 需要预览的图片http链接列表
       			})
       		},
       		dataURLtoBlob(dataurl){
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type:mime});
             },
            doUpload: function () {
       			const openId = app.globalData.openId
       			if(!openId){
       				wx.showToast({
       					icon: 'none',
       					title: '亲,要先登录噢~',
       				})
       				return
       			}
       			if (this.userMsg == '' && this.files == "") {
       				wx.showToast({
       					icon: 'none',
       					title: '亲,要输入内容噢~',
       				})
       				return
       			}
       			let that = this
       			// 选择图片
       			let userMsgId = Date.now()
       			let d=new Date(),
       				year=d.getFullYear(),
       				month=d.getMonth()+1,
       				day=d.getDate()
       			let weiboTime=year+'/'+month+'/'+day
       			this.setData({
       				userMsgId,
       				weiboTime
       			})
       			if(this.files == ""){ //没有图片,只传文字
       				this.addIntoDB()
       			} else{ //否则递归传图
       				let successUp = 0; //成功
       				let failUp = 0; //失败
       				let imgPaths = this.files
       				let length = imgPaths.length; //总数
       				let count = 0; //第几张
       				let cloudImgUrls = [] //存放云端图片路径
       				that.uploadOneByOne(cloudImgUrls, imgPaths, successUp, failUp, count, length);
       			}
       		},
       		async uploadOneByOne(cloudImgUrls, imgPaths, successUp, failUp, count, length) {
       			let that = this;
       			wx.showLoading({
       				title: '上传第' + (count+1) + '张',
       			})
       			const openId = app.globalData.openId,
       				  userMsgId = that.userMsgId
       			const filePath = imgPaths[count]
                //生成前端签名signature
                let OSS_INFO = require('./cfg.js')
                const policyString = JSON.stringify(OSS_INFO.OSS_POLICY)
                let base64Policy = Buffer.from(policyString).toString('base64')
                const signature = crypto.createHmac('sha1',OSS_INFO.OSS_accessKeySecret).update(base64Policy).digest("base64")
              
                let cloudUrl=OSS_INFO.OSS_BASE+'/'+'weibo/'+openId+userMsgId + '-' + count
                uni.uploadFile({
                   url: OSS_INFO.OSS_BASE,
                   filePath,
                   name: 'file', 
                   formData: {  
                        'key': 'weibo/'+openId+userMsgId + '-' + count, // 文件名  
                        'policy': base64Policy,  
                        'OSSAccessKeyId': OSS_INFO.OSS_accessKeyId,  
                        'signature': signature,  
                        'success_action_status': '200',  
                    },
                    method:'put',
                	success: (res) => {
                		cloudImgUrls.push({fileID:cloudUrl})
                		uni.showToast({
                			title: '上传成功',
                			icon: 'success',
                			duration: 1000
                		})
                        successUp++
                	},
                    complete: function (e) {
                    	count++; //下一张
                    	if (count == length) {
                    		console.log('上传图片成功' + successUp );
                    		that.addIntoDB(cloudImgUrls) //上传数据库,更新虚拟dom
                    		
                    	} else {
                    		//递归调用，上传下一张
                    		that.uploadOneByOne(cloudImgUrls, imgPaths, successUp, failUp, count, length);
                    		console.log('正在上传第' + count + '张', cloudImgUrls);
                    	}
                    }
                });
            },
       		addIntoDB(urls=[]){ //上传数据库,更新虚拟dom
       			const openId = app.globalData.openId,
       				userMsgId = this.userMsgId,
       				weiboTime=this.weiboTime,
       				userMsg=this.userMsg,
       				cloudImgUrls=urls
       			let weibo = {
       				openId,
       				userMsgId,
       				weiboTime,
       				userMsg,
       				cloudImgUrls
       			}
       			this.setData({
       				files: [],
       				uploder: false,
       				noMorePic: false,
       				userMsg: '',
       				userMsgId: ''
       			})
       			db.onAdd('weibo',weibo,res=>{
       				wx.showToast({
       					title: '发布成功' ,
       					icon: 'success',
       					duration: 2000
       				})
       				app.globalData.weibos = res;
                    this.$emit('updateWeibos')
       			}) //collection,doc
       		}
       	}
       
    }
</script>

<style scoped="">
    @import '../src/newstate.css'
</style>
