import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from "react-native-elements";

/*Importar firebase para obtener los datos */
import firebase from "../database/firebase";

const PantallaListaIn = (props) => {
  const [inventarios,setInventarios] = useState([]);
  /*useEffect llamara a la ejecucion de firebase */
  useEffect(() => {
    /*Desde firebase llamra a su coleccion llamado inventarios y utilzamos
      su propiedad onSnapshot que me devuelve querySnaphsot que es basicamente los datos que
      tiene hasta este momento en la base de datos */
    firebase.db.collection("inventarios").onSnapshot((querySnapshot) => {
      /*Arreglo inventarios */
      const inventarios = [];
      /*la propiedad docs contienen todos los docuemntos o datos y los vamos a recorrer con forEach */
      querySnapshot.docs.forEach((doc) => {
        const { nombre, fecha, descripcion } = doc.data();
        inventarios.push({
          /*guardar el id que me genera firebase */
          id: doc.id,
          nombre,
          fecha,
          descripcion,
        });
      });
      setInventarios(inventarios);
    });
  }, []);

  return (
    <ScrollView>
      
      {
        /*desde inventarios vamos a recorrer cada uno de los inventarios y por cada inventario
        que recorra, retornar el item
        */
       inventarios.map((inventario) => {
        return (
          <ListItem key={inventario.id} bottomDivider onPress={()=>alert(inventario.id)}>
            <ListItem.Chevron />
            <Avatar
              source={{uri:"https://image.flaticon.com/icons/png/512/2897/2897785.png"}}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{inventario.nombre}</ListItem.Title>
              <ListItem.Subtitle>ID: {inventario.id}</ListItem.Subtitle>
            </ListItem.Content>


        
            <FAB title="Edit" onPress={()=>{
              props.navigation.navigate('DetallesInventario',{
              /*Cuando presionemos el icono de editar Utilizar props navigation y 
                navegar a la pantalla de DetallesInventario y pasarle el id del inventario */
                inventarioId:inventario.id,
              });
            }}
            />

            <FAB title=">" onPress={()=>props.navigation.navigate('ListaBienes')}/>
            
          </ListItem>
        );
     })}

      <Button title="Añadir Nuevo Inventario" onPress={()=>props.navigation.navigate("CrearInventario")}/>
    </ScrollView>
  );
};

/*Para pasar de pantalla  utilizamos onPress y props, cuando presione el boton (Añadir Inventario)
se va a recibir un props que recibe el navigation y se pase a la pantalla CrearInventario  */

export default PantallaListaIn;
