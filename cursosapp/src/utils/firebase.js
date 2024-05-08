// Importa las funciones necesarias de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCp6XPwisk8rN_cnYJgLTsGQYB-IcX487U",
  authDomain: "cursosapp-d44c6.firebaseapp.com",
  projectId: "cursosapp-d44c6",
  storageBucket: "cursosapp-d44c6.appspot.com",
  messagingSenderId: "405796134876",
  appId: "1:405796134876:web:549879961de4ad8003b919"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Configurar la persistencia de autenticación
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Función para almacenar información adicional del usuario en Firestore
const guardarUsuarioEnFirestore = async (uid, nombre) => {
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
