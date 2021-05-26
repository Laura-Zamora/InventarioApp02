import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

/*Con props vamos a recibir el id */
const PantallaDetallesIn = (props) => {
  const estadoInicial = {
    id: "",
    nombre: "",
    fecha: "",
    descripcion: "",
  };

  const [inventario,setInventario] = useState(estadoInicial);
  const [loading, setLoading] = useState(true);

  const recibirDatos = (value, prop) => {
    setInventario({ ...inventario, [prop]: value });
  };

  const getInventarioById = async (id) => {
    /*Desde firebase hacer consulta de db a la coleccion llamada inventarios y buscar documento con el
    id que se va a estar pasando */
    const consultadb = firebase.db.collection("inventarios").doc(id);
    /*Obtene el los datos a partir de los datos y guardarlos en una constante doc */
    const doc = await consultadb.get();
    /*Para que se interpreten los datos optenidos tenemos que convertirlos con doc.data */
    const inventario = doc.data();
    /*Del inventario que estoy recibiendo de firebase, guardarlo en el estado de React */
    /*...inventario Todos los datos de inventario */
    setInventario({ ...inventario, id: doc.id });
    setLoading(false);
  };

  const eliminarInventario = async () => {
    setLoading(true)
    /*Desde props */
    const consultadb = firebase.db.collection("inventarios").doc(props.route.params.inventarioId);
    await consultadb.delete();
    setLoading(false)
    props.navigation.navigate("ListaInventarios");
  };

  const alertaConfirmacion = () => {
    Alert.alert("Eliminar inventario","¿Estas seguro?",[
        { text: "SI", onPress: () => eliminarInventario() },
        { text: "NO", onPress: () => console.log("Cancelado") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const actualizarInventario = async () => {
    /*Desde el estado de inventario.id */
    const consultadb = firebase.db.collection("inventarios").doc(inventario.id);
    await consultadb.set({
      nombre:inventario.nombre,
      fecha:inventario.fecha,
      descripcion:inventario.descripcion,
    });

    setInventario(estadoInicial);
    props.navigation.navigate("ListaInventarios");
  };

  /*Este useEffect va a obtener el iventario */
  useEffect(() => {
    getInventarioById(props.route.params.inventarioId);
  }, []);

  /*Si loading esta cargando, retornar el componente ActivityIndicator */
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.containerScroll}>
            
            
            <View style={styles.contenedorform}>
                
                <TextInput style={styles.inputGroup} placeholder="Nombre" value={inventario.nombre}
                    onChangeText={(value)=>recibirDatos(value,"nombre")}
                />
                <TextInput style={styles.inputGroup} placeholder="Fecha" value={inventario.fecha}
                     onChangeText={(value)=>recibirDatos(value,"fecha")}
                />
                <TextInput style={styles. textArea} style={styles.textArea} placeholder="Descripcion" value={inventario.descripcion}
                    onChangeText={(value)=>recibirDatos(value,"descripcion")}
                />

                <View style={styles.espacio}>
                <Button title="GUARDAR CAMBIOS" onPress={()=> actualizarInventario()}/>
                </View>
                <View>
                <Button color="#E37399" title="ELIMINAR INVENTARIO" onPress={()=> alertaConfirmacion()}/>
                </View>
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

  espacio:{
    marginBottom:10,
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

export default PantallaDetallesIn;
