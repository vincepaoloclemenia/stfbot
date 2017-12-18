import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FlashMessageJson extends React.Component{
    constructor(props){
        super(props)
        this.state = { messages: this.props.messages }
    }

    componentWillMount(){
        var dummy = new Array();
        var flashDiv = React.render(<FlashMessageJson messages={dummy} />, $('#flash_messages')[0]);
        $(document).ajaxComplete(function(event, xhr, settings) {
            this.handleFlashMessagesHeader(flashDiv, xhr);
        });
    }
    render(){
        return(
            <div className='flash_messages_component'>
                {this.state.messages.map(function(message, index) {
                level = message[0];
                text  = message[1];
                return (
                    <div key={index} className={this.flash_class(level)}>
                    {_text}
                    </div>
                );
                }.bind(this))}
            </div>
        )
    }

    flash_class() {
        var _result = 'alert alert-error';
        if (level === 'notice') {
          _result = 'alert alert-info';
        } else if (level === 'success') {
          _result = 'alert alert-success';
        } else if (level === 'error') {
          _result = 'alert alert-error';
        } else if (level === 'alert') {
          _result = 'alert alert-error';
        }
        return _result;
    }


    handleFlashMessagesHeader(node, xhr) {
        var _message_array = new Array();
        var _raw_messages = xhr.getResponseHeader("X-FlashMessages")
        if (_raw_messages) {
          var _json_messages = JSON.parse(_raw_messages);
          count = 0
          for (var key in _json_messages) {
            _message_array[count] = new Array();
            _message_array[count][0] = key;
            _message_array[count][1] = _json_messages[key];
            count += 1;
          }
        }
        node.messages(_message_array);
    }
}