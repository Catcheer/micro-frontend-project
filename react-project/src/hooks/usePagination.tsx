import React, { useState, useCallback } from 'react';


export default function usePagination(initPage = 1, initPageSize = 10) {
    //   const [page, setPage] = useState(initPage);
    //   const [pageSize, setPageSize] = useState(initPageSize);
    //   const [total, setTotal] = useState(0);
    //   const [loading, setLoading] = useState(false);

    //   const handlePageChange = (page, pageSize) => {
    //     setPage(page);
    //   }

    const onPageChange = useCallback((page: number, pageSize: number) => {
        console.log('onPageChange', page, pageSize)
        console.log(page, pageSize)
        setPagination({
            ...pagination,
            current: page,
            pageSize: pageSize
        })
    }, [])
    const [pagination, setPagination] = useState<IPagination>({
        pageSize: initPageSize,
        current: initPage,
        total: 10,
        onChange: onPageChange
    })

    return {pagination,setPagination}
}