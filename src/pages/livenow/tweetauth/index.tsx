/* eslint-disable @typescript-eslint/no-unused-vars */
// import { twAuthStep1 } from "../../../api/services/http/api";
import { useCallback, useEffect, useState } from "react";
// import TwitterLogin from "react-twitter-login";
// import hello from 'hellojs'
// import { LoginSocialTwitter, IResolveParams } from "reactjs-social-login";
// import { TwitterLoginButton } from 'react-social-login-buttons'


const TweetAuth = (): JSX.Element => {

    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState<any>();

    const onLoginStart = useCallback(() => {
        alert('login start');
    }, []);
    const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider('');
        alert('logout success');
    }, []);

    const onLogout = useCallback(() => { }, []);



    return (
        <>
            <div style={{
                width: '14rem',
                height: '4rem'
            }}>

                {/* <LoginSocialTwitter
                    client_id='MzdPcG9aYWtCaklLUGY3MFM3VVo6MTpjaQ'
                    isOnlyGetToken
                    redirect_uri="https://ohmynft-react.pages.dev"
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess}
                    onResolve={({ provider, data }: IResolveParams) => {
                        window.alert(JSON.stringify(data))
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={(err: any) => {
                        console.log(err);
                    }}
                >
                    <TwitterLoginButton />
                </LoginSocialTwitter> */}
            </div>
        </>
    )
}

export default TweetAuth;
