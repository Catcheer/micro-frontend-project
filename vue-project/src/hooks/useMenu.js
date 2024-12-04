

export default function useMenu() {
    let menuList =[
        {
            title:'首页',
            path:'/',
            icon:'House'
        },
        {
            title:'系统管理',
            path:'/sys',
            icon:'Setting',
            children:[
                {
                    title:'菜单管理',
                    path: '/sys/MenuManagement',
                },
                {
                    title:'字典管理',
                    path: '/sys/DicManagement',
                },
                {
                    title:'日志管理',
                    path: '/sys/LogManagement',
                }
            ]
        },
        {
            title:'关于我们',
            path:'/about',
             icon:'document'
        }
    ]

    return {
        menuList
    }
}