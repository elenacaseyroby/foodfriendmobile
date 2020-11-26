# foodfriendmobile
 
With this React Native app, users can select a nutrient path comprised of a group of nutrients to help them meet a goal, like improved mood.  They can then track the foods they eat and watch as they get closer to reaching their daily value of each of the nutrients in their path.  Users can also read about different nutrients and learn about their health properties and what foods contain them.

For now the app is only optimized for iOS an can be run by running the following commands from the root directory:
1. npm install  && cd ios pod install
2. cd .. 
3. npm start
4. react-native run-ios

You will need to make sure that `API_HOST` is set to the API website or localhost running the API website for it to work: https://github.com/elenacaseyroby/ffmobile/blob/master/services/apiUtils.js#L6

The code for the API is in this repo: https://github.com/elenacaseyroby/ff


