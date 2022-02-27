import React, { InputHTMLAttributes } from 'react'
import {FormControl,FormLabel,FormErrorMessage,Input, Textarea} from '@chakra-ui/react'
import {useField} from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name:string;
    label:string;
    textarea?:boolean;
};


const InputFiled:React.FC<InputFieldProps> = ({label,textarea,size:_,...props}) => {

    let InputOrTextarea: any = Input;
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field,{error}] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <InputOrTextarea  {...field} {...props} id={field.name} />
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}

export default InputFiled
