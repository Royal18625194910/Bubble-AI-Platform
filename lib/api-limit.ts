import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
    const { userId } = auth()

    // 若未登录，则直接返回
    if (!userId) return

    // 登录则取出登录的userId
    const user = await prismadb.userApiLimit.findUnique({
        where: {
            userId,
        },
    })

    // 若不存在，则将count置为1
    if (!user) return await prismadb.userApiLimit.create({
        data: {
            userId,
            count: 1,
        },
    })

    console.log(user);
    

    // 存在则count + 1
    await prismadb.userApiLimit.update({
        where: {
            userId,
        },
        data: {
            count: user.count + 1,
        },
    })
}

// 检查是否超过限制
export const checkApiLimit = async () => {
    // 取出userId
    const { userId } = auth()
    // 未登录则返回false
    if ( !userId ) return false
    // 根据userId取出user
    const user = await prismadb.userApiLimit.findUnique({
        where: {
            userId,
        },
    })
    // 若无user或count < MAX_FREE_COUNTS返回true
    if ( !user || user.count < MAX_FREE_COUNTS ) return true
    // 有且则返回false
    return false
}

export const getApiLimit = async () => {
    const { userId } = auth()

    if ( !userId ) return 0

    const user = await prismadb.userApiLimit.findUnique({
        where: {
            userId,
        },
    })


    if ( !user ) return 0

    console.log(user.count);
    

    return user.count
}