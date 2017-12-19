var React = require("react")
var PropTypes = require("prop-types")
import UserSkillsNew from 'components/UserSkillsNew.jsx'

export default class UserSkills extends React.Component{
    constructor(props){
        super(props)
        this.state = { userSkills: [], openNew: false, fetching: false }
    }

    handleNew(){
        this.setState({ openNew: true })
    }

    handleAdd(){
        this.setState({ openNew: false, fetching: true })
        $.getJSON('/api/skills.json', (response) => { this.setState({ userSkills: response.skills }) });
    }

    exitAdd(){
        this.setState({ openNew: false })
    }

    componentWillMount(){
        $.getJSON('/api/skills.json', (data) => { this.setState({ userSkills: data.skills }) });        
    }

    render(){
        if(this.state.openNew){
            return(
                <div className='panel'>
                    <div className="panel-heading ml15 mr15 with-border"><h5>Skills</h5></div>
                    <UserSkillsNew addNew={this.handleAdd.bind(this)} onCloseForm={this.exitAdd.bind(this)} />
                </div>
            )
        }
        return(
            <div className='panel'>
                <div className="panel-heading ml15 mr15 with-border"><h5>Skills</h5></div>
                    <div className="panel-body mb25 mt25">
                        <div className='col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1'>        
                            {this.state.userSkills.map ((skill)=>
                                <div className='row pb20' key={skill.id}>
                                    <li className='skill-item'>{skill.name}<span className='gap3 with-text'>{skill.literacy_level}</span></li>
                                </div>                   
                            )}
                        </div>
                    </div>
                <button type='button' onClick={this.handleNew.bind(this)} className='btn btn-primary full-width'>Edit Skill</button>
            </div>                
        )
    }
}
