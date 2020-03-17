import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

const SignupForm = ({ history }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        axios.post('http://localhost:8080/users', {
            username,
            email,
            password,
        })
            .then(res => {
                localStorage.setItem('token', JSON.stringify({
                    email
                }))

                history.push('/')
            })
            .catch(err => {
                localStorage.clear()
            })
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Register
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user' iconPosition='left' placeholder='Username'
                            value={username} onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Input
                            fluid icon='mail' iconPosition='left' placeholder='E-mail address'
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button color='teal' fluid size='large'>
                            Register
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already a member? <Link to='/login'>Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default withRouter(SignupForm)