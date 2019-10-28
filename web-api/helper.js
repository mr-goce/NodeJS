// emailValidator = (email) => {
//     if (email.length < 5) {
//         return false;
//     }
//     else {
//         return true;
//     }
// };

 validateEmail=(email)=> {
    // var email = req.body.email;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

validateAges=(age)=>{
    if(age>18){
        return true;
    }
    else{
        return false;
    }
}


module.exports = {
    validateEmail, validateAges
}