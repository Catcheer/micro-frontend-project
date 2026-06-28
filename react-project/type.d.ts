
// pagination

interface PageParam {
    page: number,
    pageSize: number,
}


interface IPagination {
    pageSize: number,
    current: number,
    total: number,
    onChange: (pageNo: number, pageSize: number) => void
}

interface Student {
    id: number,
    name: string,
    studentNo: string,
    phone: string,
    gender: string,
    birthday: string,
    classId: number,
    className?: string,
    createTime: string,
    updateTime: string
}

interface ClassItem {
    id: number,
    className: string,
}