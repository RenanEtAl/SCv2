import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

const LoginForm = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        axios.post('http://localhost:8080/login', {
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
                console.log(err)
            })
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user' iconPosition='left' placeholder='E-mail address'
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
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to='/signup'>Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default withRouter(LoginForm)