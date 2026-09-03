# Professional Resume - Mohammad Pazhoohesh

A modern, multilingual, ATS-optimized professional resume with support for English, German, and Arabic.

## ✨ Features

### 🌐 Multilingual Support
- **English** (EN) - Default professional resume
- **Deutsch** (DE) - German language version
- **العربية** (AR) - Arabic (RTL) language version
- Automatic language detection based on visitor's IP location
- Manual language switcher for easy navigation

### 📱 Responsive Design
- Desktop-optimized layout (A4 width)
- Mobile-friendly responsive design
- Tablet-optimized viewing experience
- Print-optimized CSS for professional PDF output

### 📥 Export & Print Options
- **PDF Export**: Download resume as PDF (client-side using html2pdf.js)
- **Print to PDF**: Native browser print functionality
- Optimized print styles for A4 page format
- Professional formatting maintained in PDF

### 🎯 ATS-Optimized
- Semantic HTML5 structure
- Proper heading hierarchy (H1, H2, H3, etc.)
- Machine-readable content structure
- No CSS Grid (for ATS compatibility)
- Clean, accessible markup

### 🎨 Professional Design
- Premium black, white, and gold/orange screen design
- Simple black-and-white print/PDF layout
- Clean typography and spacing
- Visual hierarchy for easy scanning
- Professional gradient header
- Organized sections with clear separation

### ♿ Accessibility
- ARIA labels where applicable
- High contrast text
- Keyboard navigation support
- Reduced motion preferences
- Dark mode support

## 📁 Project Structure

```
/
├── index.html                 # Entry point with IP-based language detection
├── pages/
│   ├── resume-en.html        # English resume
│   ├── resume-de.html        # German resume
│   └── resume-ar.html        # Arabic resume (RTL)
├── data/
│   ├── resume-en.json        # English content
│   ├── resume-de.json        # German content
│   └── resume-ar.json        # Arabic content
├── assets/
│   ├── css/
│   │   ├── style.css         # Main styles
│   │   └── print.css         # Print & PDF styles
│   ├── js/
│   │   └── main.js           # Application logic
│   ├── images/               # Images folder
│   └── fonts/                # Custom fonts (if needed)
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for IP detection and Google Fonts)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Farsimen/Resume.git
   cd Resume
   ```

2. **Serve locally** (for development)
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js
   npx http-server
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Deploy to Production

The resume can be deployed to any static hosting service:

- **GitHub Pages** - Free hosting for public repositories
- **Netlify** - Automatic deployments from GitHub
- **Vercel** - High-performance static hosting
- **Firebase Hosting** - Google's static hosting service
- **AWS S3** - Scalable cloud storage

## 🎯 Usage

### Viewing the Resume

1. **Automatic Language Detection**: Visitor's language is detected based on IP location
   - Germany → German version
   - Saudi Arabia / UAE → Arabic version
   - Others → English version

2. **Manual Language Switching**: Use the language buttons in the toolbar
   - 🇺🇸 English
   - 🇩🇪 Deutsch
   - 🇸🇦 العربية

3. **Export Options**:
   - Click "📥 Download PDF" to export as PDF
   - Click "🖨️ Print" for print dialog

### Customizing Content

Edit the JSON files in `/data/` folder:
- `resume-en.json` - English content
- `resume-de.json` - German content
- `resume-ar.json` - Arabic content

### Optional Profile Photo

The web version includes an optional profile-photo position in the footer. Add an image such as `assets/images/profile.jpg`, then add this field to each language file under `personal`:

```json
"photo": "../assets/images/profile.jpg"
```

If the field is omitted, the footer shows the candidate's initials. The photo position is hidden in print and PDF output to preserve an ATS-friendly international CV format.

Example JSON structure:
```json
{
  "language": "en",
  "rtl": false,
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your.email@example.com",
    ...
  },
  "summary": { ... },
  "experience": { ... }
}
```

### Customizing Styles

Edit `/assets/css/style.css` for main styles:
- Color scheme (defined in `:root` CSS variables)
- Typography (fonts, sizes, weights)
- Spacing and layout
- Component-specific styling

Print styles in `/assets/css/print.css`:
- A4 page format
- Color adjustments for printing
- Spacing optimization for PDF

## ☁️ Cloudflare Workers Deployment

The repository includes `wrangler.toml` for deployment as a static Cloudflare Worker.

```bash
npx wrangler login
npx wrangler deploy
```

After deployment, attach the custom domain from **Cloudflare Dashboard → Workers & Pages → your Worker → Settings → Domains & Routes**.

For automatic deployments, connect the GitHub repository from the Cloudflare dashboard and use `npx wrangler deploy` as the deploy command.

## 🌍 Language Support Details

### English (EN)
- Professional resume format
- Standard left-to-right (LTR) layout
- Industry-standard terminology

### Deutsch (DE)
- German translation of all content
- LTR layout
- German business conventions

### العربية (AR)
- Complete Arabic translation
- Right-to-left (RTL) layout
- Arabic fonts (Google Fonts: Scheherazade New)
- Professional Arabic business format

## 📊 ATS Compatibility

This resume is optimized for Applicant Tracking Systems (ATS):

✅ Semantic HTML5 structure
✅ No CSS Grid or complex layouts
✅ Simple, clean markup
✅ Readable text hierarchy
✅ Machine-readable content
✅ No embedded images in critical sections
✅ Standard fonts and formatting

**ATS Tools Tested With:**
- LinkedIn ATS
- Greenhouse
- Workday
- Taleo
- iCIMS

## 🖨️ Print & PDF Export

### Using the Download PDF Button
- Requires `html2pdf.js` library (included)
- One-click download as PDF
- Automatically formatted for A4 size

### Using Browser Print
- Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
- Select "Save as PDF" as printer
- Professional formatting automatically applied

### Print Tips
- Use default margins (0.5 inch)
- Select "Backgrounds" if you want colored header
- Set scale to 100% for best results

## 🔐 Privacy & Data

- **No tracking**: No analytics or tracking code
- **No data collection**: All processing happens locally
- **No server calls**: IP detection is optional and via public API
- **GDPR compliant**: No personal data stored

## 🐛 Troubleshooting

### PDF Download Not Working
- Check if browser allows downloads
- Try "Print to PDF" instead
- Disable browser extensions that might block downloads

### Language Not Detected Correctly
- Check your browser's language settings
- Use the manual language switcher
- Language preference is saved locally

### Styling Issues
- Clear browser cache (`Ctrl+Shift+Del`)
- Use latest browser version
- Check if JavaScript is enabled

### Mobile Display Issues
- Zoom out to see full page (Ctrl/Cmd + Minus)
- Use landscape mode for better viewing
- Consider printing to PDF for smaller screens

## 📝 Content Updates

To update resume content:

1. Edit the JSON file for desired language:
   ```bash
   nano data/resume-en.json
   ```

2. Update the content fields
3. Save the file
4. Refresh the browser to see changes

## 🚀 Deployment Examples

### GitHub Pages
```bash
git add .
git commit -m "Update resume"
git push origin main
# Visit: https://username.github.io/modern-resume-template
```

### Netlify
1. Connect GitHub repository
2. Set build command: (leave empty)
3. Set publish directory: `/` (root)
4. Deploy!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💼 About Mohammad Pazhoohesh

Business Development & Market Expansion Specialist with 14+ years of experience in sales, marketing, and entrepreneurship.

- **Email**: M.pazhooohesh@gmail.com
- **Phone**: +98 9351313616
- **LinkedIn**: [Mohammad Pazhoohesh](https://linkedin.com/in/mohammad-pazhoohesh)
- **Location**: Rasht, Gilan Province, Iran

## 🤝 Contributing

Suggestions and improvements are welcome! Feel free to:
- Report bugs
- Suggest new features
- Propose improvements
- Submit pull requests

## 📞 Support

For issues, questions, or suggestions:
1. Check the Troubleshooting section
2. Create an issue on GitHub
3. Contact via email

---

**Last Updated**: September 2024
**Version**: 2.0
**Status**: Production Ready ✅
