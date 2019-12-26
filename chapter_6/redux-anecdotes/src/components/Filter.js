import React from 'react'
import { setFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        props.dispatch(
            setFilter(event.target.value)
        )
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}

const ConnectedFilter = connect(mapStateToProps)(Filter)

export default ConnectedFilter
