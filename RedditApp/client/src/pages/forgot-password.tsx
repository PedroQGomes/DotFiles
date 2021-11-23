import React, { useState } from 'react'
import {Formik,Form,Field,} from 'formik'
import Wrapper from '../components/Wrapper'
import InputFiled from '../components/InputFiled'
import { toErrorMap } from '../utils/toErrorMap'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Box, Link } from '@chakra-ui/layout';
import NextLink from "next/link";
import { Button} from "@chakra-ui/react"
import { useForgotPasswordMutation } from '../generated/graphql'

const forgotPassword:React.FC<{}> = () => {
    const [,forgotPassword] = useForgotPasswordMutation();
    const [complete, setcomplete] = useState(false)
    return (
        <Wrapper varient="small">
        <Formik 
            initialValues={{ email: ""}}
            onSubmit={async (values, {setErrors}) => {
                
                await forgotPassword({email:values.email});
                setcomplete(true);
                // router.push("/change");
            }}>
        
        {(props) => complete ? <Box> email sent if account exists</Box>: (
            <Form>
            <InputFiled name="email" placeholder="email" label="email" type="email"/>

            <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
            >
                Login
            </Button>
            </Form>
        )}
        </Formik>
    </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient) (forgotPassword)
