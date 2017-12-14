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
                <div className='row pb20'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-4 col-md-offset-4 col-sm-offset-4 col-xs-offset-4'>
                            
                        {this.state.userSkills.map ((skill)=>
                            <li className='skill-item' key={skill.id}>{skill.name}<span className='gap3 with-text'>{skill.literacy_level}</span></li>                   
                        )}

                    </div>
                </div>
            </div>
        )
    }
}

module.exports = UserSkills