<template>
  <div class="friends">
    <a class="friend" v-for="(friend, index) in friends" :key="index" :href="friend.link">
      <image-input :src="friend.avatar" width="66px" height="66px" radius="66px"></image-input>
      <div class="friend-info">
        <div class="name">{{friend.name}}</div>
        <div class="intro">{{friend.intro}}</div>
      </div>
    </a>
  </div>
</template>

<script>
import imageInput from '~/components/imageInput'

export default {
  layout: 'page',

  head () {
    return {
      title: '友链'
    }
  },

  data() {
    return {
      friends: [
        {
          avatar: '//wx1.sinaimg.cn/large/a3fb75bfgy1fhjo0qoykvj20e80e8wfs.jpg',
          name: '阿瓜',
          intro: '阿瓜阿瓜顶瓜瓜',
          link: '//digua.me'
        },
        {
          avatar: '//avatars2.githubusercontent.com/u/19499958?v=3&s=100',
          name: '阿绿',
          intro: '小米大佬欧阳浩',
          link: '//oyhfe.com/'
        },
        {
          avatar: '//avatars0.githubusercontent.com/u/13888962',
          name: '阿夜',
          intro: '靠聊天月入百万的宅男',
          link: 'https://nightcat.win'
        },
        {
          avatar: '//wenqy.com/logo_xwzj.png',
          name: '行走在猿类世界',
          intro: '行走在猿类世界',
          link: '//wenqy.com'
        },
        {
          avatar: '//ofyaji162.bkt.clouddn.com/touxiang.jpg',
          name: '阿盖',
          intro: '很骚的老实人',
          link: '//xyxiao001.github.io/vue-blog/'
        },
        {
          avatar: '//ww4.sinaimg.cn/mw690/5eaec197gw1fbdfptvjnfj20cf0cfgmr.jpg',
          name: '阿树',
          intro: '什么都会，还有一个美国女朋友',
          link: '//geeku.net'
        },
        {
          avatar: '//tva2.sinaimg.cn/crop.40.22.507.507.180/9e56d277jw8fayq9lyt7qj20f80pewgh.jpg',
          name: '阿丹',
          intro: '主职：歌手，副业：前端',
          link: '//funnycoder.lofter.com/'
        },
        {
          avatar: '//avatars2.githubusercontent.com/u/7876498?v=3&s=100',
          name: '阿鱼',
          intro: 'everyone作者',
          link: '//blog.wanan.me/'
        },
        {
          avatar: '//avatars1.githubusercontent.com/u/5457564?v=3&s=100',
          name: '阿爆',
          intro: '爆栈大佬，尤其是PHP，爱哭的男子',
          link: '//www.daryl.red/'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a44a23886.png',
          name: '阿兔',
          intro: 'node大佬，著名暖男，钻石王者',
          link: '//www.noder.club/'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a8cc9802d.png',
          name: '抽筋的葡萄',
          intro: '',
          link: '//www.choujindeputao.com'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a8a2081fd.png',
          name: '花花丹',
          intro: '',
          link: '//daphnechang.github.io/'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a6b91281c.jpg',
          name: '羡辙',
          intro: '',
          link: '//zhangwenli.com/'
        },
        {
          avatar: '//avatars1.githubusercontent.com/u/1856466?v=3&s=200',
          name: 'Havee\'s Space',
          intro: '',
          link: '//havee.me/'
        }
      ]
    }
  },

  components: {
    imageInput
  }
}
</script>

<style lang="less">
.friends {
  max-width: 768px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;


  .friend {
    display: flex;
    width: 50%;
    margin-bottom: 20px;

    .image-input {
      margin-right: 10px;
    }

    .name {
      font-size: 18px;
      font-weight: bold;
    }

    .intro {
      font-size: 14px;
      color: #646464;
    }
  }
}

@media (max-width: 768px) {
  .friends {
    .friend {
      width: 100%;
    }
  }
}
</style>
