import {
  RegisterData,
  RegistrationSignData,
  UserLoginData,
} from "../../../types/types";
import http from "./http";

/**
 * 获取用户信息
 */
export async function getRegistration(address: any) {
  return new Promise((resolve, reject) => {
    http({ method: "get", url: `/user/registration/${address}` }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 用户登录提交签名信息成功
 */
export async function getRegistrationSign(params: RegistrationSignData) {
  return new Promise((resolve, reject) => {
    http({ method: "post", url: `/user/registration/sign`, params }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 用户登录
 */
export async function getUserLogin(params: UserLoginData) {
  return new Promise((resolve, reject) => {
    http({ method: "post", url: `/user/login`, params }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 用户提交注册信息
 * @returns
 */

export async function Register(params: RegisterData) {
  return new Promise((resolve, reject) => {
    http({ method: "post", url: "/user/register", params }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 邮箱查重
 * @returns
 */

export async function CheckEmail(params: { email: string }) {
  return new Promise((resolve, reject) => {
    http({ method: "post", url: "/user/email/check", params }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 用户名查重
 * @returns
 */

export async function CheckName(params: { name: string }) {
  return new Promise((resolve, reject) => {
    http({ method: "post", url: "/user/username/check", params }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 提交验证码
 * @returns
 */

export async function verificationCode(params: {
  address: any;
  verification_code: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: "/user/registration/verification_code",
      params,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取美元价格
 * @returns
 */

export async function getPrice() {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: "/crypto/price",
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取活动信息列表
 * @returns
 */

export async function getRaffleList(params: {
  status: string;
  offset: number;
  limit: number;
  username?: string;
  win?: boolean;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/raffle?status=${params.status}&offset=${params.offset}&limit=${
        params.limit
      }&username=${params.username || ""}&win=${params.win || ""}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取某个活动信息
 * @returns
 */

export async function getRaffleInfo(raffleId: number) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/raffle/${raffleId}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取某个活动信息的activity
 * @returns
 */

export async function getRaffleActivity(params: {
  raffleId: number;
  offset: number;
  limit: number;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/raffle/${params.raffleId}/activity?limit=${params.limit}&offset=${params.offset}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取某个活动信息的参与人
 * @returns
 */

export async function getRaffleParticipant(params: {
  raffleId: number;
  skip: number;
  take: number;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/raffle/${params.raffleId}/participant?skip=${params.skip}&take=${params.take}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取所有active 信息
 * @returns
 */

export async function getAllActivity(params: {
  category: string;
  offset: number;
  limit: number;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/activity?category=${params.category}&limit=${params.limit}&offset=${params.offset}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取所有Winner信息
 * @returns
 */

export async function getAllWinner(params: { skip: number; take: number }) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/raffle/winner?skip=${params.skip}&take=${params.take}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取用户信息
 * @returns
 */

export async function getUserInfo(displayName: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/user/public/${displayName}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取用户所拥有的NFT
 * @returns
 */

export async function getUserOwnedNFT(params: {
  displayName: string;
  skip: number;
  take: number;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/nft/user/${params.displayName}?skip=${params.skip}&take=${params.take}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 绑定社交账号
 * @returns
 */

export async function getsocialProvider(socialProvider: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/social/connect/auth/url/${socialProvider}`,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 重新发送验证码
 * @returns
 */

export async function getResendCode(params: { email: string }) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `user/resend_code`,
      params,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 交易信息返回
 */

export async function submitBuyEntry(params: {
  display_name: string;
  raffle_id: number;
  entry_count: number;
  tx_hash: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `action/buyEntry`,
      params,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * Get a list of registered users
 * @returns
 */

export async function getRegisterUserInfo(params: {
  username: string;
  password: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `/admin/users_info`,
      params,
    }).then(
      (res) => {
        resolve(res);

        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取referral Summary信息
 * @returns
 */

export async function getReferralSummay(ethereum_address: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/referral/statistics/${ethereum_address}`,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * user change avatar
 * @returns
 */

export async function uploadAvatar(params: {
  ethereum_address: string;
  image_data: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `/user/settings/uploadImage`,
      params,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * email ad auth
 * @returns
 */

export async function emailNotification(params: {
  marketing: boolean;
  ethereum_address: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `/user/settings/notification/email`,
      params,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * tweet ad auth
 * @returns
 */

export async function tweetNotification(params: {
  twitter: {
    connect: boolean;
  };
  ethereum_address: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `/user/social/connect`,
      params,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取referral Summary信息
 * @returns
 */

export async function getCurrentInfo(ethereum_address: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/user/settings/${ethereum_address}`,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 获取 exchange 记录
 * @returns
 */

export async function getWithdrawal(ethereum_address: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/withdrawal/${ethereum_address}`,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * request withdraw
 * @returns
 */

export async function withdrawals(params: {
  category: string;
  raffle_id?: string;
  amount?: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `/withdrawal/info`,
      params,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export async function ReferralList(ethereum_address: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/referral/${ethereum_address}`,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 通过referral链接进来
 * @returns
 */

export async function referralPublic(username: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/referral/public/${username}`,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 未读通知数
 * @returns
 */

export async function unreadCount(ethereum_address: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/notification/count/${ethereum_address}`,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 未读通知数
 * @returns
 */

export async function getnotification(ethereum_address: string) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: `/notification/${ethereum_address}`,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 更新通知状态
 * @returns
 */

export async function refreshNotification(params: {
  ethereum_address: string;
}) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: `/notification/change`,
      params,
    }).then(
      (res) => {
        resolve(res);
        return res;
      },
      (error) => {
        reject(error);
      }
    );
  });
}
