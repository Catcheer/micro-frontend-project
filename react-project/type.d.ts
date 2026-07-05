
// pagination



interface SearchField {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    options?: any[];
}


interface PageSchema {
    searchFields: Array<SearchField>;
    initSearchParams: Record<string, any>;
    editFields:Array<Record<string, any>>;
   
    columns: Array<Record<string, any>>;
    toolbar: {
        add: boolean;
        import?: boolean;
        export?: boolean;
        addPermission?: string;
        importPermission?: string;
        exportPermission?: string;
    }
}


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