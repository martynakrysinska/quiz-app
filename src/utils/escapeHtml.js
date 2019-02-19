const escapeHtml = str => {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&eacute;/g, "é")
    .replace(/&divide;/g, "÷")
    .replace(/&pi;/g, "π")
    .replace(/&Pi;/g, "π")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&Delta;/g, "Δ")
    .replace(/&micro;/g, "µ")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&aacute;/g, "á")
    .replace(/&ntilde;/g, "ñ")
    .replace(/&Eacute;/g, "É")
    .replace(/&ldquo;/g, "“")
    .replace(/&ecirc;/g, "ê")
    .replace(/&rdquo;/g, "”")
    .replace(/&hellip;/g, "...")
    .replace(/&shy;/g, "­­- ")
    .replace(/&deg;/g, "°")
    .replace(/&iacute;/g, "í")
    .replace(/&rsquo;/g, "’")
    .replace(/&uuml;/g, "ü");
};

export default escapeHtml;
