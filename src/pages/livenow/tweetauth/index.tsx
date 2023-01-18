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
            twitter: 'MzdPcG9aYWtCaklLUGY3MFM3VVo6MTpjaQ'
        }, {
            redirect_uri: 'http://localhost:3000/'
        });
    }, [])

    const twStepOne = async () => {
        // const result = await twAuthStep1({ oauth_callback: '' })
        // console.log('tw---tw-----tw-----tw-----------tw-----tw--------tw-------->', result)
        hello('twitter').login().then((data) => {
            console.log('%c🀆 data', 'color: #364cd9; font-size: 20px;', data);

        }, (err) => {
            console.log('%c🀅 err', 'color: #ffa280; font-size: 20px;', err);

        });
        // Listen to signin requests
        // hello.on('auth.login', function (auth) {
        //     console.log('%c🀅 r', 'color: #33cc99; font-size: 20px;', auth);
        //     // Get Profile
        //     hello(auth.network).api('me').then(function (r) {
        //         alert(JSON.stringify(r));
        //     });
        // });
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
