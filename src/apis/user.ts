import axios from "axios"

// 用户角色身份
export type UserRoleType = "user" | "admin"

export interface GetUserRoleRes {
  userType: UserRoleType
}

export const getUserRole = async() => {
  const res = await axios.get<GetUserRoleRes>("https://mock.mengxuegu.com/mock/623707e3a41cfa6486008de3/test/getUserRole")
  return res
}
