/*
 * zh_cn.js
 * -----------
 * i18n
 * -----------
*/

module.exports = {
    initTitle: "Bangumi to Watch",
    day: {
        Monday: "周一",
        Tuesday: "周二",
        Wednesday: "周三",
        Thursday: "周四",
        Friday: "周五",
        Saturday: "周六",
        Sunday: "周日",
        today: "今天"
    },
    layer: {
        yes: "确认",
        no: "取消"
    },
    control: {
        resetMain: "要重置应用吗？",
        resetSub: "将清除本应用已保存的所有数据。",
        deleteMain: "确定要删除吗？",
        modifyTitle: "修改标题文字",
        recordsFull: "记录数已达上限（99）"
    },
    tips: {
        reminderNone: '点击右下方的<i class="icon-program"></i>可以切换到节目单。'
    },
    help: {
        reminders: [
            '<p>本页是“节目提醒”。</p>',
            '<p>看完一个节目后，勾选<i class="icon-check-empty"></i>来表明你已经完成。</p>',
            '<p>上方的标题双击或长按可以编辑。</p>',
            '<p>右下方的<i class="icon-program"></i>可以切换到“节目单”。</p>'
        ].join(""),

        program: [
            '<p>本页是“节目单”。</p>',
            '<p>添加你感兴趣的节目到一周的七天。</p>',
            '<p><i class="icon-plus"></i>添加节目&nbsp;&nbsp;<i class="icon-trash"></i>删除节目</p>',
            '<p>双击或长按节目可以编辑节目。</p>',
            '<p>右下方的<i class="icon-back"></i>可以返回到“节目提醒”。</p>'
        ].join("")
    }
};