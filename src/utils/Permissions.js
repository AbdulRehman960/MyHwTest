import { request, check, PERMISSIONS, checkMultiple, RESULTS, requestMultiple, openSettings } from 'react-native-permissions';
export const getStoragePermissions = (isAllow) => {
 // Manifest.xml
    // <uses-permission android:name="android.permission.CAMERA" />
    // <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />


    //Info.plist
    // <key>NSCameraUsageDescription</key>
    // <string>R8tr will used to capture images and videos for ratings</string>
    // <key>NSPhotoLibraryAddUsageDescription</key>
    // <string>Photos will be used in R8tr for ratings</string>
    // <key>NSPhotoLibraryUsageDescription</key>
    // <string>Photos will be used in R8tr for ratings</string>

    checkMultiple(Platform.OS == 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY] : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then((statuses) => {
        if (Platform.OS == 'android') 
        {
            console.log("Step 1")
            if (statuses[PERMISSIONS.ANDROID.CAMERA] == 'granted' && statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted') {
                console.log("Step 2")
                isAllow('granted')
            }
        
            else 
            {
                console.log("Step 2")
                requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(result => 
                        {
                        console.log("STep 4", result)
                        if (result[PERMISSIONS.ANDROID.CAMERA] == 'granted' && result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted') {isAllow('granted')}
                        else{isAllow('blocked')}
                    })
            }
        } else if (Platform.OS == 'ios') 
        {
            if (statuses[PERMISSIONS.IOS.CAMERA] == 'granted' && statuses[PERMISSIONS.IOS.MEDIA_LIBRARY] == 'granted') {
                isAllow('granted')
            } else
             {
                requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
                    (statuses[PERMISSIONS.IOS.CAMERA] == 'granted'  && statuses[PERMISSIONS.IOS.MEDIA_LIBRARY] == 'granted') ?
                        isAllow('granted') : isAllow('blocked')
                });
            }
        }
    });
}


export const getLocationPermission = (isAllow) => 
{
       //Manifest.xml (for Location)
    // <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    // <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    //Info.plist (For Location)
    // <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    // <string>Location Permission</string>
    // <key>NSLocationAlwaysUsageDescription</key>
    // <string>Location Permission</string>
    // <key>NSLocationUsageDescription</key>
    // <string>GPS data is required to...</string>
    // <key>NSLocationWhenInUseUsageDescription</key>
    // <string>R8tr want to access your location</string>

    checkMultiple(Platform.OS == 'ios' ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] : [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then((statuses) => {
        if (Platform.OS == 'android') 
        {
            if (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] == 'granted') 
            {
                isAllow('granted')
            }
        
            else 
            {
                requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then(result => 
                        {
                        if (result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] == 'granted') {isAllow('granted')}
                        else{isAllow('blocked')}
                    })
            }
        }
        else
        {
            if (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] == 'granted') 
            {
                isAllow('granted')
            }
        
            else 
            {
                requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(result => 
                        {
                        if (result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] == 'granted') {isAllow('granted')}
                        else{isAllow('blocked')}
                    })
            } 
        }

    })
}
