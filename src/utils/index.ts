import { useEffect, useRef } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])
}

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
  
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key: string]: unknown}) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {

  const oldTitle = useRef(document.title).current

  /**
   * 通过useRef返回的ref对象在组件整个生命周期内保持不变的特性来记录旧的title值
  */

  useEffect(() => {
    document.title = title
  }, [title])


  useEffect(() => {

    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [oldTitle, keepOnUnmount]) 
}


export const resetRoute = () => window.location.href = window.location.origin