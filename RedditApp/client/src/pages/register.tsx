import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input
} from "@chakra-ui/react"

import {Formik,Form,Field,} from 'formik'
import Wrapper from '../components/Wrapper'
import InputFiled from '../components/InputFiled'

interface registerProps {

}

const Register:React.FC<registerProps> = ({}) => {

    const validateUsername = () =>{

    }

    return (
    <Wrapper varient="samll">
        <Formik
            initialValues={{ username: "",password:"" }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
                }, 1000)
            }}>
        
        {(props) => (
            <Form>
            <InputFiled name="username" placeholder="username" label="Username"/>

            <InputFiled name="password" placeholder="password" label="Password" type="password"/>
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
            >
                Submit
            </Button>
            </Form>
        )}
        </Formik>
    </Wrapper>
    )
}

export default Register
