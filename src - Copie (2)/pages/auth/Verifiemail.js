import React from 'react'
import { useSearchParams } from 'react-router-dom';
import Helmet from '../../components/Helmet/Helmet';

const Verifiemail = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode")
  const apiKey = searchParams.get("apiKey")

  return (
    <Helmet title="verify email">
      Verifiemail
     <h2>{`oobCode:${oobCode}  apiKey:${apiKey}`}</h2>
    </Helmet>
  )
}

export default Verifiemail