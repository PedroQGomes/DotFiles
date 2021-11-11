import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { withUrqlClient } from 'next-urql';
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { createUrqlClient } from '../utils/createUrqlClient'
import  NavBar  from '../components/NavBar'
import { usePostsQuery } from '../generated/graphql';


const Index = () => {

  const [{data, fetching}] = usePostsQuery();
  
  return (
    <div>
      <NavBar /> 
        home page
        <br/>
        {!data ? null : data.posts.map(post => (<div key={post.id}> {post.title}</div> ))}
    </div>
  
  )}

export default withUrqlClient(createUrqlClient,{ ssr:true }) (Index)
