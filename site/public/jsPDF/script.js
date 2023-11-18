function gerarPDF() {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({
    orientation: "portrait",
    format: 'a4',
  });

  var pdfjs = document.querySelector("#pdfPage");
  var widthTela = pdfjs.offsetWidth;
  var heightTela = pdfjs.offsetHeight;

  console.log(widthTela);

  doc.html(pdfjs, {
    callback: function (doc) {
      doc.save("relatório-semanal.pdf");
    },
    autoPaging: 'text',  
    FontFace: 'Urbanist',
    x: 0,
    y: 0,
    width: widthTela * 0.35,
    windowWidth: widthTela,
    height: heightTela
  });

  

}
