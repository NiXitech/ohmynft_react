import Footer from "../../components/footer";
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


const AccountPage = (): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <main className="flex flex-wrap grow mt-20 lg:mt-16 px-2 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
        <div className="w-full max-w-md m-auto">
          <section className="text-center mb-6">
            <figure className="relative w-24 h-24 mb-4 cursor-pointer lg:w-32 lg:h-32 inline-block margin-x-auto group animate-fade-in">
              {/* <img className="w-full rounded-full border-2 border-transparent transition-all group-hover:border-white" src="https://content.prod.platform.metawin.com/avatars/template/default.png" alt="Yout avatar" decoding="async" />




              <button className="absolute -right-9 top-1/2 -mt-4 w-12 h-8 text-right transition-all opacity-80 group-hover:opacity-100"><span className="icon-ico-edit text-2xl"></span></button> */}
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>



            </figure>
            <h1 className="text-white text-3xl block truncate">WillZhao</h1>
            <p className="text-slate-200 mt-2 block truncate">0x3dd4045668fbadcaee4d849a244e5094859acf0f</p>
          </section>
          <section className="mb-6">
            <form>
              <div className="mt-3 relative pb-3 input-success-active">
                <input className="block relative w-full bg-slate-600 border-slate-600 rounded-lg py-3 px-4 border-2 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-slate-600 transition-all appearance-none hover:appearance-none disabled:text-slate-100" name="username" id="username" type="text" step="" placeholder="Username" disabled />
                <span className="icon-ico-tick text-green text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"></span>
                <span className="icon-ico-x text-red text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                <p className="w-full inline-block text-red text-sm mt-1" ></p>
              </div>
              <div className="mt-3 relative pb-3 input-success-active">
                <input className="block relative w-full bg-slate-600 border-slate-600 rounded-lg py-3 px-4 border-2 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-slate-600 transition-all appearance-none hover:appearance-none disabled:text-slate-100" name="email" id="email" type="email" step="" placeholder="Email" disabled />
                <span className="icon-ico-tick text-green text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"></span>
                <span className="icon-ico-x text-red text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                <p className="w-full inline-block text-red text-sm mt-1" ></p>
              </div>
            </form>
          </section>
          <section className="mb-8">
            <h3 className="uppercase text-sm tracking-wider md:text-base py-3 border-b border-slate-500">Communication settings</h3>
            <div className="flex border-b border-slate-500 py-3">
              <label htmlFor="marketing" className="inline-flex relative items-center cursor-pointer h-6 mr-2"><input type="checkbox" id="marketing" className="sr-only peer" value="" />
                <div className="overflow-hidden w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 after:shadow-lg after:shadow-black"></div></label>
              <p className="text-slate-100">Send me marketing emails from time to time</p>
            </div>
          </section>
          <section>
            <div>
              <h3 className="uppercase text-sm tracking-wider md:text-base py-3">Connect your social accounts</h3>
              <article className="border-b border-t border-slate-500 py-3 flex items-center justify-between">
                <div className="flex items-center overflow-hidden">
                  <div className="shrink-0 w-10 h-10 bg-[#1973E8] rounded-full flex items-center justify-center mr-2">
                    <span className="text-xl icon-ico-discord"></span>
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex">
                      <h3 className="font-bold uppercase tracking-wider">Discord</h3>

                    </div>

                  </div>
                </div>
                <div className="relative">
                  <button type="button" className="text-sm py-3 px-6 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 inline-block mt-3 sm:mt-0"><span className="transition-all"><span>Connect</span></span>
                    <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden" role="status">
                      <img className="inline-block spinner-border animate-spin-slowing" src="https://metawin.com/_nuxt/spinner-white.d8595d4a.svg" alt="" width="30" height="30" />
                    </div></button>
                </div>
              </article>
              <article className="border-b border-slate-500 py-3 flex items-center justify-between">
                <div className="flex items-center overflow-hidden">
                  <div className="shrink-0 w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center mr-2">
                    <span className="text-xl icon-ico-twitter"></span>
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex">
                      <h3 className="font-bold uppercase tracking-wider">Twitter</h3>

                    </div>

                  </div>
                </div>
                <div className="relative">
                  <button type="button" className="text-sm py-3 px-6 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 inline-block mt-3 sm:mt-0"><span className="transition-all"><span>Connect</span></span>
                    <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden" role="status">
                      <img className="inline-block spinner-border animate-spin-slowing" src="https://metawin.com/_nuxt/spinner-white.d8595d4a.svg" alt="" width="30" height="30" />
                    </div></button>
                </div>
              </article>
            </div>
          </section>
          <section className="mt-16 mb-10 text-center">
            <button className="py-3 text-slate-100 uppercase tracking-wider hover:text-white transition-all"> Log out </button>
          </section>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default AccountPage;