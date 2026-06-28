import { useState, useEffect } from 'react'

import { getClassList } from '@/api/student'

export type ClassOption = {
    label: string
    value: number
}

export const useStudentClass = () => {
    const [classOptions, setClassOptions] = useState<ClassOption[]>([])

    useEffect(() => {
        getClassList().then((data) => {
            const list = Array.isArray(data) ? data : []
            setClassOptions(
                list.map((item: ClassItem) => ({
                    label: item.className,
                    value: item.id,
                }))
            )
        })
    }, [])

    return classOptions
}
