/** @type {import('tailwindcss').Config} */  // S Code වැනි IDE එකක කෝඩ් ලියන විට Auto-complete (suggestion) සහ නිවැරදි කිරීම් ලබා ගැනීමට Tailwind CSS එකෙන් ලබා දී ඇති Type definition එකකි.
export default { //avaScript/TypeScript වලදී මෙම Configuration වස්තුව (Configuration object) Tailwind බිල්ඩ් ටූල් එකට ලබා දීම සඳහා export default භාවිතා කරයි.
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ], /*Tailwind CSS මඟින් භාවිත නොකරන CSS කෝඩ් ඉවත් කර (Purge කර) ෆයිල් ප්‍රමාණය අවම කරගැනීමට, HTML සහ React/Vue කෝඩ් ලියන ෆයිල්ස් කොතැනදැයි මෙයින් පෙන්වා දෙයි.
        මෙහිදී index.html සහ src/ ෆෝල්ඩරය තුළ ඇති සියලුම .vue, .js, .ts, .jsx, .tsx ෆයිල්ස් පරීක්ෂා කරන ලෙස පවසා ඇත.*/
  theme: {
    extend: { //Tailwind වල ඇති මූලික (default) වර්ණ සහ විලාසයන් මකා දැමීමෙන් තොරව, අපේ අවශ්‍යතාවයට අලුත් දේවල් එකතු කිරීමට (Extend කිරීමට) මෙයින් ඉඩ සලසයි.
      colors: {
        brand: {
          50: '#f0f9ff', // ඉතා ලා පැහැති නිල් පාටක් (Light background හෝ hover effect සඳහා)
          500: '#0ea5e9', // LifeOS ඇප් එකේ ප්‍රධාන (Primary) නිල් පාට - බට්න් සහ අයිකන් සඳහා
          600: '#0284c7', // ඊට වඩා ටිකක් තද පැහැති නිල් පාටක් (Hover කළ විට වෙනස් වීමට)
          700: '#0369a1', // වඩාත්ම ගැඹුරු නිල් පාට (ප්‍රධාන මාතෘකා හෝ ටෙක්ස්ට් සඳහා)
        },
      }, //මෙමඟින් අපේ LifeOS ඇප් එකටම විශේෂ වූ brand නමින් අභිරුචි වර්ණ මාලාවක් (Custom color palette) සාදා ගනී. මෙහි ඇති අංක (50, 500, 600, 700) මඟින් එම වර්ණයේ ලා බව (lightness) සහ තද බව (darkness) පාලනය කරයි.
    },
  },
  plugins: [], //Tailwind CSS වෙත සමහර ප්ලගින්ස් (Plugins) හෝ එක්ස්ටෙන්ෂන්ස් එකතු කිරීමයි. අනාගතයේදී ඔබට Tailwind CSS මඟින් ස්වයංක්‍රීයව නොලැබෙන විශේෂ පහසුකම් (උදාහරණයක් ලෙස: ෆෝම්ස් අලංකාර කිරීමට @tailwindcss/forms, අකුරු පාලනයට @tailwindcss/typography, හෝ වෙනත් අභිරුචි ස්ටයිල්ස්) ඇප් එකට එකතු කිරීමට අවශ්‍ය වුවහොත්, එම ප්ලගින්ස් මෙම වරහන් [] ඇතුළට පහසුවෙන් ඇතුළත් කළ හැක.
}

