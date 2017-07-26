
export default class AuthAdapter {
  static login = (loginParams) => {
    return (
      fetch(`http://localhost:3000/auth`,
        {method: 'POST',
        headers: headers(),
        body: JSON.stringify(loginParams)
      })
      .then(resp => resp.json())
    )
  }

  static currentUser = () => {
    return(
      fetch('http://localhost:3000/api/v1/me',
        {headers: headers()}
      )
      .then(resp => resp.json())
    )
  }
}

function headers() {
  return {"content-type": "application/json",
   "accept": "application/json",
   "Authorization": localStorage.getItem("jwt")
 }
}
