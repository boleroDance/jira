import { useEffect } from "react"
import { cleanObject } from "./index"
import { useHttp } from "utils/http";
import { useAsync } from "components/hooks/useAsync";
import { Project } from "@types/project";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(client(`projects`, {data: cleanObject(param || {})}))
    // client(`projects`, {data: cleanObject(param)})
    // .then(setList)
    // .catch((error) => {})
    // .finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}