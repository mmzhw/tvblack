// form表单关键词
export const VIDEO_DETAIL_KEY = {
    ID: 'id',
    AVATAR: 'avatar',
    PLAY_URL: 'playUrl',
};

// form表单显示的名称
// todo 根据实际字段显示相应的内容
export const FORM_DATA = [
    { [VIDEO_DETAIL_KEY.ID]: 'id' },
    { [VIDEO_DETAIL_KEY.AVATAR]: '头像' },
    { [VIDEO_DETAIL_KEY.PLAY_URL]: '视频预览' },
];
