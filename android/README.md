# BloodLink India – Android & Google Play Store Package

Production-ready Android application and Google Play Store distribution bundle for **BloodLink India** (`in.bloodlink.app`).

---

## 1. App Identity & Certificate Fingerprint

| Property | Value |
| :--- | :--- |
| **App Name** | BloodLink India |
| **Application ID / Package** | `in.bloodlink.app` |
| **Target SDK** | `34` (Android 14 – Google Play compliant) |
| **Minimum SDK** | `24` (Android 7.0+, 99.5%+ global Android device coverage) |
| **Version Code** | `1` |
| **Version Name** | `1.0.0` |
| **Release Keystore** | `android/bloodlink-release-key.jks` |
| **Keystore Alias** | `bloodlink-key` |
| **Keystore Password** | `bloodlink2026` |
| **Key Password** | `bloodlink2026` |
| **SHA-256 Certificate Fingerprint** | `92:E0:D8:B8:A1:8E:E6:6F:90:15:88:FD:66:A0:A3:B4:C3:7D:F7:FF:BB:BC:BB:30:E9:CE:37:F2:2E:C4:8A:BF` |
| **Digital Asset Links** | `https://bloodlink-india.vercel.app/.well-known/assetlinks.json` |

---

## 2. Store Assets Included

All assets meet Google Play Console specifications:

- **App Icon (512x512 PNG, 32-bit)**: `android/store-assets/playstore-icon-512x512.png`
- **Feature Graphic (1024x500 PNG)**: `android/store-assets/playstore-feature-graphic-1024x500.png`
- **Screenshot 1 (Find Donors)**: `android/store-assets/screenshot-1-find-donors.png`
- **Screenshot 2 (Emergency Request)**: `android/store-assets/screenshot-2-emergency-request.png`
- **Screenshot 3 (Donor Registration)**: `android/store-assets/screenshot-3-register-donor.png`

---

## 3. Mandatory Google Play URLs

- **Privacy Policy**: `https://bloodlink-india.vercel.app/privacy`
- **Terms of Service**: `https://bloodlink-india.vercel.app/terms`
- **Support Email**: `support@bloodlink-india.vercel.app`

---

## 4. Google Play Console Listing Text

### App Title
`BloodLink India - Blood Donation`

### Short Description (max 80 chars)
`Find voluntary blood donors instantly & raise emergency blood requests in India.`

### Full Description (max 4000 chars)
```
BloodLink India is a community-driven, voluntary blood donor discovery and emergency coordination platform dedicated to saving lives across all 28 states and 8 union territories of India.

In medical emergencies, every minute matters. BloodLink connects patients, families, and certified medical care providers directly with voluntary blood donors in their district and city.

KEY FEATURES:
• REAL-TIME DONOR SEARCH: Search available donors across all 8 blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-) filtered by State, District, and City.
• DIRECT EMERGENCY CONNECT: Direct one-tap telephone connect with registered voluntary donors.
• RAISE EMERGENCY REQUESTS: Broadcast urgent hospital requirements with patient name, hospital location, and required blood units.
• PRIVACY & INTEGRITY: Strict privacy controls. Donors can update their availability status anytime or take breaks.
• 100% VOLUNTARY & NON-COMMERCIAL: Voluntary blood donation is unpaid by law. BloodLink is completely free of advertisements and charges zero fees.

IMPORTANT NOTICE:
BloodLink India is a coordination facilitator and directory, not a blood bank. Transfusions and donations must always occur at licensed blood banks and authorized medical centers under the supervision of qualified healthcare practitioners.
```

---

## 5. Building the AAB & APK

### Via GitHub Actions (Recommended & Automated)
Every commit to the `main` branch triggers `.github/workflows/build-android.yml` on GitHub's Ubuntu runners, compiling both:
- `BloodLink-India-PlayStore-AAB` (`app-release.aab`)
- `BloodLink-India-Release-APK` (`app-release.apk`)

Download the `.aab` directly from the **Actions** tab on `https://github.com/Deb56xy/bloodlink-india/actions`.

### Via Local Gradle
```bash
cd android
./gradlew bundleRelease    # Generates app/build/outputs/bundle/release/app-release.aab
./gradlew assembleRelease  # Generates app/build/outputs/apk/release/app-release.apk
```
