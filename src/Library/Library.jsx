
export function setLoggedIn (user) {
    localStorage.setItem('#1', 't');
    localStorage.setItem('uType', user.uType);
    localStorage.setItem('uId', user.uId);
}

export function setLoggedOut () {
    localStorage.setItem('#1', 'f');
}

export function isLoggedIn () {
    if (localStorage.getItem('#1') === 't') 
      {return true;}
    return false;
}

export function getUserTypeLS () {
    return (localStorage.getItem('uType'));
}

export function setUserTypeLS (userType) {
    localStorage.setItem('uType', userType);
}

export function isAuthorized (userType, authorisedUserTypes) {
    return authorisedUserTypes.includes(userType);
}