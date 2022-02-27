import React,{useEffect} from 'react'
import Layout from '../components/Layout'
import {Formik,Form,Field,} from 'formik'
import InputFiled from '../components/InputFiled'
import { useRouter } from 'next/router';
import { Button,} from "@chakra-ui/react"
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useCreatePostMutation, useMeQuery } from '../generated/graphql'
import { userisAuth } from '../utils/userisAuth';

const CreatePost:React.FC<{}> = () => {

    const [,createPost] = useCreatePostMutation();
    const router = useRouter();

    userisAuth();
    

  return (
    <Layout varient="small">
         <Formik
            initialValues={{ title: "",text:"" }}
            onSubmit={async (values, {setErrors}) => {
                
                const {error} = await createPost({input:values});
                
                if(!error){
                    router.push("/");
                }
                
            }}>
        
        {(props) => (
            <Form>
            <InputFiled name="title" placeholder="title" label="Title"/>

            <InputFiled textarea name="text" placeholder="text..." label="Body"/>
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
            >
                Create Post
            </Button>
            </Form>
        )}
        </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost);