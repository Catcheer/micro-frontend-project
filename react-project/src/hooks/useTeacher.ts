

import { useState, useEffect } from 'react'

import {   allTeacherList } from '@/api/teacher'


const initialTeacher = {
    cheinese: [],
    math: [],
    english: [],
    // other: [],
}
export const useTeacherList = () => {
    const [teacher, setTeacher] = useState(initialTeacher)
    useEffect(() => {
        allTeacherList().then(res => {
            
            
            let cheinese = res.filter((item: any) => item.subject.find((subject: any) => subject.subjectCode === 'chiness')).map((item: any) => ({
                label: item.name,
                value: item.id
            }))
            let math = res.filter((item: any) => item.subject.find((subject: any) => subject.subjectCode === 'math')).map((item: any) => ({
                label: item.name,
                value: item.id
            }))
            let english = res.filter((item: any) => item.subject.find((subject: any) => subject.subjectCode === 'english')).map((item: any) => ({
                label: item.name,
                value: item.id
            }))
            
            setTeacher({
                cheinese: cheinese,
                math: math,
                english: english,
               
            })
            
        })
    }, [])
    return teacher
}