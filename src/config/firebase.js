import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const getFileUrl = async (folder, filename) => {
  const storage = getStorage(firebaseApp);
  const fileRef = ref(storage, `${folder}/${filename}`);
  return getDownloadURL(fileRef)
    .then((url) => url)
    .catch((error) => error);
};
