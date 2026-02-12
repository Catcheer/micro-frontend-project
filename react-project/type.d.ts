
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