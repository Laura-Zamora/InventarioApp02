import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from "react-native-elements";

import firebase from "../database/firebase";

const PantallaLlistaBi = (props)=>{


    const [bienes,setBienes] = useState([]);
  /*useEffect llamara a la ejecucion de firebase */
    useEffect(() => {

        firebase.db.collection("bienes").onSnapshot((querySnapshot) => {
        
            const bienes = [];
        
            querySnapshot.docs.forEach((doc) => {
                const {nombre, descripcion,cantidad,marca,modelo,color } = doc.data();
                 bienes.push({
                    id:doc.id,
                    nombre,
                    descripcion,
                    cantidad,
                    marca,
                    modelo,
                    color,

                });
            });
            setBienes(bienes);
        });
    }, []);



    return(
        <ScrollView>
      
            {
                /*desde inventarios vamos a recorrer cada uno de los inventarios y por cada inventario
                que recorra, retornar el item
                */
            bienes.map((bien) => {
                return (
                    <ListItem key={bien.id} bottomDivider onPress={()=>alert(bien.id)}>
                        <ListItem.Chevron />
                            <Avatar
                            source={{uri:"https://th.bing.com/th/id/Ree50078e4d749cb5b9d874e478ff61be?rik=R6yf7C7ZL6FI0w&pid=ImgRaw"}}
                            rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{bien.nombre}</ListItem.Title>
                            <ListItem.Subtitle>ID: {bien.id}</ListItem.Subtitle>
                        </ListItem.Content>


        
                        <FAB title="Edit" onPress={()=>{
                            props.navigation.navigate("DetallesBien",{
                                /*Cuando presionemos el icono de editar Utilizar props navigation y 
                                navegar a la pantalla de DetallesInventario y pasarle el id del inventario */
                                bienId:bien.id,
                            });
                        }}
                        />
                        
            
                    </ListItem>
                );
            })}

            <Button title="Añadir Nuevo Bien" onPress={()=> props.navigation.navigate("CrearBien")}/>
            
        </ScrollView>
    );

};

export default PantallaLlistaBi;