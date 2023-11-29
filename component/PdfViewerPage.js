import { useRouter } from 'next/router';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const PdfViewerPage = () => {
  const router = useRouter();
  const pdfData = JSON.parse(router.query.pdfData);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
    return formattedDate;
  };

  const generatePdfContent = (data) => {
    return (
      <>
        <Document>
          <Page size="A4">
            <View style={styles.page}>
              <Text style={styles.title}>PUDAM BANYUWANGI CABANG WONGSOREJO</Text>
              <Text style={styles.subtitle}>BUKTI BON BARANG</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>TANGGAL</Text>
                <Text style={styles.infoValue}>: {formatDate(data.tanggal)}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>KODE BARANG</Text>
                <Text style={styles.infoValue}>: {data.kodebarang}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>NAMA BARANG</Text>
                <Text style={styles.infoValue}>: {data.namabarang}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>JUMLAH</Text>
                <Text style={styles.infoValue}>: {data.kuantiti}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>SATUAN</Text>
                <Text style={styles.infoValue}>: {data.satuan}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>PEMINJAM</Text>
                <Text style={styles.infoValue}>: {data.peminjam}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>NOMER SP</Text>
                <Text style={styles.infoValue}>: {data.NomerSP}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>ALAMAT</Text>
                <Text style={styles.infoValue}>: {data.alamat}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>KETERANGAN</Text>
                <Text style={styles.infoValue}>: {data.keterangan}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>GAMBAR BARANG</Text>
                <Image style={styles.image} src={`http://localhost:5000/images/${data.gambarbarang}`} />
              </View>

              {/* Add more data as needed */}
            </View>
          </Page>
        </Document>
      </>
    );
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20,
      padding: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    infoContainer: {
      fontSize: 12,
      flexDirection: 'row',
      marginBottom: 5,
    },
    infoLabel: {
      width: 150,
      fontWeight: 'bold',
    },
    infoValue: {
      flex: 1,
    },
    horizontalLine: {
      borderBottom: '1px solid black',
      marginBottom: 10,
    },
    image: {
      width: 400, 
      height: 400, 
      marginBottom: 10,
    },
  });

  return (
    <div className="pdf-viewer">
      <PDFViewer width="100%" height="870">
        {generatePdfContent(pdfData)}
      </PDFViewer>
    </div>
  );
};

export default PdfViewerPage;
