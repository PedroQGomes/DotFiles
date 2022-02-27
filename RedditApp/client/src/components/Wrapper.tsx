import { Box } from '@chakra-ui/layout'
import React from 'react'

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
    varient?: WrapperVariant
}


const Wrapper: React.FC<WrapperProps> = ({ children ,varient='regular'}) => {
    return (
        <Box maxW={varient === 'regular' ? "800px": "400px"} w="100%" mt={8} mx="auto">
            {children}
        </Box>
    )}

export default Wrapper;