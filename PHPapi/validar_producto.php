<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// Obtén el valor de nombre_producto desde la URL
$nombreProducto = $_GET['nombre_producto'];

if (empty($nombreProducto)) {
    echo json_encode(array('mensaje' => 'El nombre del producto es inválido.'));
    exit; // Termina la ejecución del script
}

require('conexion.php');
$con = retornarConexion();

// Realiza una consulta para buscar en la tabla "productos" en función del nombre o código
$consulta = "SELECT id, precio, codigo, fecha_de_ingreso, nombre FROM productos WHERE nombre = '$nombreProducto' OR codigo = '$nombreProducto'";
$registros = mysqli_query($con, $consulta);

if ($registros) {
    $resultados = [];
    while ($row = mysqli_fetch_assoc($registros)) {
        $resultados[] = $row;
    }
    
    if (!empty($resultados)) {
        // Si se encontraron resultados, devuelve los datos
        echo json_encode($resultados);
    } else {
        // Si no se encontraron resultados, muestra un mensaje de error
        echo json_encode(array('mensaje' => 'No se encontraron resultados.'));
    }
} else {
    // Si hubo un error en la consulta, muestra un mensaje de error
    echo json_encode(array('mensaje' => 'Error en la consulta.'));
}
?>
