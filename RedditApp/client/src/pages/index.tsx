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


const Index = () => (
  <div>
    <NavBar /> 
    home page
    
  </div>

    
    
)

export default withUrqlClient(createUrqlClient) (Index)
