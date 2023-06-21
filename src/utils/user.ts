import { useAsync } from "components/hooks/useAsync";
import { useEffect } from "react"
import { User } from "../@types/user";
import { useHttp } from "utils/http";
import { cleanObject } from "./index"

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<User[]>()
  
  useEffect(() => {
    run(client("users", {data: cleanObject(param || {})}))
  }, [param, run, client])

  return result
}