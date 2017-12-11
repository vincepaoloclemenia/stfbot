var React = require("react")
var PropTypes = require("prop-types")

class WorkExperience extends React.Component{
    constructor(props){
        super(props)
        this.state = { userExperiences: [] }
    }

    componentWillMount(){

    }

    render(){
        return(
            <div className="panel-body">
                <p>Work Experience</p>
            </div>
        )
    }
}

module.exports = WorkExperience