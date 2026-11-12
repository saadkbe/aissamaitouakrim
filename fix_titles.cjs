const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    const comboRegex = /<h2\s+className="[^"]*font-display[^"]*"[^>]*>[\s\S]*?<\/h2>\s*<h3\s+className="([^"]*font-arabic[^"]*)"([^>]*)>([\s\S]*?)<\/h3>/g;
    
    content = content.replace(comboRegex, (match, h3Class, h3Props, h3Inner) => {
        // Remove text sizes from h3Class and add text-6xl md:text-7xl lg:text-8xl
        let newClass = h3Class.replace(/text-(?:sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/g, '').replace(/\s+/g, ' ');
        newClass = newClass.trim() + ' text-6xl md:text-7xl lg:text-8xl';
        
        return `<h3 className="${newClass}"${h3Props}>\n${h3Inner}\n</h3>`;
    });
    
    const soloH2Regex = /<h2\s+className="([^"]*font-display[^"]*)"([^>]*)>([\s\S]*?)<\/h2>/g;
    
    content = content.replace(soloH2Regex, (match, h2Class, h2Props, h2Inner) => {
        if (match.includes("font-arabic")) return match; 
        
        // Try to extract a translation key to make the arabic one
        let newInner = h2Inner;
        let tMatch = h2Inner.match(/\{t\('([^']+)'\)\}/);
        if (tMatch) {
            let base = tMatch[1].replace(/\.title.*$/, '');
            let arabicKey = base + '.titleArabic';
            newInner = `{t('${arabicKey}')}`;
        }
        
        let newClass = h2Class.replace(/text-(?:sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/g, '').replace(/\s+/g, ' ');
        // Swap font-display to font-arabic
        newClass = newClass.replace('font-display', 'font-arabic text-[#C9A961]');
        newClass = newClass.trim() + ' text-6xl md:text-7xl lg:text-8xl font-bold';
        
        return `<h3 className="${newClass}"${h2Props} dir="rtl">\n  ${newInner}\n</h3>`;
    });
    
    fs.writeFileSync(path.join(dir, file), content);
});

console.log("Titles updated");
