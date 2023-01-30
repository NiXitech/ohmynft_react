/* eslint-disable @typescript-eslint/no-unused-vars */
// import { twAuthStep1 } from "../../../api/services/http/api";
import { useCallback, useEffect, useState } from "react";
// import TwitterLogin from "react-twitter-login";
// import hello from 'hellojs'
import { LoginSocialTwitter, IResolveParams } from "reactjs-social-login";
import { TwitterLoginButton } from 'react-social-login-buttons'


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

                <LoginSocialTwitter
                    client_id='MzdPcG9aYWtCaklLUGY3MFM3VVo6MTpjaQ'
                    isOnlyGetToken
                    redirect_uri="https://ohmynft-react.pages.dev"
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess}
                    onResolve={({ provider, data }: IResolveParams) => {
                        console.log('provider-provider-provider----->', provider)
                        console.log('data-data-data-data------>', data)
                        window.alert(JSON.stringify(data))
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={(err: any) => {
                        console.log(err);
                    }}
                >
                    <TwitterLoginButton />
                </LoginSocialTwitter>

                {/* <button className="uppercase bg-black w-full h-full rounded-full" onClick={() => twStepOne()}>
                    tweet
                    </button>
                    <TwitterLogin
                    authCallback={authHandler}
                    consumerKey={'6mwYTGiqsjmkyPbbZK9Xvvx8Z'}
                    consumerSecret={'glpof29y7ZLY0d3obcLhYF0T0ffADlayQR7LgMRhy9ridn0inr'}
                ></TwitterLogin> */}
            </div>
        </>
    )
}

export default TweetAuth;

// const authHandler = (err: any, data: any) => {
//     console.log('1341234123412341234-----------14312312341234-------->', err, data);
// };
// const CONSUMER_KEY = process.env.CONSUMER_KEY + ''
// const CONSUMER_SECRET = process.env.CONSUMER_SECRET + ''

// useEffect(() => {
//     hello.init({
//         twitter: 'MzdPcG9aYWtCaklLUGY3MFM3VVo6MTpjaQ'
//     }, {
//         redirect_uri: 'http://localhost:3000/'
//     });
// }, [])

// const twStepOne = async () => {
//     // const result = await twAuthStep1({ oauth_callback: '' })
//     // console.log('tw---tw-----tw-----tw-----------tw-----tw--------tw-------->', result)
//     hello('twitter').login().then((data) => {
//         console.log('%c🀆 data----', 'color: #364cd9; font-size: 20px;', data);

//     }, (err) => {
//         console.log('%c🀅 err-----', 'color: #ffa280; font-size: 20px;', err);

//     });
//     // Listen to signin requests
//     // hello.on('auth.login', function (auth) {
//     //     console.log('%c🀅 r', 'color: #33cc99; font-size: 20px;', auth);
//     //     // Get Profile
//     //     hello(auth.network).api('me').then(function (r) {
//     //         alert(JSON.stringify(r));
//     //     });
//     // });
// }