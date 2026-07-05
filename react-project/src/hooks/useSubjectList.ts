
import { useState, useEffect } from 'react'

import { getSubjectList } from '@/api/subject'

export const useSubjectList = () => {
    const [subjectList, setSubjectList] = useState([])
    useEffect(() => {
        getSubjectList().then(res => {
            
            // setSubjectList(res.data)
            let list = res.map((item: any) => {
                
                return {
                    label: item.subjectName,
                    value: item.id
                }
            })
            setSubjectList(list)
        })
    }, [])
    return subjectList
}