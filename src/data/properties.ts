// Define the Property type
export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  distance: string;
  facilities: string[];
  image: string;
  description: string;
}

// Sample data for Tinggal Sewa property listings
export const properties: Property[] = [
  {
    id: "prop1",
    name: "Kost Putri Ekslusif dekat UI",
    location: "Depok, Jawa Barat",
    price: "Rp1.500.000 / bulan",
    distance: "500m dari Kampus UI",
    facilities: ["AC", "Kamar Mandi Dalam", "WiFi"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=400&fit=crop",
    description: "Kost putri eksklusif dengan fasilitas lengkap, lingkungan aman dan nyaman, dekat dengan kampus Universitas Indonesia.",
  },
  {
    id: "prop2",
    name: "Apartemen Studio Full Furnished",
    location: "Jakarta Selatan",
    price: "Rp3.800.000 / bulan",
    distance: "5 menit ke MRT Lebak Bulus",
    facilities: ["AC", "Water Heater", "Furnished"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop",
    description: "Apartemen studio full furnished dengan berbagai fasilitas mewah, strategis dekat dengan transportasi umum dan pusat perbelanjaan.",
  },
  {
    id: "prop3",
    name: "Rumah Kost Putra Bersih",
    location: "Yogyakarta",
    price: "Rp850.000 / bulan",
    distance: "300m dari UGM",
    facilities: ["Kamar Mandi Dalam", "Dapur Bersama"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop",
    description: "Kost putra bersih dan terawat dengan lingkungan yang tenang, cocok untuk mahasiswa yang butuh tempat tenang untuk belajar.",
  },
  {
    id: "prop4",
    name: "Kost Mixed Eksklusif",
    location: "Bandung",
    price: "Rp1.200.000 / bulan",
    distance: "700m dari ITB",
    facilities: ["WiFi", "Laundry", "Parkir Motor"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
    description: "Kost mixed (putra/putri) eksklusif dengan kamar luas dan nyaman, area parkir luas, dan keamanan 24 jam.",
  },
  {
    id: "prop5",
    name: "Apartemen 2BR Minimalis",
    location: "Surabaya",
    price: "Rp4.500.000 / bulan",
    distance: "1km dari ITS",
    facilities: ["AC", "2 Kamar", "Balkon"],
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=400&fit=crop",
    description: "Apartemen 2 kamar dengan desain minimalis modern, cocok untuk keluarga kecil atau berbagi dengan teman.",
  },
  {
    id: "prop6",
    name: "Kontrakan Rumah Tahunan",
    location: "Malang",
    price: "Rp25.000.000 / tahun",
    distance: "10 menit ke UB",
    facilities: ["2 Kamar Tidur", "Carport", "Taman"],
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop",
    description: "Kontrakan rumah tahunan dengan 2 kamar tidur, ruang tamu, carport, dan taman kecil di depan rumah.",
  },
  {
    id: "prop7",
    name: "Kost Premium Dekat Kampus",
    location: "Semarang",
    price: "Rp1.800.000 / bulan",
    distance: "5 menit ke UNDIP",
    facilities: ["AC", "TV", "Lemari"],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    description: "Kost premium dengan fasilitas hotel, keamanan 24 jam, dan akses kartu untuk pintu utama.",
  },
  {
    id: "prop8",
    name: "Studio Apartment Murah",
    location: "Jakarta Timur",
    price: "Rp2.200.000 / bulan",
    distance: "Dekat Halte Transjakarta",
    facilities: ["Semi Furnished", "Kolam Renang", "Gym"],
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=400&fit=crop",
    description: "Studio apartment dengan harga terjangkau namun tetap bisa menikmati fasilitas apartemen seperti kolam renang dan gym.",
  },
]; 