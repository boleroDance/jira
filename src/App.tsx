import React, { useState } from "react";
import Title from "./components/Title";
import AuthButton from "./components/AuthButton";
// import withLoader from "components/HOC/withLoader";
import useWithLoder from "./components/hooks/useWithLoader"
import EffectHook from "./components/EffectHook/effectHook"
import useArray from "./components/hooks/useArray"
import { useAuth } from "context/auth-context";
import "./App.css"

const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));



interface IShowResult {
  message: string,
  status: string
}

// const DogShow: React.FC<{data: IShowResult}> = ({ data }) => {
//   return (
//     <>
//       <h2>Dog show: {data.status}</h2>
//       <img src={data.message} alt="" />
//     </>
//   )
// }

const App: React.FC = () => {
  const [show, setShow] = useState(true)

  const { user } = useAuth()
  //const WrapperDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  // const [data, dogLoading] = useWithLoder('https://dog.ceo/api/breeds/image/random', [show])
  // const dogResult = data as IShowResult

  return (
    <div>
      {/* <WrapperDogShow /> */}
      {/* <section>
        <Title type="large" title="大字"/>
        <EffectHook />
        <AuthButton>登录</AuthButton>
      </section> */}
      {/* {
        dogLoading ? <p>data is loading...</p>
        : <img src={dogResult && dogResult.message} alt="" />
      } */}

      {/* <button onClick={() => {setShow(!show)}}>Toggle Tracker to refresh dog image</button> */}
      <React.Suspense fallback={<div>Loading……</div>}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp/>}
      </React.Suspense>
    </div>
  )
}

export default App
