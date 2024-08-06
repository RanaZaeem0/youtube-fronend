const refreshToken :string |null  = localStorage.getItem('refreshToken')


  function getRefreshToken  (){
// Cheak the Refresh token avalible or not
if(refreshToken !== undefined && refreshToken !== "" && refreshToken !== null ){
return refreshToken
}else{
    return false
}
}
export default getRefreshToken()