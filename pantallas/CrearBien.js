import React, { useState } from "react";
import {
    Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";
  
import firebase from "../database/firebase";
  
const PantallaCrearBi = (props)=>{

  const estadoInicial = {
    nombre: "",
    descripcion: "",
    cantidad: "",
    marca: "",
    modelo: "",
    color: "",
  };

  const [state, setState] = useState(estadoInicial);

  const recibirDatos = (value, nombre) => {
    
    setState({ ...state, [nombre]: value });
  };


  const BotoncrearBien = async () => {
    if (state.nombre === "") {
      alert("Ingresar un nombre al bien");
    } else {
      try {
        await firebase.db.collection("bienes").add({
          nombre:state.nombre,
          descripcion:state.descripcion,
          cantidad:state.cantidad,
          marca:state.marca,
          modelo:state.modelo,
          color:state.color,
        });
    
        /*Redireccionar a otra vista, navegar a otra pantalla con props */

        props.navigation.navigate("ListaBienes");
      } catch (error) {
        console.log(error)
      }
    }
  };



  return(

    <ScrollView style={styles.containerScroll}> 
      <View style={styles.contenedorform}>
        <TextInput style={styles.inputGroup} placeholder="Nombre" onChangeText={(value)=>recibirDatos(value,"nombre")}/>
        <TextInput style={styles.inputGroup} placeholder="Cantidad" onChangeText={(value)=>recibirDatos(value,"cantidad")}/>
        <TextInput style={styles.inputGroup} placeholder="Marca" onChangeText={(value)=>recibirDatos(value,"marca")}/>
        <TextInput style={styles.inputGroup} placeholder="Modelo" onChangeText={(value)=>recibirDatos(value,"modelo")}/>
        <TextInput style={styles.inputGroup} placeholder="Color" onChangeText={(value)=>recibirDatos(value,"color")}/>
        <TextInput style={styles. textArea} style={styles.textArea} placeholder="Descripcion" onChangeText={(value)=>recibirDatos(value,"descripcion")}/>
        <Button style={styles.boton} title="AÑADIR BIEN" onPress={()=> BotoncrearBien()}/>
      </View>
    </ScrollView>
  );

};


const styles = StyleSheet.create({
  containerScroll:{
    flex:1,
    paddingTop:30,
    alignContent:'center',
    backgroundColor:'#fff',
      
  },

  contenedorform:{
    width: 360,
    height: 450,
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

export default PantallaCrearBi;