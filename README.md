# Trashit Go

An Android app made for the startup "Trashit" for their marketing purpose. Similiar to the Pokemon game, where you collect pokemons, here you have to collect seeds in order to level up. The app contains a payout and leaderboard section for bonuses and competition between users. Made using Ionic.

## Screenshots

Note: These screenshots were taken from desktop browser during development. App screenshots are currently not available.

<table>
  <tbody>
    <tr>
      <!-- Video 1 -->
      <td align="center">
          <img width="290" alt="FamiChat" src="/screenshots/Screenshot%20(614).png">
          <br>
      </td>
      <!-- Video 2 -->
      <td align="center">
          <img width="290" alt="FamiChat" src="/screenshots/Screenshot%20(615).png">
          <br>
      </td>
      <!-- Video 3 -->
      <td align="center">
          <img width="290" alt="FamiChat" src="/screenshots/Screenshot%20(616).png">
          <br>
      </td>
    </tr>
  </tbody>
</table>
 
## Compiling and running the project

In order to compile and run the code, follow these steps.

1) Get ionic (along with all the dependencies, including Cordova)
2) Open Nodejs CMD and type the following commands.
3) <code>cd <repository's directory></code>
  | example: <code>cd C:\Users\Ahsan Ahmed\Documents\GitHub\project-name</code>
4) <code>npm install</code>
  
  ### On desktop browser
  
  4) <code>ionic serve</code>
  
  ### On Android Phone
  
  4) Connect your androoid phone to your PC and run the following commands.
  5) <code>ionic cordova run android --device --livereload</code>
  6) This can also be used. <code>ionic cordova run android</code>
## Building an apk

After you have tested and run the code, you can get a <code>.apk</code> file for the project by running the following command.

1) <code>ionic cordova build --release android</code>
2) After a while, you can find your <code>.apk</code> file here,
<code>\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk</code>.
  
## Signing Apk

1) <code>keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000</code>

if "keytool" is not found, use,

1) <code>"C:\Program Files\Java\jre1.8.0_151\bin\keytool.exe" -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000</code>

2) .keystore file has been generated. To attach it with the unsigned apk, use a "OutSign" software.

