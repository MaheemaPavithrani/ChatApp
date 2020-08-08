# ChatApp
ChatApp
ChatApp is a messenging app can be use among your friends developed with React-Native and Google Firebase.

Development Installation

Clone the repository
Go to the project folder and run npm install
Make sure you have connected your android smartphone (USB Debugging must be enabled) to the PC or have a working Android Virtual Device
Make a Google Firebase project for an Android app and download the credentials json file
Enable email authentication
Enable cloud firestore database (this is enabled by default if not enable)
Enable cloud storage
Rename the file as google-services.json and move it to android/app/ folder.
Run npx react-native run-android or react-native run-android (if you have installed react CLI)

Important

To run this application minimum sdk version 21 (Android Lollipop) is required
If any build error occures try delete the android/build folder and rebuild
