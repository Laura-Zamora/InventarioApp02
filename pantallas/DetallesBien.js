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


const PantallaDetallesBi = (props)=>{

    const estadoInicial = {
        id:"",
        nombre: "",
        descripcion: "",
        cantidad:"",
        marca:"",
        modelo:"",
        color:"",

    };

    const [bien,setBien] = useState(estadoInicial);
    const [loading, setLoading] = useState(true);

    const recibirDatos = (value, prop) => {
        setBien({ ...bien, [prop]: value });
    };

    const getBienById = async (id) => {
        
        const consultadb = firebase.db.collection("bienes").doc(id);
        const doc = await consultadb.get();
        const bien = doc.data();
        setBien({ ...bien, id: doc.id });
        setLoading(false);
    };

    const eliminarBien = async () => {
        setLoading(true)
        /*Desde props */
        const consultadb = firebase.db.collection("bienes").doc(props.route.params.bienId);
        await consultadb.delete();
        setLoading(false)
        props.navigation.navigate("ListaBienes");
    };

    const alertaConfirmacion = () => {
        Alert.alert("Eliminar bien","¿Estas seguro?",[
            { text: "SI", onPress: () => eliminarBien() },
            { text: "NO", onPress: () => console.log("Cancelado") },
          ],
          {
            cancelable: true,
          }
        );
    };

    const actualizarBi = async () => {
        /*Desde el estado de inventario.id */
        const consultadb = firebase.db.collection("bienes").doc(bien.id);
        await consultadb.set({
          nombre:bien.nombre,
          descripcion:bien.descripcion,
          cantidad:bien.catidad,
          marca:bien.marca,
          modelo:bien.modelo,
          color:bien.color,
        });
        setBien(estadoInicial);
        props.navigation.navigate("ListaBienes");
    };

    /*Este useEffect va a obtener el iventario */
    useEffect(() => {
        getBienById(props.route.params.bienId);
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
                    
                <TextInput style={styles.inputGroup} placeholder="Nombre" value={bien.nombre}
                    onChangeText={(value)=>recibirDatos(value,"nombre")}
                />
                <TextInput style={styles. textArea} style={styles.textArea} placeholder="Descripcion" value={bien.descripcion}
                    onChangeText={(value)=>recibirDatos(value,"descripcion")}
                />
                <TextInput style={styles.inputGroup} placeholder="Cantidad" value={bien.cantidad}
                    onChangeText={(value)=>recibirDatos(value,"cantidad")}
                />
                <TextInput style={styles.inputGroup} placeholder="Marca" value={bien.marca}
                    onChangeText={(value)=>recibirDatos(value,"marca")}
                />
                <TextInput style={styles.inputGroup} placeholder="Modelo" value={bien.modelo}
                    onChangeText={(value)=>recibirDatos(value,"modelo")}
                />
                <TextInput style={styles.inputGroup} placeholder="Color" value={bien.color}
                    onChangeText={(value)=>recibirDatos(value,"color")}
                />
    
                <View style={styles.espacio}>
                 <Button title="GUARDAR CAMBIOS" onPress={()=> actualizarBi()}/>
                </View>
                <View>
                 <Button color="#E37399" title="ELIMINAR BIEM" onPress={()=> alertaConfirmacion()}/>
                </View>
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
  
export default PantallaDetallesBi;