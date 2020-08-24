
export function setLoggedIn () {
    localStorage.setItem('#1', 't');
}

export function setLoggedOut () {
    localStorage.setItem('#1', 'f');
}

export function isLoggedIn () {
    if (localStorage.getItem('#1') === 't') 
      {return true;}
    return false;
}

