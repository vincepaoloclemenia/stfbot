import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import JobContainer from 'components/JobsContainer.jsx'
import Show from 'components/JobShow.jsx'



    ReactDOM.render((      
        <BrowserRouter>
            <Route path='/' component={JobContainer}/>
            <Route path='/title' component={Show} />
        </BrowserRouter>
    ))
