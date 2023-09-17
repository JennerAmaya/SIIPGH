<?php
function retornarConexion() {
  $con=mysqli_connect("localhost","root","","dbsystem");
  return $con;
}
?>