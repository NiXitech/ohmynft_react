declare namespace HTTPAPI {
  type CurrentUser = {
    token?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type ProjectGroupID = {
    project_gp: integer;
  };

  type ProjectsList = {
    asset_items: ProjectsListItem[];
    total: integer;
  };

  type ProjectsListItem = {
    id: integer;
    token_id: string;
    thumb_url: string;
    android_res_url: string;
    ios_res_url: string;
    name: string;
    info: string;
    ver?: string;
    kind?: integer;
    AndroidFileList: RcFile | undefined;
    IosFileList: RcFile | undefined;
    iconFileList: RcFile | undefined;
    copyright: string;
    order: number;
    cover: string;
    video: string;
    coverFileList: RcFile | undefined;
    videoFileList: RcFile | undefined;
  };

  type SetAwsFiles = SetAwsFilesArrItem[];
  type SetAwsFilesArrItem = {
    path: string;
    data: RcFile | undefined;
    type: string;
  };
}
