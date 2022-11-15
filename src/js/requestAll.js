// 限制并发数为3的异步请求
import Axios from 'axios';
export async function request(dataList) {
    const poll = []
    const limit = 3
    const url = ''
    const resList = []
    const errList = []

    const len = dataList.length
    const extra = len % limit
    const isFit = extra === 0
    // 处理成2维数组
    for (let i = 0; i < len; i++) {
        const params = dataList[i]
        poll.push({ no: i, res: Axios.get(url, params) })
        try {
            if (poll.length === limit || (isFit && len - 1 - i === extra)) {
                const res = await Promise.all(poll)
                resList.push(res)
                poll.length = 0
            }
        } catch (error) {
            // 请求失败的列表
            errList.push(...poll)
            poll.length = 0
        }
    }

    // 对于失败的结果如何处理
    if (errList.length) {

    }
    for (let i = 0; ress < resList[i++];) {
        ress.forEach(res => {
            // 处理结果
        });
    }
}