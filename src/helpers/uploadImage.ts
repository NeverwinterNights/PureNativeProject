import storage from "@react-native-firebase/storage";


export default (file: any) => (onSuccess: Function) => (onError: Function) => {

  const path = "contact-pictures/user/777/" + file.modificationDate;
  const ref = storage().ref(path);
  // const ref = storage.ref(path);
  return ref.putFile(file.path)
    .then(async () => {
      const url = await ref.getDownloadURL();
      onSuccess(url);
      // console.log ("url", url)
    })
    .catch((err) => {
      // console.log ("err", err)
      onError(err);
    });


}
