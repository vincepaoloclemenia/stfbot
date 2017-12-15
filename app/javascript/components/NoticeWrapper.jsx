var React = require("react")
var PropTypes = require("prop-types")

class NoticeWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = { slideUp: false };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ slideUp: true });
    }, 3500);
  }

  render () {
    if (this.props.type){
      if (this.state.slideUp) {
          return (
            <div className={`alert alert-message slideup alert-${this.props.type}`}>
              {this.props.message}
            </div>
          );
        } else {
          return (
            <div className={`alert alert-message alert-${this.props.type}`}>
              {this.props.message}
            </div>
          );
        }
      }
    }
}

module.exports = NoticeWrapper

