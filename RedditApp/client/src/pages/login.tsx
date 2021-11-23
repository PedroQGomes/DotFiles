import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input
} from "@chakra-ui/react"
import { Box, Link } from '@chakra-ui/layout';
import {Formik,Form,Field,} from 'formik'
import Wrapper from '../components/Wrapper'
import InputFiled from '../components/InputFiled'
import { useLoginMutation } from '../generated/graphql'
import {toErrorMap} from '../utils/toErrorMap'
import { useRouter } from 'next/dist/client/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from "next/link";

const Login:React.FC<{}> = ({}) => {
    
    const [,login] = useLoginMutation();

    const router = useRouter();

    return (
    <Wrapper varient="small">
        <Formik
            initialValues={{ usernameOrEmail: "",password:"" }}
            onSubmit={async (values, {setErrors}) => {
                
                const resposta = await login(values);
                
                
                if(resposta.data?.login.errors){
                    //console.log(resposta.data?.login.errors);
                    setErrors(toErrorMap(resposta.data.login.errors));
                }else if (resposta.data?.login.user){
                    router.push("/");
                }

            }}>
        
        {(props) => (
            <Form>
            <InputFiled name="usernameOrEmail" placeholder="username" label="Username"/>

            <InputFiled name="password" placeholder="password" label="Password" type="password"/>

            <Box>
                <NextLink href="/forgot-password">
                        <Link>Forgot Password?</Link>
                </NextLink>
            </Box>
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

export default withUrqlClient(createUrqlClient)(Login);