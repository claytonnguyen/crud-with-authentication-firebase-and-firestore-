import React from 'react'
import PropTypes from 'prop-types'

function Doc(props) {
    const colonies = props.cities.then(cities => console.log(cities[0].body)).catch(err => console.log(err));
    return (
        <div>
            <h2>happiness</h2>
        </div>
    )
}

Doc.propTypes = {}

export default Doc
