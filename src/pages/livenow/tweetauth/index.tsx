/* eslint-disable @typescript-eslint/no-unused-vars */
// import { twAuthStep1 } from "../../../api/services/http/api";
import { useEffect } from "react";
import TwitterLogin from "react-twitter-login";
import hello from 'hellojs'

const TweetAuth = (): JSX.Element => {



    const authHandler = (err: any, data: any) => {
        console.log('1341234123412341234-----------14312312341234-------->', err, data);
    };
    const CONSUMER_KEY = process.env.CONSUMER_KEY + ''
    const CONSUMER_SECRET = process.env.CONSUMER_SECRET + ''

    useEffect(() => {
        hello.init({
            twitter: 'REm8KjWsthsmKXZoVIYXNn1qqy'
        }, {
            scope: 'email',
            redirect_uri: 'http://localhost:3000/'
        });
    }, [])

    const twStepOne = async () => {
        // const result = await twAuthStep1({ oauth_callback: '' })
        // console.log('tw---tw-----tw-----tw-----------tw-----tw--------tw-------->', result)
        hello('twitter').login();
        // Listen to signin requests
        hello.on('auth.login', function (r) {
            console.log('%c🀅 r', 'color: #33cc99; font-size: 20px;', r);
            // Get Profile
            // hello(r.network).api('/me').then(function (p) {
            //     window.console.log(p) //输出用户信息

            // });
        });
    }

    return (
        <>
            <div style={{
                width: '14rem',
                height: '4rem'
            }}>
                <button className="uppercase bg-black w-full h-full rounded-full" onClick={() => twStepOne()}>
                    tweet
                </button>
                <TwitterLogin
                    authCallback={authHandler}
                    consumerKey={'6mwYTGiqsjmkyPbbZK9Xvvx8Z'}
                    consumerSecret={'glpof29y7ZLY0d3obcLhYF0T0ffADlayQR7LgMRhy9ridn0inr'}
                ></TwitterLogin>
            </div>
        </>
    )
}

export default TweetAuth;
