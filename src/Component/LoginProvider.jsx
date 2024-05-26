import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // 로그인 정보를 담는 context 만들기

// 로그인 정보를 담는 context 만들기
// step1. context 만들기
export const LoginContext = createContext(null);

// step2. context 사용하기
// step3. context 제공하기
export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);
  const [authority, setAuthority] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // 없으면 null
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  // isLoggedIn
  function isLoggedIn() {
    // 토큰이 있고 유효하면 로그인 된다.
    // 토큰의 유효기간으로 결정
    // js ms까지 표시. jwt의 expired는 시분초까지만 표현됨
    return Date.now() < expired * 1000;
  }

  // 권한 있는 지? 확인
  function hasAccess(param) {
    return id == param;
  }

  function isAdmin() {
    return authority.includes("admin");
  }

  // login
  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickName);
    setAuthority(payload.scope.split(" ")); // "admin manager user"
  }

  // logout
  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setId("");
    setNickName("");
    setAuthority([]);
  }

  return (
    <LoginContext.Provider
      value={{
        // 키,값이 같으므로 하나씩만 써도 됨 email:email 말고 email
        id: id,
        nickName: nickName,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        hasAccess: hasAccess,
        isAdmin: isAdmin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
