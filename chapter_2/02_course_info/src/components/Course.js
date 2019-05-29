import React from 'react'

const Course = ({ course }) => {
    return (
        <div>{course.name}, {course.exercises}</div>
    )
}

export default Course