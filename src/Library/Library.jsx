
export function setLoggedIn (uType, uId) {
    localStorage.setItem('#1', 't');
    localStorage.setItem('uType', uType);
    localStorage.setItem('uId', uId);
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

export function getDistributorLS () {
    return (JSON.parse(localStorage.getItem('distributor')));
}

export function setDistributorLS (distData) {
    localStorage.setItem('distributor', JSON.stringify(distData));
}

export function isAuthorized (userType, authorisedUserTypes) {
    return authorisedUserTypes.includes(userType);
}