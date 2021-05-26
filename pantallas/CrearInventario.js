/*useState es paar agregar estados */
import React, { useState } from "react";
/*Iportar componentes TextInpu para que podamos añadir campos
donde se pueda obtener la informacion  de los usuarios, Button vendra con un
estilo por defecto pero igual podemos modificarlo y ScrollView para
poder utilizar el Scroll de subir y bajar */ 
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const PantallaCrearIn = (props) => {
  /*se crea un estado que se llama state,setState y el valor incial sera Nombre y descripcion */
  const estadoInicial = {
    nombre: "",
    fecha: "",
    descripcion: "",
  };

  const [state, setState] = useState(estadoInicial);

  /* Creacion de funcion que recibe nombre y value para actualizar el nombre con un valor*/
  const recibirDatos = (value, nombre) => {
    /*Establece el nombre que estas recibiendo con el valor */
    setState({ ...state, [nombre]: value });
  };

  /*Funcion para crear inventario */
  const BotoncrearInventario = async () => {
    /*Si del estado actual el nombre esta vacio,enviar alerta per si no que utilice firebase */
    if (state.nombre === "") {
      alert("Ingresar un nombre al inventario");
    } else {

      try {
        /* Desde mi base de datos de firebase en una coleccion imventarios voy a añadir un objeto
        con las siguientes propiedades */
        await firebase.db.collection("inventarios").add({
          /*Propiedad id que va a tener el valor que tengo actualmente en el estado de  id */
          nombre:state.nombre,
          fecha:state.fecha,
          descripcion:state.descripcion,
        });

        /*Redireccionar a otra vista, navegar a otra pantalla con props */

        props.navigation.navigate("ListaInventarios");
      } catch (error) {
        console.log(error)
      }
    }
  };

  /*TextInpunt va a contener todo lo que el usuario ingrese */
  return (
    <ScrollView style={styles.containerScroll}> 
      <View style={styles.contenedorform}>
                
        <TextInput style={styles.inputGroup} placeholder="Nombre" onChangeText={(value)=>recibirDatos(value,"nombre")}/>
        <TextInput style={styles.inputGroup} placeholder="Fecha" onChangeText={(value)=>recibirDatos(value,"fecha")}/>
        <TextInput style={styles. textArea} style={styles.textArea} placeholder="Descripcion" onChangeText={(value)=>recibirDatos(value,"descripcion")}/>
        <Button style={styles.boton} title="CREAR INVENTARIO" onPress={()=> BotoncrearInventario()}/>
      </View>
           

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll:{
    flex:1,
    paddingTop:70,
    alignContent:'center',
    backgroundColor:'#fff',
    
  },

  contenedorform:{
    width: 360,
    height: 300,
    padding: 30,
    margin:'auto',
    borderRadius: 10,
    backgroundColor:'#fff',
    textAlign: 'center',
    justifyContent:'center',
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.43,
    shadowRadius:9.51,
    elevation:10,
   
  },

  inputGroup:{
    flex:1,
    padding:0,
    marginBottom:10,
    backgroundColor:'#f0efef',
    borderBottomColor:'#cccccc',
    padding:5,
  },

  textArea:{
    flex:2,
    marginBottom:15,
    backgroundColor:'#f0efef',
    padding:5,
  },

  imagen:{
    flex:1,
  },

  boton:{
    borderRadius: 10,
    borderWidth:1,
  },

  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

});

export default PantallaCrearIn;
