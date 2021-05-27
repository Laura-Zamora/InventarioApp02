import { StatusBar } from "expo-status-bar";

/*Importar componentes StyleSheet, Text, View de react-native para aregar estilos en el
componentes React Native y mostar el texto en la pantalla */
import React from "react";
import { StyleSheet } from "react-native";

// Navegacion

/*Se importa dependencia NavigationContainer que como su nombre lo indica es un contenedor de pantallas,
devolvera un componente que va a mantener todo el estado de la navegacion de nuestra aplicacion */
import { NavigationContainer } from "@react-navigation/native";
/*Nos permite tener una navegcion tipo Stack */
import { createStackNavigator } from "@react-navigation/stack";

// Componentes

import CrearInventario from "./pantallas/CrearInventario";
import DetallesInventario from "./pantallas/DetallesInventario";
import ListaInvestarios from "./pantallas/ListaInventarios";
import CrearBien from "./pantallas/CrearBien";
import DetallesBien from "./pantallas/DetallesBien";
import ListaBienes from "./pantallas/ListaBienes";



/*Me va a devolver un componente Stack, contiene toda la navegacion */
const Stack = createStackNavigator();

/*Fucion que contiene las multiples pantallas */
function MyStack() {

  
  return (
    /*Todas las pantallas van a contener un Stack.Screen.
     Como se van apilando nuestras rutas/pantallas la primera pantalla que se vera es la primera en la pila*/
     /*Se agregan nombres para luego poder navegar hacia  ellas*/

     /*Stack.navigator le provee unos props a los componentes que estan adentro,
     entonces todo sesto componente spueden acceder a una propiedad llamada Navigation  */
    <Stack.Navigator>
      <Stack.Screen name="ListaInventarios" component={ListaInvestarios} options={{title:'Lista Inventarios'}}/>
      <Stack.Screen name="CrearInventario" component={CrearInventario} options={{title:'Crear Inventario'}}/>
      <Stack.Screen name="DetallesInventario" component={DetallesInventario} options={{title:'Detalles del Inventario'}}/>
      <Stack.Screen name="CrearBien" component={CrearBien} options={{title:'Añadir Bien'}}/>
      <Stack.Screen name="DetallesBien" component={DetallesBien} options={{title:'Detalles del Bien'}}/>
      <Stack.Screen name="ListaBienes" component={ListaBienes} options={{title:'Lista de Bienes'}}/>

    </Stack.Navigator >
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
