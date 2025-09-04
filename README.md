# ERP CV Auto Preview Extension

A browser extension that enhances the CV creation experience on the IIT Kharagpur ERP system by providing automatically updating preview updates as you edit your CV.

## Features

- **Real-time CV Preview**: Automatically updates the preview window showing your CV as you make changes
- **Multiple CV Support**: Switch between CV 1, CV 2, and CV 3 with dedicated buttons
- **Auto-save**: Automatically saves your changes in the background without interrupting your workflow
- **Live Updates**: Preview window updates automatically when you modify any field or text area
- **CKEditor Support**: Compatible with rich text editors used in the ERP system

<!-- ## How It Works

1. The extension monitors form inputs, text areas, and CKEditor instances on the ERP CV editing page
2. When changes are detected, it automatically saves the form data in the background
3. After saving, it refreshes the CV preview window with the latest changes
4. All this happens seamlessly without disrupting your editing experience -->

## Installation

### Manual Installation (Developer Mode)

1. **Download or Clone** this repository to your local machine
2. **Open your browser's extension management page**:
   - **Chrome**: Navigate to `chrome://extensions/`
   - **Firefox**: Navigate to `about:addons`
3. **Enable Developer Mode** (Chrome) or **Debug Add-ons** (Firefox)
4. **Load the extension**:
   - **Chrome**: Click "Load unpacked" and select the extension folder
   - **Firefox**: Click "Load Temporary Add-on" and select the `manifest.json` file

## Usage

1. **Navigate** to the IIT KGP ERP login page and log in to your account
2. **Go to** the CV editing section: `https://erp.iitkgp.ac.in/IIT_ERP3/showmenu.htm`
3. **Click** the extension icon in your browser toolbar
4. **Select** which CV you want to work on (CV 1, CV 2, or CV 3)
5. **Start editing** your CV - the preview window will open automatically
6. **Make changes** to any field and watch the preview update in real-time

## Technical Details

### Files Structure

- `manifest.json` - Extension configuration and permissions
- `index.html` - Popup interface with CV selection buttons
- `tab_func.js` - Handles user interactions and script injection
- `main.js` - Content script that monitors changes and updates preview
- `background.js` - Background script (currently minimal)

### Permissions Required

- `activeTab` - Access to the currently active tab
- `tabs` - Ability to query and interact with browser tabs
- `https://erp.iitkgp.ac.in/*` - Access to ERP domain for content injection

### Browser Compatibility

- **Chrome**: Manifest V2 compatible
- **Firefox**: WebExtensions API compatible
- **Cross-browser**: Uses feature detection for browser API compatibility

### Key Functions

- **Auto-save mechanism**: Detects form changes and saves automatically
- **Preview window management**: Opens and updates CV preview window
- **Event listeners**: Monitors input fields, textareas, and CKEditor instances
- **Cross-frame injection**: Injects scripts into the ERP's iframe structure

## Troubleshooting

### Common Issues

1. **"Please open the ERP main menu page" error**
   - Ensure you're on the correct ERP page: `https://erp.iitkgp.ac.in/IIT_ERP3/showmenu.htm`
   - Make sure you're logged into the ERP system

2. **Preview window not opening**
   - Check if pop-ups are blocked in your browser
   - Allow pop-ups for the ERP domain

3. **Changes not reflecting in preview**
   - Wait a moment (2-3 seconds) for the auto-save to complete
   - Sometimes changes are delayed, i.e., making a change may reflect the previous change instead of latest change (That's how our ERP works ;)
   - Check browser console for any error messages

4. **Extension not working**
   - Ensure you have the necessary permissions to access the ERP system
   - Try refreshing the ERP page and clicking the extension icon again

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Open an issue in the repository
3. Contact me: harsh@harshbansal.in

---

**Note**: This extension is designed specifically for the IIT Kharagpur ERP system and requires valid ERP access credentials to function properly.
