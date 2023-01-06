import { getDags } from "../../api";

const HttpPage = (): JSX.Element => {
  const getData = async () => {
    const params = new FormData();
    params.append('page', '1');
    params.append('pageSize', '100');
    const res = await getDags(params);
    console.log('%c🀂 res', 'color: #807160; font-size: 20px;', res);
  }

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <button style={{ margin: '0 auto' }} onClick={getData}>
          请求🀄︎🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀄︎
        </button>
      </div>
    </>
  );
}

export default HttpPage;
