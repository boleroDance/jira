import React, { FC, useEffect, useState } from "react";
import { Button, ButtonProps, message } from "antd";
import { getUserRole, UserRoleType } from "apis/user"
import styles from "./styles.module.less"
import classNames from "classnames";

type Props = ButtonProps

const mapper: Record<UserRoleType, string> = {
  user: "普通用户",
  admin: "管理员"
}

const AuthButton: FC<Props> = (props) => {
  const { children, className, ...restProps } = props
  console.log(props);
  
  const [userType, setUserType] = useState<UserRoleType>()

  useEffect(() => {
    getLoginState().catch((e) => message.error(e.message))
  }, [])

  const getLoginState = async () => {
    const res = await getUserRole()
    setUserType(res.data.userType)
  }

  return (
    <Button {...restProps} className={classNames(className, styles.authButton)}>
      {mapper[userType!] || ""}
      {children}
    </Button>
  )
}

export default AuthButton