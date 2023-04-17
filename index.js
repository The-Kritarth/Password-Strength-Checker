document.getElementById("sub").addEventListener("click", function checkPasswordStrength() {
    var password = document.getElementById("password");
    var strength = document.getElementById("strength");
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  
    if (password.value.length < 8) {
      strength.innerHTML = "Password is too short";
      strength.style.color = "red";
    } else if (!password.value.match(regex)) {
      strength.innerHTML = "Password must contain at least one lowercase letter, one uppercase letter, and one number";
      strength.style.color = "red";
    } else {
      strength.innerHTML = "Password is strong";
      strength.style.color = "green";
    }
  }) 



  