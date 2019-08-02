<template>
  <div class="about">
    <div class="module">
      <div class="module-name">项目</div>
      <div class="module-main">
        <div class="project" v-for="(project, index) in projectList" :key="index" target="_blank">
          <div class="project-logo" :style="`background-image: url(${project.logo})`">
            <div class="project-platformlist">
              <a
                class="project-platform"
                v-for="(platform, index) in project.platformList"
                :key="index"
                :href="platform.href"
                target="_blank">{{platform.name}}</a>
            </div>
          </div>
          <span class="project-name">{{project.name}}</span>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="module-name">组织</div>
      <div class="module-main">
        <a class="project" v-for="(org, index) in orgList" :key="index" :href="org.href" target="_blank">
          <img class="project-logo" :src="org.logo"/>
          <span class="project-name">{{org.name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'page',

  head () {
    return {
      title: '关于'
    }
  },

  data() {
    return {
      projectList: [
        {
          name: '集盒商城',
          logo: require('../assets/images/logos/jihe.png'),
          platformList: [
            {
              name: 'h5',
              href: '//m.jiheapp.com'
            }
          ]
        },
        {
          name: '微学',
          logo: require('../assets/images/logos/weixue.png'),
          platformList: [
            {
              name: 'h5',
              href: '//m.eweixue.com'
            },
            {
              name: '企业端',
              href: '//pc.eweixue.com'
            },
            {
              name: '机构端',
              href: '//agency.eweixue.com'
            }
          ]
        },
        {
          name: '村书',
          logo: require('../assets/images/logos/cunshu.png'),
          platformList: [
            {
              name: '平台端',
              href: '//platform.gongtongti.com.cn'
            },
            {
              name: '乡镇端',
              href: '//town.gongtongti.com.cn'
            },
            {
              name: '村民端',
              href: '//village  .gongtongti.com.cn'
            }
          ]
        },
        {
          name: '亲清帮',
          logo: require('../assets/images/logos/qinqingbang.png'),
          platformList: [
            {
              name: '平台端',
              href: '//platform.goingtowin.com'
            },
            {
              name: '政府管理端',
              href: '//manage.goingtowin.com'
            }
          ]
        },
        {
          name: '超级老板',
          logo: require('../assets/images/logos/chaojilaoban.png'),
          platformList: [
            {
              name: '微信小程序',
            }
          ]
        },
        {
          name: '情绪指数',
          logo: require('../assets/images/logos/qingxuzhishu.png'),
          platformList: [
            {
              name: '钉钉微应用',
            }
          ]
        },
        {
          name: '食色范',
          logo: require('../assets/images/logos/shisefan.png'),
          platformList: [
            {
              name: '微信小程序',
            }
          ]
        }
      ],

      orgList: [
        {
          name: 'HZFE',
          logo: require('../assets/images/logos/hzfe.png'),
          href: '//hzfe.org'
        }
      ]
    }
  }
}
</script>

<style lang="less">
.about {
  text-align: center;

  .module {

    & + .module {
      margin-top: 48px;
    }

    .module-name {
      font-size: 24px;
      font-weight: bold;
    }

    .module-main {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .project {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 24px;

        &:hover {
          .project-logo {
            .project-platformlist {
              transition: all .3s;
              opacity: 1;
            }
          }
        }

        .project-logo {
          width: 100px;
          height: 100px;
          border-radius: 5px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;

          .project-platformlist {
            opacity: 0;
            background: rgba(0, 0, 0, .8);
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;

            .project-platform {
              font-size: 12px;
              line-height: 20px;
              height: 20px;
              width: 80px;
              color: #56d398;
              border: 1px solid #56d398;
              border-radius: 20px;
            }
          }
        }

        .project-name {
          font-weight: bold;
          margin-top: 12px;
        }
      }
    }
  }  
}
</style>
