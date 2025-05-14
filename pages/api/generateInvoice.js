// pages/api/generateInvoice.js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function handler(req, res) {
  const { description, quantity, unitPrice } = req.body;
  const docDefinition = {
    content: [
      { text: 'Invoice', style: 'header' },
      `${quantity} × ${description} @ $${unitPrice}`
    ],
    styles: { header: { fontSize: 18, bold: true } }
  };
  const pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.getBase64(data => {
    const buffer = Buffer.from(data, 'base64');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  });
}
