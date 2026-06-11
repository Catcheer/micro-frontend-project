

import { useState, useEffect } from 'react'

import { getClassList} from '@/api/student'


export const useStudentClass = () => { 

    const [classList, setClassList] = useState([])
    useEffect(() => { 
        getClassList().then(data => {
            console.log(data)
            setClassList(data)
        })
    }, [])

    return classList


}