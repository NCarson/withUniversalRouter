import React from "react";
import PropTypes from "prop-types";

import URI from 'urijs'

import history from './history'


function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {

    static propTypes = {
        to: PropTypes.string.isRequired,
        target: PropTypes.string,
        onClick: PropTypes.func,
    }

	handleClick(event) {
		if (this.props.onClick) this.props.onClick(event);

		if (
			!event.defaultPrevented && // onClick prevented default
			event.button === 0 && // ignore everything but left clicks
			!this.props.target && // let browser handle "target=_blank" etc.
			!isModifiedEvent(event) // ignore clicks with modifier keys
		) {
			event.preventDefault();
            const uri = URI(this.props.to)
			history.push(uri.pathname() + uri.search())
		}
	}

	render() {
		const { to, active, ...props } = this.props
        if (active) {
            return (
                <a className='router-link active'
                    onClick={event => this.handleClick(event)}
                    href={to}
                    {...props}
                >
                    {props.children}
                </a>
            )
        } else {
            return(
                <div className='router-link inactive' style={{display:'inline'}}>
                    {props.children}
                </div>
            )
        }
	}
}
Link.propTypes = {
    to: PropTypes.string.isRequired,
    active:PropTypes.bool,
}
Link.defaultProps = {
    active: true
}
export default Link
