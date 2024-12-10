//this is for using the username in any page if we want 
 
document.getElementById("welcome_tag").innerText = `Welcome, ${localStorage.getItem("retrieved_username")}!`;
 