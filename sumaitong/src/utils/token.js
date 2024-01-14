//暴露函数
//本地持久化存储token
export const setToken = (token)=>{
   localStorage.setItem('TOKEN',token);
}

export const getToken = () => {
   return localStorage.getItem('TOKEN');
}

export const clearToken =()=>{
   localStorage.removeItem('TOKEN');
}