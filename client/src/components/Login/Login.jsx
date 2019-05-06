import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router';
import axios from 'axios';

export default class Login extends Component {
  state = {
    email:'',
    password: '',
    
    success: false
  }

  onChange = (e, { name }) => {
    this.setState({ [name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    this.login();
  }

  login = async () => {
    const { authorize } = this.props;
    try {
      await axios.post('/api/user/login', this.state);
      authorize();
      this.setState({ success: true });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { success } = this.state;
    if (success) return ( <Redirect to='/admin/listing'/> );
    
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center'>
                realty-ithaca
            </Header>
            <Form size='large' onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Input 
                  fluid icon='user' 
                  iconPosition='left' 
                  name='email'
                  onChange={this.onChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  type='password'
                  name='password'
                  onChange={this.onChange}
                />

                <Button fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
