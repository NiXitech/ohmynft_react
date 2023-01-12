/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import TwitterLogin from "react-twitter-oauth";

const Twitter = (): JSX.Element => {
  const authHandler = (err: any, data: any) => {
    console.log(err, data);
  };

  return (
    <section className="w-full pt-16 pb-4 lg:px-8">


      <TwitterLogin
        authCallback={authHandler}
        consumerKey={'RLp45bk0iQAdLmV2HPT9dN2Uw'}
        consumerSecret={'MBlX2fTNjlWxrxl9mneut92Ul98NuoCe6QDMmqBikEUToig7H5'}
        requestTokenUrl={''}
        accessTokenUrl={''}
      />
    </section>
  );
}

export default Twitter;