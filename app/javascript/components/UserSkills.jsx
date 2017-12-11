var React = require("react")
var PropTypes = require("prop-types")

class UserSkills extends React.Component{
    constructor(props){
        super(props)
        this.state = { userSkills: [] }
    }

    componentWillMount(){
        $.getJSON('/api/skills.json', (response) => { this.setState({ userSkills: response }) });        
    }

    render(){
        return(
            <div className="panel-body">
                <div className='row'>
                        <div className='col-lg-3'>
                            <h6>Skills</h6>
                        </div>
                {this.state.userSkills.map ((skill)=>
                        
                        <div className='col-lg-3' key={skill.id} >
                            <p>{skill.name} </p>
                            <p>{skill.literacy_level} </p>
                        </div>                       
                )}
                </div>
            </div>
        )
    }
}

module.exports = UserSkills