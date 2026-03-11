import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {isExcelWordFile, isImgFile, random} from "xin-antd3-ui";

/**
 * 文件上传
 */
Mock.mock(`${VITE_BASE_URL}/file/upload`, 'post', ({body}) => {
    const fileNames = ['文件5', '文件6', '文件7'];
    const paths = [
        'uploadfiles/20230415/b77e01b7a4934870af57cee2afeed1be.jpg',
        'uploadfiles/20230415/f1ae1742607947c3af924fab72190afd.docx',
        'uploadfiles/20230415/782a73f16f104b29a6ef26a20cfb3152.txt',
    ];
    const file = body.get('file');
    let index = 2;
    if (isImgFile(file.name)) index = 0;
    else if (isExcelWordFile(file.name)) index = 1;

    let result = {
        code: 0,
        message: 'success',
        data: {
            id: random(1, 999999),
            fileName: '文件5',
            filePath: paths[index],
        },
    };
    return result;
});

/**
 * 上传base64文件
 */
Mock.mock(`${VITE_BASE_URL}/file/upload/base64`, 'post', ({body}) => {
    let result = {
        code: 0,
        message: 'success',
        data: 'uploadfiles/20230415/b77e01b7a4934870af57cee2afeed1be.jpg',
    };
    return result;
});

/**
 * 下载文件
 */
Mock.mock(`${VITE_BASE_URL}/download`, 'post', ({body}) => {
    let result = {
        code: 1,
        message: '文件不存在',
        data: '',
    };
    return result;
});
