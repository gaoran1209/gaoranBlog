const CONFIG = {
  HOME_BANNER_ENABLE: true,

  SITE_CREATE_TIME: '2023-01-16', // 建站日期，用于计算网站运行的第几天

  // 首页顶部通知条滚动内容，如不需要可以留空 []
  NOTICE_BAR: [
 // { title: '查看全部文章', url: 'https://blog.gaoran.xyz/archive' },
    { title: '「什么值得读」已经上线 >>', url: 'https://wiki.gaoran.xyz' }
  ],

  // 英雄区(首页顶部大卡)
  HERO_TITLE_1: '求知若饥，',
  HERO_TITLE_2: '虚心若愚',
  HERO_TITLE_3: 'gaoran.xyz',
  HERO_TITLE_4: '关于互联网|创业|产品|AI的优质好文',
  HERO_TITLE_5: '什么值得读',
  HERO_TITLE_LINK: 'https://wiki.gaoran.xyz',

  // 英雄区显示三个置顶分类
  HERO_CATEGORY_1: { title: '精选AI工具', url: '/article/ai_tools_nav' },
  HERO_CATEGORY_2: { title: '体验评测', url: '/tag/产品体验' },
  HERO_CATEGORY_3: { title: '文章归档', url: '/archive' },

  // 英雄区右侧推荐文章标签, 例如 [推荐] , 最多六篇文章; 若留空白''，则推荐最近更新文章
  HERO_RECOMMEND_POST_TAG: 'AIGC',
  HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false, // 推荐文章排序，为`true`时将强制按最后修改时间倒序

  // 右侧个人资料卡牌欢迎语，点击可自动切换
  INFOCARD_GREETINGS: [
    '🎫 点击抽奖',
    '🔍 谢谢光临，再试一次',
    '🔄 辛苦了，再试一次',
    '🏆 快得奖了，再试一次',
    '🔄 再试一次吧',
    '🧱 恭喜，奖励滚烫砖头一块！'
  ],
  INFO_CARD_URL: 'https://github.com/gaoran1209/gaoranBlog', // 个人资料底部按钮链接

  // 用户技能图标
  GROUP_ICONS: [
    {
    title_1: 'Figma',
    img_1: 'https://s1.imagehub.cc/images/2023/08/24/Figma-iOS-512x512.th.png',
    color_1: '#9F50F8',
    title_2: 'Python',
    img_2: '/images/heo/20235c0731cd4c0c95fc136a8db961fdf963071502.webp',
    color_2: '#ffffff'
    },
    {
    title_1: 'Notion',
    img_1: 'https://s1.imagehub.cc/images/2023/08/28/Notion---notes-docs-tasks-iOS-512x512.th.png',
    color_1: '#ffffff',
    title_2: 'Photoshop',
    img_2: '/images/heo/2023e4058a91608ea41751c4f102b131f267075902.webp',
    color_2: '#4082c3'
    },
    {
    
    title_1: 'Sketch',
    img_1: 'https://s1.imagehub.cc/images/2023/08/28/Sketch-Mirror-iOS-512x512.th.png',
    color_1: '#FFEDB4',
    
    title_2: 'FinalCutPro',
    img_2: '/images/heo/20233e777652412247dd57fd9b48cf997c01070702.webp',
    color_2: '#ffffff'
    },
    {
    title_1: 'Lightroom',
    img_1: 'https://s1.imagehub.cc/images/2023/08/28/Lightroom-Photo--Video-Editor-iOS-512x512.th.png',
    color_1: '#009EFA',
    title_2: 'ChatGPT',
    img_2: 'https://s1.imagehub.cc/images/2023/08/28/ChatGPT-iOS-512x512.th.png',
    color_2: '#004A4A'
    }
  ],

  SOCIAL_CARD: false, // 是否显示右侧，点击加入社群按钮
  SOCIAL_CARD_TITLE_1: '交流频道',
  SOCIAL_CARD_TITLE_2: '加入我们的社群讨论分享',
  SOCIAL_CARD_TITLE_3: '点击加入社群',
  SOCIAL_CARD_URL: 'https://docs.tangly1024.com/article/how-to-question',

  // *****  以下配置无效，只是预留开发 ****
  // 菜单配置
  MENU_INDEX: true, // 显示首页
  MENU_CATEGORY: true, // 显示分类
  MENU_TAG: true, // 显示标签
  MENU_ARCHIVE: true, // 显示归档
  MENU_SEARCH: true, // 显示搜索

  POST_LIST_COVER: true, // 列表显示文章封面
  POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  POST_LIST_SUMMARY: true, // 文章摘要
  POST_LIST_PREVIEW: false, // 读取文章预览
  POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  ARTICLE_RECOMMEND: true, // 文章关联推荐

  WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  WIDGET_ANALYTICS: false, // 显示统计卡
  WIDGET_TO_TOP: true,
  WIDGET_TO_COMMENT: true, // 跳到评论区
  WIDGET_DARK_MODE: true, // 夜间模式
  WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG
