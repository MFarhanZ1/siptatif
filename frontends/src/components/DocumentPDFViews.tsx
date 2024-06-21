import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
} from "@react-pdf/renderer";

// Definisikan tipe untuk data tabel
interface TableRow {
	nidn: string;
    nama: string;
    no_hp: string | null;
    jenis_kelamin: string | null;
    email: string;
}

// Contoh data untuk tabel

// Buat gaya untuk PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#E4E4E4",
		padding: 20,
	},
	section: {
		margin: 1,
		padding: 10,
		flexGrow: 1,
	},
	table: {
		display: "table",
		width: "auto",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#000",
		marginBottom: 20,
	},
	tableRow: {
		flexDirection: "row",
	},
	tableColHeader: {
		width: "33%",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#000",
		backgroundColor: "#f22",
		padding: 5,
	},
	tableCol: {
		width: "33%",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#000",
		padding: 5,
	},
	tableCellHeader: {
		textAlign: "center",
		fontWeight: "bold",
        fontSize: 8,
	},
	tableCell: {
		textAlign: "center",
        fontSize: 8,
	},
});


interface PDFDataDosenProps {
    data: TableRow[];
}

// Buat komponen dokumen PDF
const PDFDataDosen = ({ data }: PDFDataDosenProps) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text style={{ fontSize: 18, marginBottom: 10 }}>List Data Dosen [SIPTATIF]</Text>
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>NIDN</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Nama Dosen</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>NO. Hp/WA</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>L/P</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Email</Text>
						</View>
					</View>
					{data.map((row) => (
						<View style={styles.tableRow} key={row.nidn}>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{row.nidn}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{row.nama}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{row.no_hp}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{row.jenis_kelamin}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{row.email}</Text>
							</View>
						</View>
					))}
				</View>
			</View>
		</Page>
	</Document>
);

export default PDFDataDosen;