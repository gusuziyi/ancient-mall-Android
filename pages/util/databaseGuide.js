// simulate DB from local Object
import shop from './shopDB.json'
import weiboDB from './weibo.json'
import cartDB from './cart.json'
let weibo = []
let cart = []
let    db = []
uni.getStorage({
    key: 'weibo',
    success: function(res) {
        weibo = res.data;
    },
    fail() {
        weibo = weiboDB
    }
});
uni.getStorage({
    key: 'cart',
    success: function(res) {
        cart = res.data;
        cart = cartDB
    },
    fail() {
        cart = cartDB
    }
});

const onAdd = function(collection, doc, cb) {
    if (collection == "weibo") {
        db = weibo
    }
    let id = collection == "weibo" ? doc.openId + doc.weiboTime : ''
    doc._id=id
    db.unshift(doc)
    uni.setStorage({
        key: collection,
        data: db,
        success: function() {
            // 在返回结果中只包含新创建的记录的 _id
            console.log('[数据库] [新增记录] 成功，记录 _id: ', id)
            db= db.sort((a,b)=>b.userMsgId-a.userMsgId)
            cb(db)
        },
        fail: err => {
            wx.showToast({
                icon: 'none',
                title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
        }
    });
}

const onSiQuery= function(collection, whereInfo, cb) {
     if (collection == "shop") {
        collection = shop
    }
    let r=[]
    collection.forEach((item, idx) => {
        for (let key in item) {
        	if(item[key].toString().indexOf(whereInfo)>-1){
                 r.push(item)
            }else if(key=='altSizes'||key=="altTypes"){
                item[key].forEach((sitem,idx)=>{
                	  if(sitem.value.toString().indexOf(whereInfo)>-1)
                	     r.push(item)
                });
            }
        }
    });
    r.length>3 ? cb(r) : cb(r.concat(collection.slice(parseInt( Math.random()*7),4-r.length)) )
}
const onQuery = function(collection, where, cb) {
    let r = []
    // not array means only find one
    let whereInfo = []
    if(Array.isArray(where)){
        whereInfo= where
    }else{
       whereInfo.push(where) 
    }
    // collection means db
    
    if (collection == "shop") {
        collection = shop
    } else if (collection == "weibo") {
        collection = weibo
    }else if (collection == "cart") {
        collection = cart
    }
    while (whereInfo.length) {
        let where = whereInfo.pop()
        let keys = []
        let values = []
        for (let key in where) {
            keys.push(key)
            values.push(where[key])
        }
        // must fit all conditions
        collection.forEach((item, idx) => {
            let isFind = true
            keys.forEach((key, i) => {
                if(key=='sellNum'){
                    if(item[key]>values[i])
                        r.push(item)
                    isFind = false 
                }else{
                   
                   if (item[key] != values[i]){
                        isFind = false 
                   }
                }
            })
            if (isFind)
                r.push(item)
        });
    }
    r.length ? cb(r) : cb([])
}

const onRemove = function(collection, _id) {
    if (collection == "weibo") {
       db = weibo
        db.forEach((weibo,idx)=>{
       	 if(weibo._id==_id){
               db.splice(idx,1)
            }
       });
        uni.setStorage({
           key: collection,
           data: db,
           success: function() {
               console.log('[数据库] [删除记录] 成功，记录 _id: ', _id)
           },
       });
    }else if (collection == "cart") {
        db = cart
        db.forEach((goodses,idx)=>{
        	 if(goodses._id==_id){
                db.splice(idx,1)
             }
        });
         uni.setStorage({
            key: collection,
            data: db,
            success: function() {
                console.log('[数据库] [删除记录] 成功，记录 _id: ', _id)
            },
        });
    }
   
}

const onEdit = function(collection, _id, newDoc,cb) {
    if (collection == "weibo") {
        db = weibo
        db.forEach((weibo,idx)=>{
        	 if(weibo._id==_id){
                weibo.userMsg=newDoc
             }
        });
         uni.setStorage({
            key: collection,
            data: db,
            success: function() {
                console.log('[数据库] [修改记录] 成功，记录 _id: ', _id)
                cb(true)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '修改记录失败'
                })
                console.error('[数据库] [修改记录] 失败：', err)
                 cb(false)
            }
        });
    }else if (collection == "cart") {
        db = cart
        db.forEach((goodses,idx)=>{
        	 if(goodses._id==_id){
                goodses.shop=newDoc.shop
             }
        });
         uni.setStorage({
           key: collection,
           data: db,
           success: function() {
               console.log('[数据库] [修改记录] 成功，记录 _id: ', _id)
           }
        })
    }
    
}

module.exports = {
    onAdd,
    onQuery,
    onRemove,
    onEdit,
    onSiQuery
}
