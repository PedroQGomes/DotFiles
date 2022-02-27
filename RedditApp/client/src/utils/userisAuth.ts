import { useRouter } from 'next/router';
import React,{useEffect} from 'react'
import { useMeQuery } from '../generated/graphql';

export const userisAuth = () => {
   const [{data,fetching}] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
      if(!fetching && !data?.me){
          router.replace('/login');
      }
    
      
    }, [fetching,data,router]);
}
