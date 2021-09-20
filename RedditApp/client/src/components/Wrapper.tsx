import { Box } from '@chakra-ui/layout'
import React from 'react'


interface WrapperProps {
    varient?:'small' | 'regular'
}


const Wrapper = ({children,varient='regular'}) => {
    return (
        <Box maxW={varient === 'regular' ? "800px": "400px"} w="100%" mt={8} mx="auto">
            {children}
        </Box>
    )}

export default Wrapper;