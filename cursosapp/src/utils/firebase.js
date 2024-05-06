// credenciales.js

// Importa las funciones necesarias de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8XZ0jjmJ2MLx49LHieqL1rtSV2FYijr8",
  authDomain: "portaleducativo-30af4.firebaseapp.com",
  projectId: "portaleducativo-30af4",
  storageBucket: "portaleducativo-30af4.appspot.com",
  messagingSenderId: "84458602440",
  appId: "1:84458602440:web:a5853b27f410e2b8becafd"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Configurar la persistencia de autenticación
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Función para almacenar información adicional del usuario en Firestore
const guardarUsuarioEnFirestore = async (uid, nombre, ) => {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), {
      uid,
      nombre
      
    });
    console.log("Documento agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar documento: ", e);
  }
};

export { auth, db, guardarUsuarioEnFirestore };
