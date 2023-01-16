// import { twAuthStep1 } from "../../../api/services/http/api";
import TwitterLogin from "react-twitter-login";

const TweetAuth = (): JSX.Element => {


    // const twStepOne = async () => {
    //     const result = await twAuthStep1({ oauth_callback: '' })
    //     console.log('tw---tw-----tw-----tw-----------tw-----tw--------tw-------->', result)
    // }
    const authHandler = (err, data) => {
        console.log('1341234123412341234-----------14312312341234-------->', err, data);
    };
    const CONSUMER_KEY = process.env.CONSUMER_KEY + ''
    const CONSUMER_SECRET = process.env.CONSUMER_SECRET + ''

    return (
        <>
            <div style={{
                width: '14rem',
                height: '4rem'
            }}>
                {/* <button className="uppercase bg-black w-full h-full rounded-full" onClick={()=>twStepOne()}>
                    tweet
                </button> */}
                <TwitterLogin
                    authCallback={authHandler}
                    consumerKey={CONSUMER_KEY}
                    consumerSecret={CONSUMER_SECRET}
                ></TwitterLogin>
            </div>
        </>
    )
}

export default TweetAuth;
