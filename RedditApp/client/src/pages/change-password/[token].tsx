import React, { useState } from 'react'
import { NextPage} from 'next'
import Wrapper from '../../components/Wrapper';
import { Formik, Form, Field } from 'formik';
import InputFiled from '../../components/InputFiled';
import { Button } from '@chakra-ui/button';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/dist/client/router'
import { toErrorMap } from '../../utils/toErrorMap';
import { Box, Flex, Link } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from "next/link";


const ChangePassword: NextPage<{token:string}> = ({token}) => {
    const router = useRouter();
    const [,changePassword] = useChangePasswordMutation();
    const [tokenError, settokenError] = useState('');

    return (
        <Wrapper varient="small">
        <Formik
            initialValues={{ newPassword: "" }}
            onSubmit={async (values, {setErrors}) => {
                
                const resposta = await changePassword({newPassword: values.newPassword, token});
                if(resposta.data?.changePassword.errors){
                    //console.log(resposta.data?.login.errors);
                    const errormap = toErrorMap(resposta.data.changePassword.errors);

                    if('token' in errormap){
                        settokenError(errormap.token);
                    }

                    setErrors(errormap);
                }else if (resposta.data?.changePassword.user){
                    router.push("/");
                }

            }}>
        
        {(props) => (
            <Form>
            <InputFiled name="newPassword" placeholder="New Password" label="New Password" type="password"/>
            {tokenError ? 
            <Flex >
                <Box mr={2} color="red.500">{tokenError}</Box>
                <NextLink href="/forgot-password">
                    <Link>Click Here to Get a new Token</Link>
                </NextLink>
            </Flex>  
            : null}
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
            >
                Change Password
            </Button>
            </Form>
        )}
        </Formik>
    </Wrapper>
    )
}


ChangePassword.getInitialProps = async ({query}) => {
    return {
        token: query.token as string
    }
}

export  default withUrqlClient(createUrqlClient) (ChangePassword);