import { Box,Flex,Link } from '@chakra-ui/layout'
import React from 'react'
import NextLink from 'next/link'


const NavBar = () => {
    return (
        <Flex bg="tomato" p={4}>
            <Box  ml={'auto'}>
                 <NextLink href="/login">
                     <Link mr={2}>Login</Link> 
                 </NextLink>

                 <NextLink href="/register">
                     <Link>Register</Link> 
                 </NextLink>
                       
            </Box>
        </Flex>
    )
}

export default NavBar
