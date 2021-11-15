import { UsernamePasswordInput } from "src/utils/UsernamePasswordInput"

export const validateRegister = (options: UsernamePasswordInput) => {
    if(!options.email.includes("@")){
            return [{field:"email",message:"wrong email format"}];
            
        }


        if(options.username.length < 2){
            return [{field:"username",message:"length must be greater then 2"}];
            
        }
        if(options.password.includes("@")){
            return [{field:"password",message:"cannot contain @ sign"}];
            
        }

    return null;
}