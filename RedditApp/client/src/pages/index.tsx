import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Link,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { withUrqlClient } from 'next-urql';
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import NextLink  from 'next/link';

const Index = () => {

  const [{data, fetching}] = usePostsQuery({variables:{limit:10}});
  
  return (
    <Layout>
        <NextLink href="create-post">
          <Link>
            Create Post
          </Link>
        </NextLink>
        <br/>
        home page
        <br/>
        {!data ? null : data.posts.map(post => (<div key={post.id}> {post.title} - {post.text}</div> ))}
    </Layout>
  
  )}

export default withUrqlClient(createUrqlClient,{ ssr:true }) (Index)
