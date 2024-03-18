
/*function MobileDropDown() {
  //opens side navbar by 70 percent
  document.getElementById("mySidenav").style.width = "40%" 

 //opens overlay display
  document.getElementById('backdrop').style.display = "block" 
}

function closeNav() {
  //closes side navbar totally
  document.getElementById("mySidenav").style.width = "0"

  //removes overlay display
  document.getElementById('backdrop').style.display = "none"
}
*/



function openNav() {
  document.getElementById("mySidenav").style.width = "70%" //opens side navbar by 70 percent
  document.getElementById('backdrop').style.display = "block" //displays overlay
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0"
  document.getElementById('backdrop').style.display = "none"
}